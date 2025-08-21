// editor.js
document.addEventListener('DOMContentLoaded', function() {
  // ——— Theme Management ———
  var themeToggle = document.getElementById('theme-toggle');
  var themeIcon = themeToggle.querySelector('.theme-icon');
  var currentTheme = 'light'; // Default fallback
  var storageAvailable = false;
  
  // Test localStorage availability with error handling
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
    
    // Try to save to localStorage if available
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
  
  // Initialize theme
  applyTheme(currentTheme);
  themeToggle.addEventListener('click', toggleTheme);
  
  // ——— Cached elements ———
  var grid                = document.getElementById('grid');
  var paletteButtonsGrid  = document.getElementById('palette-buttons');
  var paletteActions      = document.querySelector('.action-buttons');
  var shortcutsBtn        = document.querySelector('.shortcuts-btn');
  var shortcutsPopup      = document.getElementById('shortcuts-popup');

  var prevGridButton     = document.getElementById('prev-grid');
  var nextGridButton     = document.getElementById('next-grid');
  var addGridButton      = document.getElementById('add-grid');
  var removeGridButton   = document.getElementById('remove-grid');
  var gridIndicator      = document.getElementById('grid-indicator');

  var goalsList           = document.getElementById('goals-list');
  var addGoalButton       = document.getElementById('add-goal-button');

  var shapeWeightsList    = document.getElementById('shape-weights-list');
  var addShapeWeightButton= document.getElementById('add-weight-button');

  var groupWeightsList    = document.getElementById('group-weights-list');
  var addGroupWeightButton= document.getElementById('add-group-weight-button');

  var startingShapesList  = document.getElementById('starting-shapes-list');
  var addStartingShapeButton = document.getElementById('add-starting-shape-button');

  var levelName       = document.getElementById('level-name');
  var levelSeed       = document.getElementById('level-seed');
  var levelMoves      = document.getElementById('level-moves');
  var levelMode       = document.getElementById('level-mode');
  var powerupChance   = document.getElementById('powerup-chance');
  var flagEasy        = document.getElementById('shape-easy');
  var flagHard        = document.getElementById('shape-hard');
  var flagHelper      = document.getElementById('shape-helper');

  // ——— State ———
  var activeDef = null;
  var isMouseDown = false;
  var grids = [];
  var currentGrid = 0;
  var gridData = null; // reference to current grid cells
  var gridWidth = 9;
  var gridHeight = 9;

  var levelId = generateLevelId();

  // Preload level from query parameter
  var params = new URLSearchParams(window.location.search);
  var paramLevel = params.get('level');
  if (paramLevel) {
    fetch('/levels/' + encodeURIComponent(paramLevel) + '.json')
      .then(function(r){ if(r.ok) return r.json(); throw new Error('not found'); })
      .then(function(json){ loadLevelObject(json); })
      .catch(function(){});
  }

  // Undo/Redo state
  var undoStack = [];
  var redoStack = [];
  var suppressUndo = false;
  var maxUndo = 100;

  function recordState() {
    if (suppressUndo) return;
    undoStack.push(buildLevelJson());
    if (undoStack.length > maxUndo) undoStack.shift();
    redoStack = [];
  }

  function applyState(json) {
    suppressUndo = true;
    var lvl = JSON.parse(json);
    loadLevelObject(lvl);
    suppressUndo = false;
  }

  function undo() {
    if (!undoStack.length) return;
    redoStack.push(buildLevelJson());
    var prev = undoStack.pop();
    applyState(prev);
  }

  function redo() {
    if (!redoStack.length) return;
    undoStack.push(buildLevelJson());
    var next = redoStack.pop();
    applyState(next);
  }

  [levelName, levelSeed, levelMoves, levelMode, powerupChance,
   flagEasy, flagHard, flagHelper].forEach(function(el){
    el.addEventListener('change', recordState);
  });

  // ——— Helpers ———
  function createSelect(options, onChange, initial) {
    var sel = document.createElement('select');
    options.forEach(function(o) {
      var opt = document.createElement('option');
      opt.value = o.value;
      opt.textContent = o.label;
      if (initial !== undefined && initial === o.value) opt.selected = true;
      sel.appendChild(opt);
    });
    if (onChange) sel.addEventListener('change', function(){ onChange(sel); });
    return sel;
  }

  function createInput(type, attrs) {
    var inp = document.createElement('input');
    inp.type = type;
    for (var k in attrs) inp[k] = attrs[k];
    return inp;
  }

  function cloneData(data) {
    if (data == null) return null;
    if (typeof structuredClone === 'function') {
      return structuredClone(data);
    }
    return JSON.parse(JSON.stringify(data));
  }

  var itemTypeIdToType = {};
  var itemTypeCanonical = {};
  paletteDefinitions.forEach(function(p) {
    if (typeof p.itemTypeId === 'number') {
      itemTypeIdToType[p.itemTypeId] = p.type;
    }
    itemTypeCanonical[p.type.toLowerCase()] = p.type;
  });

  function normalizeItemType(type) {
    if (typeof type === 'number') {
      var base = type & 0xffff;
      return itemTypeIdToType[base] || '';
    }
    var key = (type || '').toString().toLowerCase();
    return itemTypeCanonical[key] || key;
  }

  function normalizeShapeType(type) {
    if (!type) return '';
    var t = type.toString().toLowerCase();
    var match = shapeDefinitions.find(function(s){
      return s.type.toLowerCase() === t;
    });
    return match ? match.type : type;
  }

  function normalizeGroupName(group) {
    if (!group) return '';
    var g = group.toString().toLowerCase();
    var groups = ['Easy','Hard','Helper'];
    var match = groups.find(function(x){ return x.toLowerCase() === g; });
    return match || group;
  }

  function parseShapeGroup(group) {
    if (typeof group === 'number') return group;
    if (Array.isArray(group)) {
      return group.reduce(function(acc, g){
        g = g.toString().toLowerCase();
        if (g === 'easy') acc |= 1;
        else if (g === 'hard') acc |= 2;
        else if (g === 'helper') acc |= 4;
        return acc;
      }, 0);
    }
    if (typeof group === 'string') {
      return group.split(/[\s,|]+/).reduce(function(acc, g){
        g = g.toLowerCase();
        if (g === 'easy') acc |= 1;
        else if (g === 'hard') acc |= 2;
        else if (g === 'helper') acc |= 4;
        return acc;
      }, 0);
    }
    return 0;
  }

  function normalizeRotation(rot) {
    if (!rot) return 'Deg0';
    var key = rot.toString().toLowerCase();
    var map = { deg0:'Deg0', deg90:'Deg90', deg180:'Deg180', deg270:'Deg270' };
    return map[key] || rot;
  }

  function generateLevelId() {
    if (window.crypto && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0;
      var v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function createRemoveButton(listEl, entryEl) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = '×';
    btn.className = 'remove-item-button';
    btn.addEventListener('click', function(){
      recordState();
      listEl.removeChild(entryEl);
      updateSectionCounts();
    });
    return btn;
  }

  function createEntry(listEl, fieldEls) {
    var entry = document.createElement('div');
    entry.className = 'item-entry';
    fieldEls.forEach(function(el){
      entry.appendChild(el);
      el.addEventListener('change', recordState);
    });
    entry.appendChild(createRemoveButton(listEl, entry));
    listEl.appendChild(entry);
    return entry;
  }

  function createEmptyGrid() {
    var cells = [];
    var totalCells = gridWidth * gridHeight;
    for (var i = 0; i < totalCells; i++) {
      cells.push({cellType:'normal', item:null, base:null, overlay:null});
    }
    return {cells: cells, targets: [], width: gridWidth, height: gridHeight};
  }

  function setGridIndicatorText() {
    gridIndicator.textContent = 'Grid ' + (currentGrid + 1) + '/' + grids.length;
  }

  function getGoalsFromList() {
    return Array.from(goalsList.children).map(function(e){
      return {
        type: e.querySelector('select').value,
        count: +e.querySelector('input').value
      };
    });
  }

  function setGoalsList(targets) {
    goalsList.innerHTML = '';
    targets.forEach(function(t){
      addGoalButton.click();
      var el = goalsList.lastChild;
      el.querySelector('select').value = normalizeItemType(t.type);
      el.querySelector('input').value = t.count;
    });
  }

  function renderCell(cell, data) {
    cell.style.backgroundColor = data.cellType === 'void' ? '#aaa' : 'white';
    var images = [], sizes = [], repeats = [], positions = [];
    ['overlay','item','base'].forEach(function(slot){
      var obj = data[slot];
      if (obj) {
        var def = paletteDefinitions.find(function(p){ return p.id === obj.id; });
        if (def) {
          images.push("url('" + def.icon + "')");
          sizes.push('cover');
          repeats.push('no-repeat');
          positions.push('center');
        }
      }
    });
    if (images.length) {
      cell.style.backgroundImage = images.join(',');
      cell.style.backgroundSize = sizes.join(',');
      cell.style.backgroundRepeat = repeats.join(',');
      cell.style.backgroundPosition = positions.join(',');
    } else {
      cell.style.backgroundImage = '';
      cell.style.backgroundSize = '';
      cell.style.backgroundRepeat = '';
      cell.style.backgroundPosition = '';
    }
  }

  function renderGridCells() {
    var totalCells = gridWidth * gridHeight;
    for (var i = 0; i < totalCells && i < cellElements.length; i++) {
      renderCell(cellElements[i], gridData[i]);
    }
  }

  function saveCurrentGrid() {
    grids[currentGrid].targets = getGoalsFromList();
  }

  function loadGrid(index) {
    if (currentGrid >= 0 && currentGrid < grids.length) {
      saveCurrentGrid();
    }
    currentGrid = index;
    gridData = grids[currentGrid].cells;
    renderGridCells();
    setGoalsList(grids[currentGrid].targets);
    setGridIndicatorText();
    updateSectionCounts();
  }

  function addNewGrid() {
    saveCurrentGrid();
    grids.push(createEmptyGrid());
    loadGrid(grids.length - 1);
  }

  // ——— Grid init ———
  var cellElements = [];

  function getCellSize() {
    var gridStyle = getComputedStyle(grid);
    return parseInt(gridStyle.getPropertyValue('--cell-size')) || 52;
  }

  function updateGridSize() {
    // Clear existing cells
    grid.innerHTML = '';
    cellElements = [];

    var totalCells = gridWidth * gridHeight;
    var cellSize = getCellSize();
    grid.style.gridTemplateColumns = `repeat(${gridWidth}, ${cellSize}px)`;
    grid.style.gridTemplateRows = `repeat(${gridHeight}, ${cellSize}px)`;
    
    for (var i = 0; i < totalCells; i++) {
      var cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      grid.appendChild(cell);
      cellElements.push(cell);
    }
    
    // Update current grid data if it exists
    if (grids[currentGrid]) {
      var currentGridData = grids[currentGrid];
      var newCells = [];
      var totalCells = gridWidth * gridHeight;
      
      for (var i = 0; i < totalCells; i++) {
        if (i < currentGridData.cells.length) {
          newCells.push(currentGridData.cells[i]);
        } else {
          newCells.push({cellType:'normal', item:null, base:null, overlay:null});
        }
      }
      
      grids[currentGrid] = {
        cells: newCells,
        targets: currentGridData.targets,
        width: gridWidth,
        height: gridHeight
      };
      gridData = grids[currentGrid].cells;
      renderGridCells();
    }
  }

  updateGridSize();
  window.addEventListener('resize', updateGridSize);
  grid.addEventListener('mousedown', function(e){
    e.preventDefault(); // Prevent drag and drop behavior
    isMouseDown = true;
    recordState();
    handleCellEvent(e);
  });
  grid.addEventListener('mouseover', function(e){
    if (isMouseDown) handleCellEvent(e);
  });
  grid.addEventListener('mouseleave', function(){
    isMouseDown = false; // Reset when leaving grid
  });
  grid.addEventListener('dragstart', function(e){
    e.preventDefault(); // Prevent any drag operations
  });
  window.addEventListener('mouseup', function(){ 
    isMouseDown = false; 
  });

  // create initial grid
  grids.push(createEmptyGrid());
  gridData = grids[0].cells;
  renderGridCells();
  setGridIndicatorText();
  recordState();

  prevGridButton.addEventListener('click', function(){
    if (currentGrid > 0) loadGrid(currentGrid - 1);
  });
  nextGridButton.addEventListener('click', function(){
    if (currentGrid < grids.length - 1) loadGrid(currentGrid + 1);
  });
  addGridButton.addEventListener('click', function(){
    recordState();
    addNewGrid();
  });
  removeGridButton.addEventListener('click', function(){
    if (grids.length <= 1) return;
    recordState();
    grids.splice(currentGrid, 1);
    var newIndex = Math.min(currentGrid, grids.length - 1);
    currentGrid = -1;
    loadGrid(newIndex);
  });

  // Grid size controls
  var gridWidthInput = document.getElementById('gridWidth');
  var gridHeightInput = document.getElementById('gridHeight');
  
  gridWidthInput.addEventListener('input', function(){
    recordState();
    let value = parseInt(this.value);
    if (value < 2) this.value = 2;
    if (value > 9) this.value = 9;
    gridWidth = parseInt(this.value);
    updateGridSize();
  });

  gridHeightInput.addEventListener('input', function(){
    recordState();
    let value = parseInt(this.value);
    if (value < 2) this.value = 2;
    if (value > 9) this.value = 9;
    gridHeight = parseInt(this.value);
    updateGridSize();
  });

  function handleCellEvent(e) {
    var cell = e.target.closest('.cell');
    if (!cell || !activeDef) return;
    var idx = +cell.dataset.index;
    if (e.shiftKey) return clearCell(cell, idx);
    paintCell(cell, idx);
  }

  function paintCell(cell, idx) {
    var d = gridData[idx];
    if (activeDef.cellType === 'void') {
      d.cellType = 'void';
      d.item = d.base = d.overlay = null;
    } else {
      d.cellType = 'normal';
      var slot = activeDef.slot || 'item';
      d[slot] = {
        id: activeDef.id,
        type: activeDef.type,
        data: activeDef.defaultData ? cloneData(activeDef.defaultData) : null
      };
    }
    renderCell(cell, d);
  }

  function clearCell(cell, idx) {
    gridData[idx] = {cellType:'normal', item:null, base:null, overlay:null};
    renderCell(cell, gridData[idx]);
  }

  // ——— Palette buttons ———
  paletteDefinitions.forEach(function(def){
    var btn = document.createElement('button');
    btn.className = 'palette-button';
    btn.dataset.id = def.id;
    btn.dataset.label = def.label.toLowerCase();
    btn.innerHTML = '<img src="' + def.icon + '" alt="' + def.label + '">';
    paletteButtonsGrid.appendChild(btn);
  });
  paletteButtonsGrid.addEventListener('click', function(e){
    var btn = e.target.closest('button');
    if (!btn) return;
    activeDef = paletteDefinitions.find(function(d){ return d.id === btn.dataset.id; });
    document.querySelectorAll('.palette-button')
      .forEach(function(b){ b.classList.remove('selected'); });
    btn.classList.add('selected');
  });

  // ——— Palette search ———
  var paletteSearch = document.getElementById('palette-search');
  paletteSearch.addEventListener('input', function(e){
    var searchTerm = e.target.value.toLowerCase();
    document.querySelectorAll('.palette-button').forEach(function(btn){
      var label = btn.dataset.label;
      if (label.includes(searchTerm)) {
        btn.style.display = 'block';
      } else {
        btn.style.display = 'none';
      }
    });
  });

  // ——— Palette actions ———
  paletteActions.addEventListener('click', function(e){
    var act = e.target.dataset.action;
    if (act === 'undo')  return undo();
    if (act === 'redo')  return redo();
    if (act === 'new')   { recordState(); return resetLevel(); }
    if (act === 'save')  return saveLevel();
    if (act === 'save-level') return sendLevel('/save-level');
    if (act === 'upload')return sendLevel('/play-level');
    if (act === 'copy') return copyLevel();
    if (act === 'screenshot') return screenshotGrid();
    if (act === 'load')  return loadLevel();
  });

  if (shortcutsBtn && shortcutsPopup) {
    shortcutsBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      shortcutsPopup.classList.toggle('hidden');
    });

    document.addEventListener('click', function(e) {
      if (!shortcutsPopup.classList.contains('hidden') &&
          !shortcutsPopup.contains(e.target) &&
          e.target !== shortcutsBtn) {
        shortcutsPopup.classList.add('hidden');
      }
    });
  }

  function resetLevel() {
    levelId = generateLevelId();
    document.querySelectorAll('.cell').forEach(function(cell){
      cell.style.backgroundColor = 'white';
      cell.style.backgroundImage = '';
    });
    grids = [createEmptyGrid()];
    currentGrid = 0;
    gridData = grids[0].cells;
    renderGridCells();
    setGridIndicatorText();
    levelName.value     = 'My Custom Level';
    levelSeed.value     = 0;
    levelMoves.value    = 25;
    levelMode.selectedIndex = 0;
    powerupChance.value = 0;
    [goalsList, shapeWeightsList, groupWeightsList, startingShapesList]
      .forEach(function(l){ l.innerHTML = ''; });
    [flagEasy, flagHard, flagHelper].forEach(function(cb){ cb.checked = false; });
    updateSectionCounts();
  }

  // ——— Add … handlers ———
  addGoalButton.addEventListener('click', function(){
    recordState();
    // unique item types
    var types = Array.from(new Set(
      paletteDefinitions.map(function(d){return d.type;})
    ));
    var opts = types.map(function(t){ return {
      value:t, label:t.charAt(0).toUpperCase()+t.slice(1)
    };});
    var sel = createSelect(opts);
    var inp = createInput('number',{min:1,value:1});
    createEntry(goalsList,[sel,inp]);
    updateSectionCounts();
  });

  addShapeWeightButton.addEventListener('click', function(){
    recordState();
    var opts = shapeDefinitions.map(function(s){
      return {value:s.type,label:s.label,icon:s.icon};
    });
    var sel = createSelect(opts, function(sel){
      img.src = opts.find(function(o){return o.value===sel.value;}).icon;
    });
    var img = document.createElement('img');
    img.src = opts[0].icon;
    img.style = 'width:32px;height:32px;object-fit:contain;margin-left:8px';
    var inp = createInput('number',{min:0,step:0.1,value:1});
    createEntry(shapeWeightsList,[sel,img,inp]);
    updateSectionCounts();
  });

  addGroupWeightButton.addEventListener('click', function(){
    recordState();
    var groups = ['Easy','Hard','Helper'].map(function(g){
      return {value:g,label:g};
    });
    var sel = createSelect(groups);
    var inp = createInput('number',{min:0,step:0.1,value:1});
    createEntry(groupWeightsList,[sel,inp]);
    updateSectionCounts();
  });

  addStartingShapeButton.addEventListener('click', function(){
    recordState();
    var shapeOpts = shapeDefinitions.map(function(s){
      return {value:s.type,label:s.label,icon:s.icon};
    });
    var rotOpts = ['Deg0','Deg90','Deg180','Deg270'].map(function(r){
      return {value:r,label:r};
    });
    var selS = createSelect(shapeOpts, function(sel){
      img.src = shapeOpts.find(function(o){return o.value===sel.value;}).icon;
    });
    var img = document.createElement('img');
    img.src = shapeOpts[0].icon;
    img.style = 'width:24px;height:24px;object-fit:contain;margin-left:8px';
    var selR = createSelect(rotOpts, function(sel){
      var deg = {Deg0:0,Deg90:90,Deg180:180,Deg270:270}[sel.value];
      img.style.transform = 'rotate(' + deg + 'deg)';
    });
    // trigger initial rotation
    selR.dispatchEvent(new Event('change'));
    createEntry(startingShapesList,[selS,img,selR]);
    updateSectionCounts();
  });

  // ——— Build JSON & I/O ———
  function buildLevelJson() {
    var seed  = parseInt(levelSeed.value, 10) || 0;
    var moves = parseInt(levelMoves.value,10) || 20;
    var mode = levelMode.value;
    var power = parseFloat(powerupChance.value) || 0;
    var flags = (flagEasy.checked?1:0) | (flagHard.checked?2:0) | (flagHelper.checked?4:0);

    function listData(listEl, mapper) {
      return Array.from(listEl.children).map(function(e){ return mapper(e); });
    }
    saveCurrentGrid();

    var shapeWeights = listData(shapeWeightsList, function(e){
      var sel = e.querySelector('select'), inp = e.querySelector('input');
      return {type:sel.value,weight:+inp.value};
    });
    var groupWeights = listData(groupWeightsList, function(e){
      var sel = e.querySelector('select'), inp = e.querySelector('input');
      return {group:sel.value,weight:+inp.value};
    });
    var startShapes = listData(startingShapesList, function(e){
      var s = e.querySelectorAll('select');
      return {type:s[0].value,rotation:s[1].value};
    });

    var gridsJson = grids.map(function(g){
      var cells = g.cells.map(function(_, i){
        var x = i%gridWidth, y = Math.floor(i/gridWidth), fy = (gridHeight-1)-y, idx = x+fy*gridWidth;
        var d = g.cells[idx];
        return {
          cellType:d.cellType,
          item:d.item ? cloneData(d.item) : null,
          base:d.base ? cloneData(d.base) : null,
          overlay:d.overlay ? cloneData(d.overlay) : null
        };
      });
      return { width:gridWidth, height:gridHeight, cells:cells, targets:g.targets };
    });

    return JSON.stringify({
      version:1,
      levelId:levelId,
      name:levelName.value||'My Custom Level',
      currentGrid: currentGrid,
      grids:gridsJson,
      config:{
        seed:seed,
        moves:moves,
        powerUpSpawnOnShapeChance:power,
        mode:mode,
        targets:[],
        shapeGroup:flags,
        groupWeights:groupWeights,
        shapeWeights:shapeWeights,
        startingShapes:startShapes
      }
    });
  }

  async function saveLevel() {
    var data = buildLevelJson();
    if (window.showSaveFilePicker) {
      try {
        var handle = await window.showSaveFilePicker({
          suggestedName: levelId + '.json',
          types:[{description:'JSON Files',accept:{'application/json':['.json']}}]
        });
        var w = await handle.createWritable();
        await w.write(data);
        await w.close();
        return;
      } catch(e) {
        if (e.name === 'AbortError') {
          return; // User canceled, don't download
        }
        // fall back to download for other errors
      }
    }
    var blob = new Blob([data], {type:'application/json'});
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = levelId + '.json';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
  }

  async function copyLevel() {
    var data = buildLevelJson();
    try {
      await navigator.clipboard.writeText(data);
    } catch(e) {
      alert('Failed to copy');
    }
  }

  async function screenshotGrid(returnDataUrl) {
    // Prepare canvas based on grid layout
    var gridStyle = window.getComputedStyle(grid);
    var cellSize = parseInt(gridStyle.getPropertyValue('--cell-size')) || 52;
    var gapX = parseInt(gridStyle.columnGap) || parseInt(gridStyle.gap) || 3;
    var gapY = parseInt(gridStyle.rowGap) || parseInt(gridStyle.gap) || 3;
    var paddingLeft = parseInt(gridStyle.paddingLeft) || 12;
    var paddingRight = parseInt(gridStyle.paddingRight) || 12;
    var paddingTop = parseInt(gridStyle.paddingTop) || 12;
    var paddingBottom = parseInt(gridStyle.paddingBottom) || 12;
    var gw = grids[currentGrid] ? grids[currentGrid].width : gridWidth;
    var gh = grids[currentGrid] ? grids[currentGrid].height : gridHeight;

    var canvas = document.createElement('canvas');
    canvas.width = paddingLeft + paddingRight + gw * cellSize + (gw - 1) * gapX;
    canvas.height = paddingTop + paddingBottom + gh * cellSize + (gh - 1) * gapY;
    var ctx = canvas.getContext('2d');

    // Draw grid background
    var gridBg = gridStyle.backgroundColor || 'white';
    ctx.fillStyle = gridBg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Gather all icons that need loading
    var iconPaths = {};
    gridData.forEach(function(cell) {
      ['base', 'item', 'overlay'].forEach(function(slot) {
        var obj = cell[slot];
        if (!obj) return;
        var def = paletteDefinitions.find(function(p) { return p.id === obj.id; });
        if (def) iconPaths[def.icon] = null;
      });
    });

    // Load images
    await Promise.all(Object.keys(iconPaths).map(function(path) {
      return new Promise(function(resolve, reject) {
        var img = new Image();
        if (location.protocol !== 'file:') img.crossOrigin = 'anonymous';
        img.onload = function() { iconPaths[path] = img; resolve(); };
        img.onerror = reject;
        img.src = path;
      });
    }));

    // Draw cells
    for (var i = 0; i < cellElements.length; i++) {
      var row = Math.floor(i / gw);
      var col = i % gw;
      var x = paddingLeft + col * (cellSize + gapX);
      var y = paddingTop + row * (cellSize + gapY);

      var cell = gridData[i];
      var cellElement = cellElements[i];

      // Draw cell background
      var bgColor = window.getComputedStyle(cellElement).backgroundColor;
      if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)') {
        ctx.fillStyle = bgColor;
      } else if (cell.cellType === 'void') {
        ctx.fillStyle = '#aaa';
      } else {
        ctx.fillStyle = 'white';
      }
      ctx.fillRect(x, y, cellSize, cellSize);

      // Draw border
      ctx.strokeStyle = '#ddd';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, cellSize, cellSize);

      // Draw item images base -> item -> overlay
      ['base', 'item', 'overlay'].forEach(function(slot) {
        var obj = cell[slot];
        if (!obj) return;
        var def = paletteDefinitions.find(function(p) { return p.id === obj.id; });
        var img = def && iconPaths[def.icon];
        if (img) ctx.drawImage(img, x, y, cellSize, cellSize);
      });
    }

    if (returnDataUrl) {
      return canvas.toDataURL('image/png');
    }

    function downloadBlob(blob) {
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'grid.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      alert('Screenshot downloaded!');
    }

    canvas.toBlob(function(blob) {
      if (navigator.clipboard && window.ClipboardItem && location.protocol !== 'file:') {
        navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]).then(function() {
          alert('Screenshot copied to clipboard!');
        }).catch(function(err) {
          alert('Clipboard failed: ' + err.message);
          downloadBlob(blob);
        });
      } else {
        downloadBlob(blob);
      }
    }, 'image/png');
  }

  async function sendLevel(url) {
    var obj = JSON.parse(buildLevelJson());
    if (url === '/save-level') {
      try {
        obj.screenshot = await screenshotGrid(true);
      } catch(e) {}
    }
    fetch(url, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(obj)
    })
    .then(function(r){
      if (!r.ok) throw r.statusText;
    })
    .catch(function(){ alert('Failed'); });
  }

  function loadLevelObject(lvl) {
  var prev = suppressUndo;
  suppressUndo = true;
  if (lvl.grids && lvl.grids[0]) {
    gridWidth = lvl.grids[0].width || gridWidth;
    gridHeight = lvl.grids[0].height || gridHeight;
    gridWidthInput.value = gridWidth;
    gridHeightInput.value = gridHeight;
  }
  resetLevel();
  levelId = lvl.levelId || levelId;
  updateGridSize();
  levelName.value     = lvl.name||'';
  levelSeed.value     = lvl.config.seed||0;
  levelMoves.value    = lvl.config.moves||20;
  levelMode.value     = lvl.config.mode;
  powerupChance.value = lvl.config.powerUpSpawnOnShapeChance||0;
  var grp = parseShapeGroup(lvl.config.shapeGroup);
  flagEasy.checked   = !!(grp & 1);
  flagHard.checked   = !!(grp & 2);
  flagHelper.checked = !!(grp & 4);
  grids = [];
  currentGrid = -1;
  var gridArr = Array.isArray(lvl.grids) && lvl.grids.length > 0
    ? lvl.grids
    : [{ width:lvl.width, height:lvl.height, cells:lvl.cells, targets:lvl.config ? lvl.config.targets : [] }];
  gridArr.forEach(function(g){
    var newGrid = createEmptyGrid();
    (g.cells||[]).forEach(function(c,i){
      var gridW = g.width || gridWidth;
      var gridH = g.height || gridHeight;
      var x = i%gridW, y = Math.floor(i/gridW), fy = (gridH-1)-y, idx = x+fy*gridWidth;
      var d = newGrid.cells[idx];
      d.cellType = c.cellType || 'normal';
      if (c.item) {
        d.item = { id:c.item.id, type:c.item.type, data:c.item.data || null };
      }
      if (c.base) {
        d.base = { id:c.base.id, type:c.base.type, data:c.base.data || null };
      }
    if (c.overlay) {
      d.overlay = { id:c.overlay.id, type:c.overlay.type, data:c.overlay.data || null };
    }
  });
    newGrid.targets = (g.targets || []).map(function(t){
      return { type: normalizeItemType(t.type), count: t.count };
    });
    grids.push(newGrid);
  });
  var loadIndex = 0;
  if (typeof lvl.currentGrid === 'number' && lvl.currentGrid >= 0) {
    loadIndex = Math.min(lvl.currentGrid, grids.length - 1);
  }
  loadGrid(loadIndex);
  function restore(listName, arr, clickBtn, fillFn) {
    if (!Array.isArray(arr)) return;
    arr.forEach(function(item){
      clickBtn.click();
      var last = ({goals:goalsList,groupWeights:groupWeightsList,
                   shapeWeights:shapeWeightsList,
                   startingShapes:startingShapesList})[listName].lastChild;
      fillFn(last,item);
    });
  }
  restore('groupWeights',  lvl.config.groupWeights, addGroupWeightButton, function(e,it){
    e.querySelector('select').value = normalizeGroupName(it.group);
    e.querySelector('input').value  = it.weight;
  });
  restore('shapeWeights',  lvl.config.shapeWeights, addShapeWeightButton, function(e,it){
    var s = e.querySelector('select'), i = e.querySelector('input'), img = e.querySelector('img');
    var type = normalizeShapeType(it.type);
    s.value = type; i.value = it.weight;
    var def = shapeDefinitions.find(function(sd){return sd.type===type;});
    if (def) img.src = def.icon;
  });
  restore('startingShapes', lvl.config.startingShapes, addStartingShapeButton, function(e,it){
    var s = e.querySelectorAll('select'), img = e.querySelector('img');
    var type = normalizeShapeType(it.type);
    s[0].value = type;
    var def = shapeDefinitions.find(function(sd){return sd.type===type;});
    if (def) img.src = def.icon;
    s[1].value = normalizeRotation(it.rotation);
    s[1].dispatchEvent(new Event('change'));
  });
  updateSectionCounts();
  suppressUndo = prev;
}

function loadLevel() {
  var inp = document.createElement('input');
  inp.type = 'file';
  inp.accept = '.json';
  inp.addEventListener('change', function(e){
    var file = e.target.files[0];
    if (!file) return;
    file.text().then(function(txt){
      var lvl = JSON.parse(txt);
      recordState();
      loadLevelObject(lvl);
    })
    .catch(function(){alert('Failed to load');});
  });
  inp.click();
}

// ——— Collapsible sections ———
document.querySelectorAll('.section-toggle').forEach(function(toggle) {
  toggle.addEventListener('click', function() {
    var target = document.getElementById(toggle.dataset.target);
    var isExpanded = toggle.getAttribute('data-expanded') === 'true';
    var toggleIcon = toggle.querySelector('.toggle-icon');
    
    if (isExpanded) {
      target.classList.add('collapsed');
      toggle.setAttribute('data-expanded', 'false');
      toggleIcon.textContent = '▶';
    } else {
      target.classList.remove('collapsed');
      toggle.setAttribute('data-expanded', 'true');
      toggleIcon.textContent = '▼';
    }
    updateSectionCounts();
  });
});

function updateSectionCounts() {
  // Update Goals count
  var goalsCount = goalsList.children.length;
  var goalsToggle = document.querySelector('[data-target="goals-section"] .toggle-text');
  updateCountBadge(goalsToggle, '🎯 Goals', goalsCount);
  
  // Update Group Weights count
  var groupWeightsCount = groupWeightsList.children.length;
  var groupToggle = document.querySelector('[data-target="group-weights-section"] .toggle-text');
  updateCountBadge(groupToggle, '👥 Group Weights', groupWeightsCount);
  
  // Update Shape Weights count
  var shapeWeightsCount = shapeWeightsList.children.length;
  var shapeToggle = document.querySelector('[data-target="shape-weights-section"] .toggle-text');
  updateCountBadge(shapeToggle, '⚖️ Shape Weights', shapeWeightsCount);
  
  // Update Starting Shapes count
  var startingShapesCount = startingShapesList.children.length;
  var startingToggle = document.querySelector('[data-target="starting-shapes-section"] .toggle-text');
  updateCountBadge(startingToggle, '🚀 Starting Shapes', startingShapesCount);
}

function updateCountBadge(titleEl, baseName, count) {
  if (!titleEl) return;
  var existingBadge = titleEl.querySelector('.section-count');
  if (existingBadge) {
    existingBadge.textContent = count;
  } else {
    titleEl.innerHTML = baseName + '<span class="section-count">' + count + '</span>';
  }
}

// ——— Keyboard shortcuts ———
document.addEventListener('keydown', function(e) {
  if (e.ctrlKey || e.metaKey) {
    if (e.key === 's') {
      e.preventDefault();
      saveLevel();
    } else if (e.key === 'n') {
      e.preventDefault();
      recordState();
      resetLevel();
    } else if (e.key === 'z') {
      e.preventDefault();
      undo();
    } else if (e.key === 'y') {
      e.preventDefault();
      redo();
    }
  }
});

// ——— Initialize collapsible state ———
document.querySelector('[data-target="goals-section"]').setAttribute('data-expanded', 'true');
document.querySelector('[data-target="group-weights-section"]').setAttribute('data-expanded', 'false');
document.querySelector('[data-target="shape-weights-section"]').setAttribute('data-expanded', 'false');
document.querySelector('[data-target="starting-shapes-section"]').setAttribute('data-expanded', 'false');

// Initialize toggle icons based on expanded state
document.querySelector('[data-target="goals-section"] .toggle-icon').textContent = '▼';
document.querySelector('[data-target="group-weights-section"] .toggle-icon').textContent = '▶';
document.querySelector('[data-target="shape-weights-section"] .toggle-icon').textContent = '▶';
document.querySelector('[data-target="starting-shapes-section"] .toggle-icon').textContent = '▶';

// Initialize section counts
setTimeout(updateSectionCounts, 100);
});
