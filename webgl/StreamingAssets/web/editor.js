// editor.js
document.addEventListener('DOMContentLoaded', function() {
  // ——— Cached elements ———
  var grid                = document.getElementById('grid');
  var paletteButtonsGrid  = document.getElementById('palette-buttons');
  var paletteActions      = document.querySelector('.palette-actions');

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

  function createRemoveButton(listEl, entryEl) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = '×';
    btn.className = 'remove-item-button';
    btn.addEventListener('click', function(){
      listEl.removeChild(entryEl);
    });
    return btn;
  }

  function createEntry(listEl, fieldEls) {
    var entry = document.createElement('div');
    entry.className = 'item-entry';
    fieldEls.forEach(function(el){ entry.appendChild(el); });
    entry.appendChild(createRemoveButton(listEl, entry));
    listEl.appendChild(entry);
    return entry;
  }

  function createEmptyGrid() {
    var cells = [];
    for (var i = 0; i < 64; i++) {
      cells.push({cellType:'normal', itemType:null, itemData:null, id:null});
    }
    return {cells: cells, targets: []};
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
      el.querySelector('select').value = t.type;
      el.querySelector('input').value = t.count;
    });
  }

  function renderGridCells() {
    for (var i = 0; i < 64; i++) {
      var cell = cellElements[i];
      var d = gridData[i];
      var def = null;
      if (d.itemType && d.id) {
        def = paletteDefinitions.find(function(p){ return p.id === d.id; });
      } else if (d.cellType === 'void') {
        def = paletteDefinitions.find(function(p){ return p.type === 'void'; });
      }
      var old = activeDef;
      if (def) {
        activeDef = def;
        paintCell(cell, i);
      } else {
        clearCell(cell, i);
      }
      activeDef = old;
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
  }

  function addNewGrid() {
    saveCurrentGrid();
    grids.push(createEmptyGrid());
    loadGrid(grids.length - 1);
  }

  // ——— Grid init ———
  var cellElements = [];
  for (var i = 0; i < 64; i++) {
    var cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    grid.appendChild(cell);
    cellElements.push(cell);
  }
  grid.addEventListener('mousedown', function(e){
    isMouseDown = true; handleCellEvent(e);
  });
  grid.addEventListener('mouseover', function(e){
    if (isMouseDown) handleCellEvent(e);
  });
  window.addEventListener('mouseup', function(){ isMouseDown = false; });

  // create initial grid
  grids.push(createEmptyGrid());
  gridData = grids[0].cells;
  renderGridCells();
  setGridIndicatorText();

  prevGridButton.addEventListener('click', function(){
    if (currentGrid > 0) loadGrid(currentGrid - 1);
  });
  nextGridButton.addEventListener('click', function(){
    if (currentGrid < grids.length - 1) loadGrid(currentGrid + 1);
  });
  addGridButton.addEventListener('click', function(){
    addNewGrid();
  });
  removeGridButton.addEventListener('click', function(){
    if (grids.length <= 1) return;
    grids.splice(currentGrid, 1);
    var newIndex = Math.min(currentGrid, grids.length - 1);
    currentGrid = -1;
    loadGrid(newIndex);
  });

  function handleCellEvent(e) {
    var cell = e.target.closest('.cell');
    if (!cell || !activeDef) return;
    var idx = +cell.dataset.index;
    if (e.shiftKey) return clearCell(cell, idx);
    paintCell(cell, idx);
  }

  function paintCell(cell, idx) {
    cell.style.backgroundColor = activeDef.cellType === 'void' ? '#aaa' : 'white';
    cell.style.backgroundImage = "url('" + activeDef.icon + "')";
    cell.style.backgroundSize = 'cover';
    cell.style.backgroundPosition = 'center';
    var d = gridData[idx];
    d.cellType = activeDef.cellType;
    d.itemType = activeDef.type === 'void' ? null : activeDef.type;
    d.id       = activeDef.id;
    d.itemData = activeDef.defaultData
      ? structuredClone(activeDef.defaultData)
      : null;
  }

  function clearCell(cell, idx) {
    cell.style.backgroundColor = 'white';
    cell.style.backgroundImage = '';
    gridData[idx] = {cellType:'normal',itemType:null,itemData:null,id:null};
  }

  // ——— Palette buttons ———
  paletteDefinitions.forEach(function(def){
    var btn = document.createElement('button');
    btn.className = 'palette-button';
    btn.dataset.id = def.id;
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

  // ——— Palette actions ———
  paletteActions.addEventListener('click', function(e){
    var act = e.target.dataset.action;
    if (act === 'new')   return resetLevel();
    if (act === 'save')  return saveLevel();
    if (act === 'upload')return sendLevel('/play-level');
    if (act === 'store') return sendLevel('/save-level');
    if (act === 'load')  return loadLevel();
  });

  function resetLevel() {
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
  }

  // ——— Add … handlers ———
  addGoalButton.addEventListener('click', function(){
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
  });

  addShapeWeightButton.addEventListener('click', function(){
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
  });

  addGroupWeightButton.addEventListener('click', function(){
    var groups = ['Easy','Hard','Helper'].map(function(g){
      return {value:g,label:g};
    });
    var sel = createSelect(groups);
    var inp = createInput('number',{min:0,step:0.1,value:1});
    createEntry(groupWeightsList,[sel,inp]);
  });

  addStartingShapeButton.addEventListener('click', function(){
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
        var x = i%8, y = Math.floor(i/8), fy = 7-y, idx = x+fy*8;
        var d = g.cells[idx];
        return {
          cellType:d.cellType,
          item:d.itemType ? {id:d.id,type:d.itemType,data:d.itemData} : null,
          overlay:null, base:null
        };
      });
      return { width:8, height:8, cells:cells, targets:g.targets };
    });

    return JSON.stringify({
      version:1,
      levelId:'customLevel001',
      name:levelName.value||'My Custom Level',
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
    try {
      var handle = await window.showSaveFilePicker({
        types:[{description:'JSON Files',accept:{'application/json':['.json']}}]
      });
      var w = await handle.createWritable();
      await w.write(data);
      await w.close();
    } catch(e){}
  }

  function sendLevel(url) {
    fetch(url, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: buildLevelJson()
    })
    .then(function(r){
      if (!r.ok) throw r.statusText;
    })
    .catch(function(){ alert('Failed'); });
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
        resetLevel();
        // restore simple fields
        levelName.value     = lvl.name||'';
        levelSeed.value     = lvl.config.seed||0;
        levelMoves.value    = lvl.config.moves||20;
        levelMode.value     = lvl.config.mode;        
        powerupChance.value = lvl.config.powerUpSpawnOnShapeChance||0;
        var grp = lvl.config.shapeGroup||0;
        flagEasy.checked   = !!(grp&1);
        flagHard.checked   = !!(grp&2);
        flagHelper.checked = !!(grp&4);
        // restore grids
        grids = [];
        currentGrid = -1;
        var gridArr = Array.isArray(lvl.grids) && lvl.grids.length > 0
          ? lvl.grids
          : [{ width:lvl.width, height:lvl.height, cells:lvl.cells, targets:lvl.config ? lvl.config.targets : [] }];
        gridArr.forEach(function(g){
          var newGrid = createEmptyGrid();
          (g.cells||[]).forEach(function(c,i){
            var x = i%8, y = Math.floor(i/8), fy = 7-y, idx = x+fy*8;
            var d = newGrid.cells[idx];
            d.cellType = c.cellType || 'normal';
            if (c.item) {
              d.itemType = c.item.type;
              d.id = c.item.id;
              d.itemData = c.item.data || null;
            }
          });
          newGrid.targets = g.targets || [];
          grids.push(newGrid);
        });
        loadGrid(0);
        // restore lists by re-clicking their add buttons then filling values
        function restore(listName, arr, clickBtn, fillFn) {
          if (!Array.isArray(arr)) return;
          arr.forEach(function(item){
            clickBtn.click();
            var last = ({goals:goalsList,groupWeights:groupWeightsList,
                         shapeWeights:shapeWeightsList,
                         startingShapes:startingShapesList})[listName]
                      .lastChild;
            fillFn(last,item);
          });
        }
        restore('groupWeights',  lvl.config.groupWeights, addGroupWeightButton, function(e,it){
          e.querySelector('select').value = it.group;
          e.querySelector('input').value  = it.weight;
        });
        restore('shapeWeights',  lvl.config.shapeWeights, addShapeWeightButton, function(e,it){
          var s = e.querySelector('select'), i = e.querySelector('input'), img = e.querySelector('img');
          s.value = it.type; i.value = it.weight;
          img.src = shapeDefinitions.find(function(s){return s.type===it.type;}).icon;
        });
        restore('startingShapes',lvl.config.startingShapes, addStartingShapeButton, function(e,it){
          var s = e.querySelectorAll('select'), img = e.querySelector('img');
          s[0].value = it.type;
          img.src    = shapeDefinitions.find(function(s){return s.type===it.type;}).icon;
          s[1].value = it.rotation;
          s[1].dispatchEvent(new Event('change'));
        });
      })
      .catch(function(){alert('Failed to load');});
    });
    inp.click();
  }
});
