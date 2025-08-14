document.addEventListener('DOMContentLoaded', function() {
  var themeToggle = document.getElementById('theme-toggle');
  var themeIcon = themeToggle.querySelector('.theme-icon');
  var currentTheme = 'light';
  var storageAvailable = false;

  try {
    var testKey = '__theme_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    storageAvailable = true;
    currentTheme = localStorage.getItem('theme') || 'light';
  } catch (e) {
    console.warn('localStorage not available, using fallback theme storage');
    storageAvailable = false;
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeIcon.textContent = theme === 'dark' ? '☀' : '🌙';
    currentTheme = theme;

    if (storageAvailable) {
      try {
        localStorage.setItem('theme', theme);
      } catch (e) {
        console.warn('Failed to save theme preference');
      }
    }
  }

  function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme);
  }

  applyTheme(currentTheme);
  themeToggle.addEventListener('click', toggleTheme);

  var levels = [];
  var totalLevels = 0;
  var pageSize = 20;
  var currentPage = 0;
  var grid = document.getElementById('levels-grid');
  var prevBtn = document.getElementById('prev-page');
  var nextBtn = document.getElementById('next-page');
  var pageInfo = document.getElementById('page-info');
  var dragSrcIndex = null;
  var dropIndex = null;
  var selectedIndex = null;
  var propId = document.getElementById('prop-id');
  var propOrdinal = document.getElementById('prop-ordinal');
  var propUpdate = document.getElementById('prop-update');
  var propDelete = document.getElementById('prop-delete');

  grid.addEventListener('dragover', onGridDragOver);
  grid.addEventListener('drop', onDrop);
  grid.addEventListener('dragleave', clearDragClasses);
  propUpdate.addEventListener('click', applyOrdinal);
  propDelete.addEventListener('click', deleteLevel);
  loadPage(0);

  prevBtn.addEventListener('click', function() {
    if (currentPage > 0) {
      currentPage--;
      clearSelection();
      loadPage(currentPage);
    }
  });

  nextBtn.addEventListener('click', function() {
    if ((currentPage + 1) * pageSize < totalLevels) {
      currentPage++;
      clearSelection();
      loadPage(currentPage);
    }
  });

  function loadPage(page) {
    clearSelection();
    var start = page * pageSize;
    var end = Math.min(start + pageSize, totalLevels);
    var needsFetch = totalLevels === 0 || levels.slice(start, end).includes(undefined);
    if (needsFetch) {
      fetch('/levels?page=' + page + '&pageSize=' + pageSize)
        .then(function(res) { return res.json(); })
        .then(function(data) {
          totalLevels = data.total;
          if (levels.length !== totalLevels) {
            levels = new Array(totalLevels);
          }
          for (var i = 0; i < data.items.length; i++) {
            levels[start + i] = data.items[i];
          }
          renderPage();
        });
    } else {
      renderPage();
    }
  }

  function renderPage() {
    grid.innerHTML = '';
    var start = currentPage * pageSize;
    var end = Math.min(start + pageSize, totalLevels);
    for (var i = start; i < end; i++) {
      var item = levels[i];
      if (!item) { continue; }
      var id = item.id;
      var card = document.createElement('div');
      card.className = 'level-card';
      card.draggable = true;
      card.dataset.index = i;

      var number = document.createElement('div');
      number.className = 'level-number';
      number.textContent = item.ordinal;
      card.appendChild(number);

      var thumb = document.createElement('div');
      thumb.className = 'level-thumb';
      var img = document.createElement('img');
      img.src = '/levels/' + encodeURIComponent(id) + '.png';
      img.alt = id;
      img.onerror = function() { this.remove(); };
      thumb.appendChild(img);
      card.appendChild(thumb);

      var link = document.createElement('a');
      link.textContent = id;
      link.href = 'index.html?level=' + encodeURIComponent(id);
      card.appendChild(link);

      card.addEventListener('dragstart', onDragStart);
      card.addEventListener('dragover', onDragOver);
      card.addEventListener('dragleave', clearDragClasses);
      card.addEventListener('dragend', clearDragClasses);
      card.addEventListener('click', function() {
        var idx = Number(this.dataset.index);
        if (selectedIndex === idx) {
          clearSelection();
        } else {
          selectLevel(idx);
        }
      });

      grid.appendChild(card);
    }
    pageInfo.textContent = (start + 1) + '-' + end + ' / ' + totalLevels;
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = (currentPage + 1) * pageSize >= totalLevels;
    if (selectedIndex !== null && selectedIndex >= start && selectedIndex < end) {
      var selectedCard = grid.querySelector('.level-card[data-index="' + selectedIndex + '"]');
      if (selectedCard) {
        selectedCard.classList.add('selected');
      }
    }
  }

  function onDragStart(e) {
    dragSrcIndex = Number(this.dataset.index);
    dropIndex = dragSrcIndex;
    clearDragClasses();
    e.dataTransfer.effectAllowed = 'move';
  }

  function onDragOver(e) {
    e.preventDefault();
    var rect = this.getBoundingClientRect();
    var before = e.clientX < rect.left + rect.width / 2;
    Array.from(grid.children).forEach(function(child) {
      child.classList.remove('drag-over-before', 'drag-over-after');
    });
    if (before) {
      this.classList.add('drag-over-before');
      dropIndex = Number(this.dataset.index);
    } else {
      this.classList.add('drag-over-after');
      dropIndex = Number(this.dataset.index) + 1;
    }
    e.dataTransfer.dropEffect = 'move';
  }

  function onGridDragOver(e) {
    e.preventDefault();
    if (e.target === grid) {
      var last = grid.lastElementChild;
      clearDragClasses();
      if (last) {
        last.classList.add('drag-over-after');
        dropIndex = Number(last.dataset.index) + 1;
      } else {
        dropIndex = 0;
      }
    }
    e.dataTransfer.dropEffect = 'move';
  }

  function onDrop(e) {
    e.preventDefault();
    if (dragSrcIndex === null || dropIndex === null) {
      return;
    }
    var item = levels.splice(dragSrcIndex, 1)[0];
    if (dropIndex > dragSrcIndex) {
      dropIndex--;
    }
    levels.splice(dropIndex, 0, item);
    updateOrdinals();
    dragSrcIndex = null;
    dropIndex = null;
    clearDragClasses();
    renderPage();
    saveOrder();
  }

  function clearDragClasses() {
    Array.from(grid.children).forEach(function(child) {
      child.classList.remove('drag-over-before', 'drag-over-after');
    });
  }

  function selectLevel(index) {
    selectedIndex = index;
    var item = levels[index];
    if (item) {
      propId.value = item.id;
      propOrdinal.value = item.ordinal;
      clearSelectionHighlight();
      var card = grid.querySelector('.level-card[data-index="' + index + '"]');
      if (card) {
        card.classList.add('selected');
      }
    }
  }

  function clearSelection() {
    selectedIndex = null;
    propId.value = '';
    propOrdinal.value = '';
    clearSelectionHighlight();
  }

  function clearSelectionHighlight() {
    Array.from(grid.children).forEach(function(child) {
      child.classList.remove('selected');
    });
  }

  function applyOrdinal() {
    if (selectedIndex === null) {
      return;
    }
    var newOrdinal = parseInt(propOrdinal.value, 10);
    if (isNaN(newOrdinal) || newOrdinal < 1 || newOrdinal > levels.length) {
      return;
    }
    var item = levels.splice(selectedIndex, 1)[0];
    levels.splice(newOrdinal - 1, 0, item);
    updateOrdinals();
    selectedIndex = newOrdinal - 1;
    selectLevel(selectedIndex);
    currentPage = Math.floor(selectedIndex / pageSize);
    loadPage(currentPage);
    saveOrder();
  }

  function deleteLevel() {
    if (selectedIndex === null) {
      return;
    }
    var id = levels[selectedIndex].id;
    fetch('/delete-level', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id })
    }).then(function(res) {
      if (!res.ok) {
        return;
      }
      levels.splice(selectedIndex, 1);
      totalLevels--;
      updateOrdinals();
      if (currentPage * pageSize >= totalLevels && currentPage > 0) {
        currentPage--;
      }
      clearSelection();
      loadPage(currentPage);
    });
  }

  function updateOrdinals() {
    for (var i = 0; i < levels.length; i++) {
      if (levels[i]) {
        levels[i].ordinal = i + 1;
      }
    }
  }

  function ensureAllLevelsLoaded() {
    var promises = [];
    var totalPages = Math.ceil(totalLevels / pageSize);
    for (var p = 0; p < totalPages; p++) {
      var start = p * pageSize;
      var end = Math.min(start + pageSize, totalLevels);
      var slice = levels.slice(start, end);
      if (slice.some(function(x) { return x === undefined; })) {
        promises.push(
          fetch('/levels?page=' + p + '&pageSize=' + pageSize)
            .then(function(res) { return res.json(); })
            .then(function(data) {
              if (levels.length !== data.total) {
                levels = new Array(data.total);
                totalLevels = data.total;
              }
              for (var i = 0; i < data.items.length; i++) {
                levels[start + i] = data.items[i];
              }
            })
        );
      }
    }
    return Promise.all(promises);
  }

  function saveOrder() {
    ensureAllLevelsLoaded().then(function() {
      updateOrdinals();
      fetch('/save-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(levels.map(function(x) { return x.id; }))
      });
    });
  }
});
