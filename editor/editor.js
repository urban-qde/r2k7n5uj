// editor.js
// Deterministic three-word name generator (same as levels.js)
function levelNameFromId(id) {
  if (!id) return 'unnamed-level';
  var adjectives = [
    'ancient','arid','arctic','astral','autumnal','azure','barren','bold',
    'brave','breezy','bright','brisk','bronze','calm','candid','careful',
    'celestial','charming','cheerful','clear','clever','cloudless','cloudy','coastal',
    'cold','colossal','cosmic','crimson','crisp','crystal','curious','dapper',
    'dark','dazzling','deep','delicate','distant','divine','dreamy','dusky',
    'eager','earthy','easy','electric','elegant','endless','ethereal','even',
    'evergreen','faint','fair','faithful','fallen','fearless','fertile','fiery',
    'final','fine','firm','first','floral','flowing','foggy','forgiving',
    'forgotten','fragile','free','fresh','friendly','frozen','full','fuzzy',
    'gentle','ghostly','giant','gilded','golden','grand','gray','great',
    'grim','gritty','growing','guarded','hallowed','happy','hardy','harsh',
    'hazy','hearty','heavy','hidden','high','hollow','honest','hopeful',
    'hot','humble','icy','immense','inland','inner','iron','jagged',
    'jaunty','keen','kindly','leafy','level','light','lively','lone',
    'lonely','long','lost','loud','lovely','low','lucid','lucky',
    'lunar','lush','magic','mellow','mighty','minor','misty','modern',
    'modest','moonlit','murky','narrow','native','natural','nearby','neat',
    'noble','noisy','northern','old','open','outer','pale','patient',
    'peaceful','perfect','phantom','plain','playful','polar','polite','potent',
    'precious','primal','prime','proud','pure','quaint','quick','quiet',
    'radiant','ragged','rapid','rare','raw','ready','real','regal',
    'remote','resolute','restless','rich','rigid','rising','robust','rocky',
    'rolling','rough','round','royal','ruddy','rustic','sacred','safe',
    'sandy','scarlet','secret','secure','serene','shadowy','shallow','sharp',
    'sheer','shimmering','shiny','short','shy','silent','silken','silver',
    'simple','single','sleek','sleepy','slender','slight','slow','small',
    'smooth','snowy','soft','solid','solemn','solo','southern','spacious',
    'spectral','speedy','spicy','spiky','spiraled','spry','stable','starry',
    'steep','stiff','still','stone','stormy','stout','strange','strong',
    'sturdy','subtle','sudden','summer','sunny','sure','surly','swift',
    'tall','tender','thorny','tidy','timeless','tiny','tired','tough',
    'tranquil','true','twilight','twin','vast','velvet','verdant','vibrant',
    'vigilant','violet','vivid','warm','watchful','watery','wavering','weary',
    'wet','white','wild','windy','wise','wooden','woolly','youthful',
    'zesty','zealous','starlit','sunlit','dusky','dawnlit','duskborn','embered',
    'wintry','sugary','salty','sandy','sooty','smoky','scented','sacred',
    'ancient','bashful','dapper','fabled','gleaming','golden','hushed','luminous',
    'mystic','noble','prim','quick','quaint','radiant','rusty','sage',
    'tidal','urban','verdant','wary','wavy','yearly','yonder','zonal',
    'boldest','bravest','brightest','darkest','deepest','fairest','finest','grandest',
    'highest','kindest','longest','lowest','oldest','purest','quickest','rarest'
  ];
  var biomes = [
    'forest','desert','tundra','canyon','valley','meadow','temple','cavern',
    'harbor','island','jungle','marsh','mine','mountain','ocean','plains',
    'reef','river','ruins','swamp','tower','village','volcano','wasteland',
    'workshop','castle','city','cliff','crater','crypt','dune','factory',
    'field','fortress','glacier','grotto','lake','market','oasis','palace',
    'pass','peak','ridge','sanctum','shrine','station','stronghold','summit',
    'trench','dock','outpost','camp','keep','grove','bay','bridge',
    'canopy','catacomb','canal','garden','cove','abbey','acropolis','alley',
    'arch','archipelago','arbor','arena','arroyo','atoll','avenue','badlands',
    'bank','barrow','basin','bayou','beach','bend','bluff','bog',
    'borough','brook','caldera','cape','causeway','cenote','chapel','chasm',
    'citadel','clearing','cloister','coast','colony','col','corridor','court',
    'courtyard','covelet','creek','crossing','crossroads','dale','dam','delta',
    'depot','docks','downlands','dungeons','dwellings','escarpment','estuary','fell',
    'fen','fjord','flatlands','foothills','ford','fountain','gate','glade',
    'glen','goldfields','hamlet','heath','heights','hills','hollow','icefield',
    'inlet','isthmus','jetty','junction','karst','lagoon','landing','lavafield',
    'ledge','lowlands','lighthouse','marina','marketplace','moor','moraine','narrows',
    'necropolis','outcrop','overlook','palisade','parish','path','pavilion','pier',
    'pinnacle','plateau','plaza','point','port','prairie','promontory','quarry',
    'quay','rampart','ravine','ridgeway','ringfort','road','rockface','ruinfield',
    'sanctuary','savanna','schoolhouse','scrubland','sea','seaside','settlement','shore',
    'sound','spire','spring','square','steppe','stockade','stream','street',
    'strongroom','subway','templeyard','thicket','thoroughfare','tidelands','tomb','town',
    'trail','uplands','vale','villagegreen','vineyard','wall','waterfall','waterway',
    'waypoint','wetland','wharf','wildwood','windbreak','wood','woodland','yard',
    'zanja','zodiac','zoo','ziggurat','quagmire','saltpan','saltmarsh','grotta',
    'ravineway','riverside','hillside','clifftop','hillfort','lowland','highland','midland',
    'foreset','dunefield','lavaflow','iceberg','blackwood','ironworks','mill','granary',
    'ferns','orchard','graveyard','monastery','observatory','greenway','barracks','armory',
    'ballast','fishingpier','shipyard','drydock','farmland','pasture','hedgerow','workyard',
    'outlands','innercity','oldtown','newtown','uptown','midtown','suburb','downtown',
    'forecourt','backyard','courtside','seafront','headland','backwater','flat','rise'
  ];
  var nouns = [
    'amber','anchor','angel','anthem','apex','archive','arrow','ash',
    'avalanche','basilisk','beacon','beast','bell','berry','blade','blaze',
    'blizzard','bloom','boulder','branch','brand','bridge','brim','brook',
    'cactus','candle','canyon','caravel','cask','cathedral','cavern','cedar',
    'chalice','charm','citadel','clasp','cliff','cloak','cloud','cobble',
    'comet','compass','copper','coral','cornice','cradle','crest','crimson',
    'crown','crystal','current','dagger','dawn','daybreak','delta','demon',
    'diamond','dirge','drake','dream','druid','dust','eagle','echo',
    'ember','emptiness','engine','epoch','falcon','fang','feather','fissure',
    'flame','flower','fog','forest','forge','fossil','fountain','fragment',
    'frost','gale','garden','gate','geyser','glacier','glimmer','gloom',
    'glory','glyph','gold','granite','grass','grove','guard','harbor',
    'harvest','haven','heart','hearth','horizon','husk','ice','idol',
    'intuition','iron','isle','jewel','journey','keeper','kelp','kernel',
    'lagoon','lamp','lantern','legend','leaves','library','light','lily',
    'lotus','machine','magnet','maple','marble','meadow','meteor','mist',
    'monolith','moon','moss','mountain','needle','night','nimbus','oak',
    'oath','obelisk','ocean','onyx','opal','oracle','orchid','ore',
    'owl','paper','pearl','pedestal','petal','phoenix','pike','pillar',
    'pine','pinnacle','piston','planet','plate','plume','portal','prism',
    'prize','promise','pulse','quartz','quest','quill','raven','realm',
    'relic','riddle','ridge','rift','ring','river','roost','root',
    'rose','saddle','saffron','sapphire','satchel','scar','scroll','sea',
    'seed','shade','shadow','shard','shell','shield','ship','shrine',
    'signal','silence','silver','song','spark','spirit','spring','sprite',
    'stag','star','statue','stem','stone','storm','stream','summit',
    'sun','tablet','talon','talisman','temple','thicket','thorn','thread',
    'throne','thunder','tide','timber','token','torch','torrent','totem',
    'tower','trail','treasure','trident','trunk','truth','tunnel','twig',
    'vale','valor','vapor','vault','vector','veil','venom','vessel',
    'vine','violet','vista','void','vortex','voyage','warden','wave',
    'wheat','whisper','willow','wind','wisdom','wolf','wood','yonder',
    'zeal','zenith','zephyr','zodiac','artifact','bastion','bounty','bulwark',
    'calm','cascade','citron','clay','coast','comet','conduit','crescent',
    'cypress','daisy','dewdrop','emberglow','evergreen','fern','flint','flora',
    'glade','glow','honey','ivy','jasper','kestrel','laurel','linen',
    'lumen','luster','megalith','meridian','mirage','murmur','myrtle','nectar',
    'nova','obsidian','octave','onyxstone','opaline','orchard','ossuary','oyster',
    'palisade','panther','paragon','pebble','pendulum','pepper','phantom','phoenixdown',
    'pinnaclepeak','pipestone','plainsong','primrose','quarry','quiver','rapids','reverie',
    'sapphirelight','scepter','sequoia','shadowfall','sheen','shelter','spectrum','spire',
    'stillness','stonework','sunrise','sunset','thistledown','thunderhead','tundra','turret',
    'valorstone','verdure','water','wildwood','windfall','windsong','winter','wisp'
  ];
  function fnv1a32(str) {
    var hash = 0x811c9dc5 >>> 0;
    for (var i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i) & 0xff;
      hash = Math.imul(hash, 0x01000193) >>> 0;
      var hi = str.charCodeAt(i) >>> 8;
      if (hi) {
        hash ^= hi & 0xff;
        hash = Math.imul(hash, 0x01000193) >>> 0;
      }
    }
    return hash >>> 0;
  }
  function word256(i, pre, suf) {
    i = (i & 0xff) >>> 0;
    var hi = (i >> 4) & 0x0f;
    var lo = i & 0x0f;
    var a = pre[hi];
    var b = suf[lo];
    return b ? (a + b) : a;
  }
  var i1 = fnv1a32(id + '|0') % adjectives.length;
  var i2 = fnv1a32(id + '|1') % biomes.length;
  var i3 = fnv1a32(id + '|2') % nouns.length;
  return adjectives[i1] + '-' + biomes[i2] + '-' + nouns[i3];
}

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

  var params = new URLSearchParams(window.location.search);
  var flow = params.get('flow') || '';
  var flowSelect = document.getElementById('flow-select');
  var levelsLink = document.getElementById('levels-link');

  fetch('/flows')
    .then(function(res){ return res.json(); })
    .then(function(flows){
      flows.forEach(function(name){
        var opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        flowSelect.appendChild(opt);
      });
      // Select current flow if present; otherwise prefer 'default' or first flow
      var effective = flow;
      if (!effective) {
        if (flows.indexOf('default') !== -1) {
          effective = 'default';
        } else if (flows.length > 0) {
          effective = flows[0];
        }
      }
      if (effective) {
        flowSelect.value = effective;
        // Keep state consistent for subsequent operations
        flow = effective;
        // Update levels link to carry the selected flow
        if (levelsLink) {
          levelsLink.href = '/levels.html' + (flow ? '?flow=' + encodeURIComponent(flow) : '');
        }
        // Reflect flow in the URL without a reload for consistency
        if (!params.get('flow')) {
          params.set('flow', effective);
          if (history && history.replaceState) {
            history.replaceState(null, '', '?' + params.toString());
          }
        }
        syncLevelContext(levelId, true);
      }
    })
    .catch(function(err){
      console.error('Failed to load flows', err);
      syncLevelContext(levelId, true);
    });

  flowSelect.addEventListener('change', function(){
    params.set('flow', flowSelect.value);
    window.location.search = params.toString();
  });

  if (levelsLink) {
    levelsLink.href = '/levels.html' + (flow ? '?flow=' + encodeURIComponent(flow) : '');
  }

  // ——— Cached elements ———
  var grid                = document.getElementById('grid');
  var paletteButtonsGrid  = document.getElementById('palette-buttons');
  var paletteActions      = document.querySelector('.action-buttons');
  var shortcutsBtn        = document.querySelector('.shortcuts-btn');
  var shortcutsPopup      = document.getElementById('shortcuts-popup');
  var infoBtn             = document.getElementById('info-btn');
  var infoPopup           = document.getElementById('info-popup');
  var propertiesContent   = document.getElementById('properties-content');
  var levelOrdinalEl      = document.getElementById('level-ordinal');
  var prevLevelButton     = document.getElementById('prev-level');
  var nextLevelButton     = document.getElementById('next-level');
  var levelNavLabel       = document.getElementById('level-nav-label');

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
  var multiplierChance= document.getElementById('multiplier-chance');
  var shapePowerupRule= document.getElementById('shape-powerup-rule');
  // Feature overrides
  var useOverridesEl  = document.getElementById('use-feature-overrides');
  var droneOverrideEl = document.getElementById('override-drone-enabled');

  if (useOverridesEl && droneOverrideEl) {
    function updateFeatureOverrideUI() {
      var enabled = !!useOverridesEl.checked;
      droneOverrideEl.disabled = !enabled;
    }
    useOverridesEl.addEventListener('change', function(){
      recordState();
      updateFeatureOverrideUI();
    });
    updateFeatureOverrideUI();
  }

  var shapeGroups = [
    { id: 'easy',    label: 'Easy',     bit: 1 },
    { id: 'medium',  label: 'Medium',   bit: 8 },
    { id: 'hard',    label: 'Hard',     bit: 2 },
    { id: 'veryhard',label: 'VeryHard', bit: 16 }
  ];

  var groupFlags = {};
  shapeGroups.forEach(function(g){ groupFlags[g.id] = document.getElementById('shape-' + g.id); });

  // ——— Layer visibility controls ———
  var layerBaseEl    = document.getElementById('layer-base');
  var layerItemEl    = document.getElementById('layer-item');
  var layerOverlayEl = document.getElementById('layer-overlay');

  function isLayerVisible(slot) {
    if (slot === 'base')    return !layerBaseEl || layerBaseEl.checked;
    if (slot === 'item')    return !layerItemEl || layerItemEl.checked;
    if (slot === 'overlay') return !layerOverlayEl || layerOverlayEl.checked;
    return true;
  }

  // ——— State ———
  var activeDef = null;
  var isMouseDown = false;
  var dragMode = null; // 'paint' | 'select' | null
  var grids = [];
  var currentGrid = 0;
  var gridData = null; // reference to current grid cells
  var gridWidth = 9;
  var gridHeight = 9;
  var selectedIndices = new Set();
  var primaryIndex = -1;
  var selectedSlot = null; // one of 'overlay' | 'item' | 'base'

  var levelId = generateLevelId();
  var levelTags = [];
  var flowLevels = [];
  var flowLevelsPromise = null;
  var cachedFlowForLevels = null;
  var currentLevelIndex = -1;
  var isNavigatingLevel = false;

  // Tag color helpers (deterministic per tag)
  function hash32(str) {
    var h = 2166136261 >>> 0;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i) & 0xff;
      h = Math.imul(h, 16777619) >>> 0;
    }
    return h >>> 0;
  }
  function tagStyle(tag) {
    var h = hash32(String(tag));
    var hue = h % 360;
    var isDark = (document.documentElement.getAttribute('data-theme') === 'dark');
    var bg = isDark ? 'hsl(' + hue + ' 40% 20% / 0.5)' : 'hsl(' + hue + ' 90% 92%)';
    var border = isDark ? 'hsl(' + hue + ' 60% 55% / 0.5)' : 'hsl(' + hue + ' 60% 70%)';
    var text = isDark ? 'hsl(' + hue + ' 70% 85%)' : 'hsl(' + hue + ' 50% 25%)';
    return { bg: bg, border: border, text: text };
  }

  function loadFlowLevels(force) {
    if (!flow) {
      flowLevels = [];
      cachedFlowForLevels = '';
      return Promise.resolve(flowLevels);
    }
    if (force || cachedFlowForLevels !== flow) {
      cachedFlowForLevels = flow;
      flowLevels = [];
      flowLevelsPromise = null;
    }
    if (flowLevelsPromise) {
      return flowLevelsPromise;
    }
    if (flowLevels.length && !force) {
      return Promise.resolve(flowLevels);
    }

    var pageSize = 200;
    var collected = [];

    function fetchPage(page) {
      return fetch('/levels?page=' + page + '&pageSize=' + pageSize + '&flow=' + encodeURIComponent(flow))
        .then(function(res){
          if (!res.ok) throw new Error('Failed to load level list');
          return res.json();
        })
        .then(function(data){
          if (Array.isArray(data.items)) {
            collected = collected.concat(data.items);
          }
          var total = (typeof data.total === 'number') ? data.total : collected.length;
          if ((page + 1) * pageSize < total) {
            return fetchPage(page + 1);
          }
        });
    }

    flowLevelsPromise = fetchPage(0)
      .then(function(){
        collected.sort(function(a, b) {
          if (typeof a.ordinal === 'number' && typeof b.ordinal === 'number') {
            return a.ordinal - b.ordinal;
          }
          return String(a.id || '').localeCompare(String(b.id || ''));
        });
        flowLevels = collected;
        flowLevelsPromise = null;
        return flowLevels;
      })
      .catch(function(err){
        flowLevelsPromise = null;
        throw err;
      });

    return flowLevelsPromise;
  }

  function updateLevelNavUI() {
    if (!prevLevelButton || !nextLevelButton || !levelNavLabel) return;
    if (!flowLevels.length || currentLevelIndex === -1) {
      prevLevelButton.disabled = true;
      nextLevelButton.disabled = true;
      levelNavLabel.textContent = '— / —';
      return;
    }
    var total = flowLevels.length;
    var displayIndex = currentLevelIndex + 1;
    prevLevelButton.disabled = isNavigatingLevel || displayIndex <= 1;
    nextLevelButton.disabled = isNavigatingLevel || displayIndex >= total;
    levelNavLabel.textContent = displayIndex + ' / ' + total;
  }

  function updateLevelOrdinalDisplay() {
    if (!levelOrdinalEl) return;
    if (currentLevelIndex === -1 || !flowLevels[currentLevelIndex]) {
      levelOrdinalEl.textContent = '';
      levelOrdinalEl.classList.add('hidden');
      return;
    }
    var entry = flowLevels[currentLevelIndex];
    var ordinal = (typeof entry.ordinal === 'number') ? entry.ordinal : (currentLevelIndex + 1);
    levelOrdinalEl.innerHTML = 'Level position: <span class="badge">' + ordinal + '</span>';
    levelOrdinalEl.classList.remove('hidden');
  }

  function syncLevelContext(id, force) {
    if (!id || !flow) {
      currentLevelIndex = -1;
      updateLevelNavUI();
      updateLevelOrdinalDisplay();
      return;
    }
    loadFlowLevels(!!force)
      .then(function(list){
        currentLevelIndex = list.findIndex(function(entry){ return entry && entry.id === id; });
        updateLevelNavUI();
        updateLevelOrdinalDisplay();
      })
      .catch(function(err){
        console.error('syncLevelContext failed', err);
        currentLevelIndex = -1;
        updateLevelNavUI();
        updateLevelOrdinalDisplay();
      });
  }

  function navigateRelativeLevel(offset) {
    if (!flow || isNavigatingLevel) return;
    loadFlowLevels()
      .then(function(list){
        if (!list.length) return;
        if (currentLevelIndex === -1) {
          currentLevelIndex = list.findIndex(function(entry){ return entry && entry.id === levelId; });
          if (currentLevelIndex === -1) {
            updateLevelNavUI();
            updateLevelOrdinalDisplay();
            return;
          }
        }
        var targetIndex = currentLevelIndex + offset;
        if (targetIndex < 0 || targetIndex >= list.length) {
          updateLevelNavUI();
          return;
        }
        var target = list[targetIndex];
        if (!target || !target.id) {
          return;
        }
        openLevelById(target.id);
      })
      .catch(function(err){
        console.error('navigateRelativeLevel failed', err);
      });
  }

  function openLevelById(id) {
    if (!id || isNavigatingLevel) return;
    isNavigatingLevel = true;
    updateLevelNavUI();
    fetch('/levels/' + encodeURIComponent(id) + '.json?flow=' + encodeURIComponent(flow))
      .then(function(res){
        if (!res.ok) throw new Error('Failed to load level');
        return res.json();
      })
      .then(function(json){
        loadLevelObject(json);
        undoStack = [];
        redoStack = [];
        params.set('level', levelId);
        if (history && history.replaceState) {
          history.replaceState(null, '', '?' + params.toString());
        }
        syncLevelContext(levelId, false);
      })
      .catch(function(err){
        console.error('openLevelById failed', err);
        alert('Failed to load level');
        syncLevelContext(levelId, false);
      })
      .finally(function(){
        isNavigatingLevel = false;
        updateLevelNavUI();
      });
  }

  if (prevLevelButton) {
    prevLevelButton.addEventListener('click', function(){ navigateRelativeLevel(-1); });
  }
  if (nextLevelButton) {
    nextLevelButton.addEventListener('click', function(){ navigateRelativeLevel(1); });
  }
  updateLevelNavUI();
  updateLevelOrdinalDisplay();

  // Preload level from query parameter
  var paramLevel = params.get('level');
  if (paramLevel) {
    levelId = paramLevel;
    if (levelName) {
      levelName.value = levelNameFromId(levelId);
      levelName.title = levelId;
    }
    fetch('/levels/' + encodeURIComponent(paramLevel) + '.json?flow=' + encodeURIComponent(flow))
      .then(function(r){ if(r.ok) return r.json(); throw new Error('not found'); })
      .then(function(json){
        loadLevelObject(json);
        undoStack = [];
        redoStack = [];
        syncLevelContext(levelId, true);
      })
      .catch(function(err){
        console.error('Failed to load initial level', err);
        syncLevelContext(levelId, true);
      });
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

  [levelSeed, levelMoves, levelMode, powerupChance, multiplierChance, shapePowerupRule]
    .filter(Boolean)
    .concat(shapeGroups.map(function(g){ return groupFlags[g.id]; }))
    .forEach(function(el){
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
  // First occurrence of a type in paletteDefinitions defines its display label
  var itemTypeToLabel = {};
  paletteDefinitions.forEach(function(p) {
    if (typeof p.itemTypeId === 'number') {
      itemTypeIdToType[p.itemTypeId] = p.type;
    }
    var lower = p.type.toLowerCase();
    itemTypeCanonical[lower] = p.type;
    if (itemTypeToLabel[p.type] == null) {
      itemTypeToLabel[p.type] = p.label || (p.type.charAt(0).toUpperCase() + p.type.slice(1));
    }
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
    var match = shapeGroups.find(function(x){ return x.label.toLowerCase() === g; });
    if (match) return match.label;
    if (g === 'helper') return 'Helper';
    return group;
  }

  var groupMap = shapeGroups.reduce(function(acc, g) {
    acc[g.id] = g.bit;
    return acc;
  }, { helper: 4 });

  function parseShapeGroup(group) {
    if (typeof group === 'number') return group;
    if (Array.isArray(group)) {
      return group.reduce(function(acc, g){
        g = g.toString().toLowerCase();
        return acc | (groupMap[g] || 0);
      }, 0);
    }
    if (typeof group === 'string') {
      return group.split(/[\s,|]+/).reduce(function(acc, g){
        g = g.toLowerCase();
        return acc | (groupMap[g] || 0);
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
      if (!isLayerVisible(slot)) return;
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

  function updateSelectionHighlight() {
    // Clear all, then add for selected indices
    for (var i = 0; i < cellElements.length; i++) {
      cellElements[i].classList.remove('selected');
    }
    selectedIndices.forEach(function(idx){
      if (cellElements[idx]) cellElements[idx].classList.add('selected');
    });
  }

  function firstPresentSlot(d) {
    if (!d) return null;
    if (d.overlay) return 'overlay';
    if (d.item) return 'item';
    if (d.base) return 'base';
    return null;
  }

  function presentSlots(d) {
    var arr = [];
    if (d.base) arr.push('base');
    if (d.item) arr.push('item');
    if (d.overlay) arr.push('overlay');
    return arr;
  }

  function parseValueLike(original, inputValue) {
    if (typeof original === 'number' || typeof original === 'boolean') {
      var n = Number(inputValue);
      return isNaN(n) ? 0 : n;
    }
    return String(inputValue);
  }

  function renderProperties() {
    if (!propertiesContent) return;
    propertiesContent.innerHTML = '';
    var selSize = selectedIndices.size;
    if (selSize === 0) {
      var empty = document.createElement('div');
      empty.className = 'properties-empty';
      empty.textContent = 'Select a tile to edit its properties.';
      propertiesContent.appendChild(empty);
      return;
    }

    // Helper to get data of a cell for a slot
    function getObj(idx, slot) {
      var dd = gridData[idx];
      return dd ? dd[slot] : null;
    }

    var selArray = Array.from(selectedIndices);

    // For single selection, keep previous behavior
    if (selSize === 1) {
      var only = selArray[0];
      var d = gridData[only];
      var slots = presentSlots(d);
      if (!selectedSlot || (slots.length && slots.indexOf(selectedSlot) === -1)) {
        selectedSlot = firstPresentSlot(d);
      }

      var x = only % gridWidth;
      var y = Math.floor(only / gridWidth);
      var meta = document.createElement('div');
      meta.className = 'properties-meta';
      meta.textContent = 'Cell: (' + x + ', ' + y + ')';
      propertiesContent.appendChild(meta);

      if (slots.length > 1) {
        var slotSel = document.createElement('div');
        slotSel.className = 'slot-select';
        ['base','item','overlay'].forEach(function(slot){
          if (slots.indexOf(slot) === -1) return;
          var pill = document.createElement('button');
          pill.type = 'button';
          pill.className = 'slot-pill' + (selectedSlot === slot ? ' active' : '');
          pill.textContent = slot.charAt(0).toUpperCase() + slot.slice(1);
          pill.addEventListener('click', function(){
            selectedSlot = slot;
            renderProperties();
          });
          slotSel.appendChild(pill);
        });
        propertiesContent.appendChild(slotSel);
      }

      if (!selectedSlot) {
        var none = document.createElement('div');
        none.className = 'properties-empty';
        none.textContent = 'No object on this cell.';
        propertiesContent.appendChild(none);
        return;
      }

      var obj = d[selectedSlot];
      if (!obj) {
        var none2 = document.createElement('div');
        none2.className = 'properties-empty';
        none2.textContent = 'No object on this cell.';
        propertiesContent.appendChild(none2);
        return;
      }

      // Only populate data when a default exists. If there is no defaultData,
      // do not create an empty object as it pollutes the saved JSON.
      if (!obj.data) {
        var def = paletteDefinitions.find(function(p){ return p && p.id === obj.id; });
        if (def && def.defaultData) {
          obj.data = cloneData(def.defaultData);
        } else {
          // No editable properties for this object
          var none3 = document.createElement('div');
          none3.className = 'properties-empty';
          none3.textContent = 'No editable properties for this object.';
          propertiesContent.appendChild(none3);
          return;
        }
      }

      Object.keys(obj.data).filter(function(k){ return k !== 'type'; }).forEach(function(key){
        var row = document.createElement('div');
        row.className = 'property-row';
        var lab = document.createElement('label');
        lab.textContent = key;
        var val = obj.data[key];
        var isNum = (typeof val === 'number');
        var isBool = (typeof val === 'boolean');
        var inp = document.createElement('input');
        if (isBool) {
          inp.type = 'checkbox';
          inp.checked = !!val;
          inp.addEventListener('change', function(){
            recordState();
            obj.data[key] = !!inp.checked;
          });
        } else {
          inp.type = isNum ? 'number' : 'text';
          if (isNum) inp.step = (val % 1 !== 0) ? '0.01' : '1';
          inp.value = String(val);
          inp.addEventListener('change', function(){
            recordState();
            obj.data[key] = parseValueLike(val, inp.value);
          });
        }
        row.appendChild(lab);
        row.appendChild(inp);
        propertiesContent.appendChild(row);
      });
      return;
    }

    // Multi-select properties
    // 1) Determine common slots present across all selected cells
    var slotsEach = selArray.map(function(i){ return presentSlots(gridData[i]); });
    var commonSlots = slotsEach.reduce(function(acc, arr){
      return acc.filter(function(s){ return arr.indexOf(s) !== -1; });
    }, ['base','item','overlay']);

    if (!commonSlots.length) {
      var msg = document.createElement('div');
      msg.className = 'properties-empty';
      msg.textContent = 'No common object across selection.';
      propertiesContent.appendChild(msg);
      return;
    }

    if (!selectedSlot || commonSlots.indexOf(selectedSlot) === -1) {
      selectedSlot = commonSlots[0];
    }

    // 2) Type check: require same data type across selection
    var objs = selArray.map(function(i){ return getObj(i, selectedSlot); });
    if (objs.some(function(o){ return !o || !o.data; })) {
      var msg2 = document.createElement('div');
      msg2.className = 'properties-empty';
      msg2.textContent = 'Selection missing data on some cells.';
      propertiesContent.appendChild(msg2);
      return;
    }
    var dataTypes = objs.map(function(o){ return (o.data && o.data.type) || ''; });
    var allSameType = dataTypes.every(function(t){ return t === dataTypes[0]; });
    if (!allSameType) {
      var msg3 = document.createElement('div');
      msg3.className = 'properties-empty';
      msg3.textContent = 'Multiple data types selected — no common properties.';
      propertiesContent.appendChild(msg3);
      return;
    }

    // Slot pills limited to common slots
    if (commonSlots.length > 1) {
      var slotSel2 = document.createElement('div');
      slotSel2.className = 'slot-select';
      commonSlots.forEach(function(slot){
        var pill = document.createElement('button');
        pill.type = 'button';
        pill.className = 'slot-pill' + (selectedSlot === slot ? ' active' : '');
        pill.textContent = slot.charAt(0).toUpperCase() + slot.slice(1);
        pill.addEventListener('click', function(){
          selectedSlot = slot;
          renderProperties();
        });
        slotSel2.appendChild(pill);
      });
      propertiesContent.appendChild(slotSel2);
    }

    // 3) Common schema: keys present in all with the same typeof
    var keySets = objs.map(function(o){ return Object.keys(o.data).filter(function(k){ return k !== 'type'; }); });
    var commonKeys = keySets.reduce(function(acc, arr){
      return acc.filter(function(k){ return arr.indexOf(k) !== -1; });
    }, keySets[0] || []);
    commonKeys = commonKeys.filter(function(k){
      var t = typeof objs[0].data[k];
      return objs.every(function(o){ return typeof o.data[k] === t; });
    });

    if (!commonKeys.length) {
      var msg4 = document.createElement('div');
      msg4.className = 'properties-empty';
      msg4.textContent = 'No common editable properties.';
      propertiesContent.appendChild(msg4);
      return;
    }

    // 4) Render inputs with mixed handling
    commonKeys.forEach(function(key){
      var row = document.createElement('div');
      row.className = 'property-row';
      var lab = document.createElement('label');
      lab.textContent = key;
      var firstVal = objs[0].data[key];
      var isNum = (typeof firstVal === 'number');
      var isBool = (typeof firstVal === 'boolean');
      var mixed = !objs.every(function(o){ return o.data[key] === firstVal; });
      var inp = document.createElement('input');
      if (isBool) {
        inp.type = 'checkbox';
        if (mixed) {
          inp.indeterminate = true;
        } else {
          inp.checked = !!firstVal;
        }
        inp.addEventListener('change', function(){
          recordState();
          var v = !!inp.checked;
          selArray.forEach(function(i){ gridData[i][selectedSlot].data[key] = v; });
          // Rerender only affected cells
          selArray.forEach(function(i){ if (cellElements[i]) renderCell(cellElements[i], gridData[i]); });
        });
      } else {
        inp.type = isNum ? 'number' : 'text';
        if (isNum) inp.step = (firstVal % 1 !== 0) ? '0.01' : '1';
        if (!mixed) inp.value = String(firstVal);
        inp.placeholder = mixed ? '—' : '';
        inp.addEventListener('change', function(){
          recordState();
          var newVal = parseValueLike(firstVal, inp.value);
          selArray.forEach(function(i){ gridData[i][selectedSlot].data[key] = newVal; });
          selArray.forEach(function(i){ if (cellElements[i]) renderCell(cellElements[i], gridData[i]); });
        });
      }
      row.appendChild(lab);
      row.appendChild(inp);
      propertiesContent.appendChild(row);
    });
  }

  function clearSelection() {
    selectedIndices.clear();
    primaryIndex = -1;
    selectedSlot = null;
    updateSelectionHighlight();
    renderProperties();
  }

  function selectSingle(idx) {
    selectedIndices = new Set([idx]);
    primaryIndex = idx;
    selectedSlot = firstPresentSlot(gridData[idx]);
    updateSelectionHighlight();
    renderProperties();
  }

  function toggleSelection(idx) {
    if (selectedIndices.has(idx)) {
      selectedIndices.delete(idx);
      if (primaryIndex === idx) primaryIndex = -1;
    } else {
      selectedIndices.add(idx);
      primaryIndex = idx;
    }
    // Maintain selectedSlot only if still valid across selection
    renderProperties();
    updateSelectionHighlight();
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
    // Reset selection on grid change
    clearSelection();
    renderProperties();
    refreshInfoPopupIfVisible();
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
      refreshInfoPopupIfVisible();
    }
  }

  updateGridSize();
  window.addEventListener('resize', updateGridSize);
  // Re-render if layer visibility toggles change
  [layerBaseEl, layerItemEl, layerOverlayEl].forEach(function(el){
    if (!el) return;
    el.addEventListener('change', function(){
      renderGridCells();
    });
  });
  grid.addEventListener('mousedown', function(e){
    e.preventDefault(); // Prevent drag and drop behavior
    isMouseDown = true;
    // If ALT/Right-click or no active tool => select; else paint
    var cell = e.target.closest('.cell');
    if (!cell) return;
    var idx = +cell.dataset.index;
    if (!activeDef || e.altKey || e.button === 2 || e.metaKey || e.ctrlKey) {
      dragMode = 'select';
      if (e.metaKey || e.ctrlKey) {
        toggleSelection(idx);
      } else {
        selectSingle(idx);
      }
      return;
    }
    dragMode = 'paint';
    recordState();
    handleCellEvent(e);
  });
  grid.addEventListener('mouseover', function(e){
    if (!isMouseDown) return;
    if (dragMode === 'select') {
      // we don't support marquee; ignore move selection
      return;
    } else if (dragMode === 'paint') {
      handleCellEvent(e);
    }
  });
  grid.addEventListener('mouseleave', function(){
    isMouseDown = false; // Reset when leaving grid
    dragMode = null;
  });
  grid.addEventListener('dragstart', function(e){
    e.preventDefault(); // Prevent any drag operations
  });
  window.addEventListener('mouseup', function(){ 
    isMouseDown = false; 
    dragMode = null;
  });
  // prevent context menu on right-click for selection
  grid.addEventListener('contextmenu', function(e){ e.preventDefault(); });

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
    if (!cell) return;
    var idx = +cell.dataset.index;
    if (e.shiftKey) return clearCell(cell, idx);
    if (!activeDef || e.metaKey || e.ctrlKey) {
      if (e.metaKey || e.ctrlKey) toggleSelection(idx);
      else selectSingle(idx);
    } else {
      paintCell(cell, idx);
      // If we painted any selected cell, refresh properties
      if (selectedIndices.has(idx)) renderProperties();
    }
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
    if (selectedIndices.has(idx)) renderProperties();
    refreshInfoPopupIfVisible();
  }

  function clearCell(cell, idx) {
    var d = gridData[idx];
    // Remove overlay first if present
    if (d.overlay) {
      d.overlay = null;
      renderCell(cell, d);
      if (selectedIndices.has(idx)) renderProperties();
      return;
    }
    // Then remove item if present
    if (d.item) {
      d.item = null;
      renderCell(cell, d);
      if (selectedIndices.has(idx)) renderProperties();
      return;
    }
    // Otherwise clear the entire cell back to normal
    gridData[idx] = {cellType:'normal', item:null, base:null, overlay:null};
    renderCell(cell, gridData[idx]);
    if (selectedIndices.has(idx)) renderProperties();
    refreshInfoPopupIfVisible();
  }

  // ——— Palette buttons ———
  paletteDefinitions.forEach(function(def){
    if (def.hidden) return;

    var btn = document.createElement('button');
    btn.className = 'palette-button';
    btn.dataset.id = def.id;
    btn.dataset.label = def.label.toLowerCase();
    btn.innerHTML = '<img src="' + def.icon + '" alt="' + def.label + '">';
    paletteButtonsGrid.appendChild(btn);
  });
  function clearActiveTool() {
    activeDef = null;
    document.querySelectorAll('.palette-button')
      .forEach(function(b){ b.classList.remove('selected'); });
    updateModeClass();
  }
  
  paletteButtonsGrid.addEventListener('click', function(e){
    var btn = e.target.closest('button');
    if (!btn) return;
    var id = btn.dataset.id;
    var def = paletteDefinitions.find(function(d){ return d.id === id; });
    if (!def) return;
    // Toggle off if clicking the already selected tool
    var wasSelected = btn.classList.contains('selected');
    document.querySelectorAll('.palette-button').forEach(function(b){ b.classList.remove('selected'); });
    if (wasSelected) {
      // Deselect -> enter Select mode
      activeDef = null;
      updateModeClass();
      return;
    }
    activeDef = def;
    btn.classList.add('selected');
    updateModeClass();
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

  // ——— Global shortcuts ———
  document.addEventListener('keydown', function(e){
    // ESC: deselect current tool and clear selection
    if (e.key === 'Escape') {
      clearActiveTool();
      clearSelection();
    }
  });

  function updateModeClass() {
    if (activeDef) {
      document.body.classList.add('painting-mode');
    } else {
      document.body.classList.remove('painting-mode');
    }
  }
  // initialize mode class on load
  updateModeClass();

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

  // ——— Grid Info (per-grid item stats) ———
  function stringifyVariantData(data) {
    if (!data) return '';
    var keys = Object.keys(data).filter(function(k){ return k !== 'type'; }).sort();
    if (!keys.length) return '';
    return keys.map(function(k){ return k + '=' + JSON.stringify(data[k]); }).join(', ');
  }

  function getHealthUnitValue(data) {
    if (!data || typeof data !== 'object') return null;
    // Prefer explicit health field
    if (typeof data.health === 'number') return data.health;
    // Or when the data type is health but field name differs (fallback)
    if (data.type === 'health') {
      // Scan for any numeric field other than 'type'
      var keys = Object.keys(data).filter(function(k){ return k !== 'type'; });
      for (var i = 0; i < keys.length; i++) {
        var v = data[keys[i]];
        if (typeof v === 'number') return v;
      }
    }
    return null;
  }

  function computeGridItemStats() {
    var byVariant = Object.create(null);
    var byTypeTotals = Object.create(null);
    var totalPlaced = 0;
    for (var i = 0; i < gridData.length; i++) {
      var cell = gridData[i];
      if (!cell || !cell.item) continue; // Only count items slot
      var type = normalizeItemType(cell.item.type || 'unknown');
      var data = cell.item.data || null;
      var variant = stringifyVariantData(data);
      var key = type + '|' + variant;
      if (!byVariant[key]) {
        byVariant[key] = {
          type: type,
          // Prefer human-friendly label when available
          label: itemTypeToLabel[type] || (type.charAt(0).toUpperCase() + type.slice(1)),
          variant: variant,
          count: 0,
          healthUnit: getHealthUnitValue(data) // null when not applicable
        };
      }
      byVariant[key].count++;
      totalPlaced++;
    }

    var list = Object.keys(byVariant).map(function(k){ return byVariant[k]; });
    list.sort(function(a,b){
      return (b.count - a.count) || (a.label > b.label ? 1 : -1);
    });

    // Build per-type totals; prefer health-weighted totals when health is present
    list.forEach(function(entry){
      var t = entry.type;
      if (!(t in byTypeTotals)) byTypeTotals[t] = { count: 0, weighted: 0, hasHealth: false };
      byTypeTotals[t].count += entry.count;
      if (typeof entry.healthUnit === 'number') {
        byTypeTotals[t].weighted += entry.count * entry.healthUnit;
        byTypeTotals[t].hasHealth = true;
      }
    });

    return { total: totalPlaced, list: list, totals: byTypeTotals };
  }

  function renderInfoPopup() {
    if (!infoPopup) return;
    infoPopup.innerHTML = '';
    var h = document.createElement('h5');
    h.textContent = 'Grid Stats';
    infoPopup.appendChild(h);
    var stats = computeGridItemStats();
    var meta = document.createElement('div');
    meta.className = 'shortcut';
    meta.textContent = 'Items placed: ' + stats.total;
    infoPopup.appendChild(meta);
    if (!stats.list.length) {
      var none = document.createElement('div');
      none.className = 'shortcut';
      none.textContent = 'No items on this grid.';
      infoPopup.appendChild(none);
      return;
    }
    stats.list.forEach(function(entry){
      var line = document.createElement('div');
      line.className = 'shortcut';
      var label = entry.label || (entry.type.charAt(0).toUpperCase() + entry.type.slice(1));
      if (entry.variant) label += ' (' + entry.variant + ')';
      var suffix = '';
      if (typeof entry.healthUnit === 'number') {
        suffix = ' (' + (entry.count * entry.healthUnit) + ')';
      }
      line.textContent = label + ': ' + entry.count + suffix;
      infoPopup.appendChild(line);
    });

    // Totals summary
    var sep = document.createElement('div');
    sep.style.margin = '6px 0';
    sep.style.borderTop = '1px solid var(--border)';
    sep.style.height = '1px';
    infoPopup.appendChild(sep);

    var th = document.createElement('h5');
    th.textContent = 'Totals';
    infoPopup.appendChild(th);

    // Sort types alphabetically by label
    Object.keys(stats.totals).sort(function(a,b){
      var la = itemTypeToLabel[a] || (a.charAt(0).toUpperCase() + a.slice(1));
      var lb = itemTypeToLabel[b] || (b.charAt(0).toUpperCase() + b.slice(1));
      return la > lb ? 1 : (la < lb ? -1 : 0);
    }).forEach(function(t){
      var agg = stats.totals[t];
      var line = document.createElement('div');
      line.className = 'shortcut';
      var totalVal = agg.hasHealth ? agg.weighted : agg.count;
      var tLabel = itemTypeToLabel[t] || (t.charAt(0).toUpperCase() + t.slice(1));
      line.textContent = tLabel + ': ' + totalVal;
      infoPopup.appendChild(line);
    });
  }

  function refreshInfoPopupIfVisible() {
    if (infoPopup && !infoPopup.classList.contains('hidden')) {
      renderInfoPopup();
    }
  }

  if (infoBtn && infoPopup) {
    infoBtn.addEventListener('click', function(e){
      e.stopPropagation();
      if (infoPopup.classList.contains('hidden')) {
        renderInfoPopup();
        infoPopup.classList.remove('hidden');
      } else {
        infoPopup.classList.add('hidden');
      }
    });
    document.addEventListener('click', function(e){
      if (!infoPopup.classList.contains('hidden') &&
          !infoPopup.contains(e.target) &&
          e.target !== infoBtn) {
        infoPopup.classList.add('hidden');
      }
    });
  }

  function resetLevel() {
    levelId = generateLevelId();
    levelTags = [];
    document.querySelectorAll('.cell').forEach(function(cell){
      cell.style.backgroundColor = 'white';
      cell.style.backgroundImage = '';
    });
    grids = [createEmptyGrid()];
    currentGrid = 0;
    gridData = grids[0].cells;
    renderGridCells();
    setGridIndicatorText();
    levelName.value     = levelNameFromId(levelId);
    levelName.title     = levelId;
    levelSeed.value     = 0;
    levelMoves.value    = 25;
    levelMode.selectedIndex = 0;
    powerupChance.value = 0.25;
    if (multiplierChance) multiplierChance.value = 0;
    if (shapePowerupRule) shapePowerupRule.value = 'default';
    [goalsList, shapeWeightsList, groupWeightsList, startingShapesList]
      .forEach(function(l){ l.innerHTML = ''; });
    Object.values(groupFlags).forEach(function(cb){ cb.checked = false; });
    // Default: Easy, Medium, Hard
    if (groupFlags.easy)   groupFlags.easy.checked = true;
    if (groupFlags.medium) groupFlags.medium.checked = true;
    if (groupFlags.hard)   groupFlags.hard.checked = true;
    updateSectionCounts();
    // Clear selection
    clearSelection();
    // Clear tags view
    renderViewTags();
    syncLevelContext(levelId, false);
  }

  // ——— Add … handlers ———
  addGoalButton.addEventListener('click', function(){
    recordState();
    // unique item types
    var types = Array.from(new Set(
      paletteDefinitions
        .filter(function(d){ return d.isGoal; })
        .map(function(d){ return d.type; })
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
    // Use runtime names for visual labels
    var groups = shapeGroups.map(function(g){
      var label = g.label === 'VeryHard' ? 'Very Hard' : g.label;
      return { value: g.label, label: label };
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
    var mult = multiplierChance ? (parseFloat(multiplierChance.value) || 0) : 0;
    var flags = shapeGroups.reduce(function(acc, g) {
      return acc | (groupFlags[g.id].checked ? g.bit : 0);
    }, 0);

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
      function sanitizeObj(o) {
        if (!o) return null;
        // If data is missing or empty, ensure it is null in the JSON
        if (!o.data || (typeof o.data === 'object' && Object.keys(o.data).length === 0)) {
          o.data = null;
        }
        return o;
      }
      var cells = g.cells.map(function(_, i){
        var x = i%gridWidth, y = Math.floor(i/gridWidth), fy = (gridHeight-1)-y, idx = x+fy*gridWidth;
        var d = g.cells[idx];
        return {
          cellType:d.cellType,
          item: d.item ? sanitizeObj(cloneData(d.item)) : null,
          base: d.base ? sanitizeObj(cloneData(d.base)) : null,
          overlay: d.overlay ? sanitizeObj(cloneData(d.overlay)) : null
        };
      });
      return { width:gridWidth, height:gridHeight, cells:cells, targets:g.targets };
    });

    return JSON.stringify({
      version:1,
      levelId:levelId,
      name:levelNameFromId(levelId),
      tags: levelTags,
      currentGrid: currentGrid,
      grids:gridsJson,
      config:{
        seed:seed,
        moves:moves,
        powerUpSpawnOnShapeChance:power,
        multiplierSpawnOnShapeChance:mult,
        shapePowerUpRule: shapePowerupRule ? shapePowerupRule.value : 'default',
        mode:mode,
        targets:[],
        shapeGroup:flags,
        groupWeights:groupWeights,
        shapeWeights:shapeWeights,
        startingShapes:startShapes,
        useFeatureOverrides: !!(useOverridesEl && useOverridesEl.checked),
        featureOverrides: (useOverridesEl && useOverridesEl.checked) ? { droneEnabled: !!(droneOverrideEl && droneOverrideEl.checked) } : undefined
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
    fetch(url + '?flow=' + encodeURIComponent(flow), {
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
  levelTags = Array.isArray(lvl.tags) ? lvl.tags.slice(0) : [];
  updateGridSize();
  levelName.value     = levelNameFromId(levelId);
  levelName.title     = levelId;
  levelSeed.value     = lvl.config.seed||0;
  levelMoves.value    = lvl.config.moves||20;
  levelMode.value     = lvl.config.mode;
  powerupChance.value = lvl.config.powerUpSpawnOnShapeChance||0;
  if (multiplierChance) multiplierChance.value = (lvl.config.multiplierSpawnOnShapeChance !== undefined ? lvl.config.multiplierSpawnOnShapeChance : 0);
  if (shapePowerupRule) shapePowerupRule.value = (lvl.config.shapePowerUpRule || 'default');
  if (useOverridesEl) useOverridesEl.checked = !!(lvl.config && lvl.config.useFeatureOverrides);
  if (droneOverrideEl) droneOverrideEl.checked = !!(lvl.config && lvl.config.featureOverrides && lvl.config.featureOverrides.droneEnabled);
  if (useOverridesEl && droneOverrideEl) {
    droneOverrideEl.disabled = !useOverridesEl.checked;
  }
  var grp = parseShapeGroup(lvl.config.shapeGroup);
  shapeGroups.forEach(function(g){
    groupFlags[g.id].checked = !!(grp & g.bit);
  });
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
    var name = normalizeGroupName(it.group);
    if (!shapeGroups.some(function(g){ return g.label === name; })) {
      e.remove();
      return;
    }
    e.querySelector('select').value = name;
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
  renderViewTags();
}

// Render tags (view-only)
var viewTagsList = document.getElementById('view-tags-list');
function renderViewTags() {
  if (!viewTagsList) return;
  viewTagsList.innerHTML = '';
  if (!levelTags || levelTags.length === 0) {
    var empty = document.createElement('div');
    empty.className = 'text-muted';
    empty.textContent = 'No tags';
    viewTagsList.appendChild(empty);
    return;
  }
  levelTags.forEach(function(t){
    var chip = document.createElement('span');
    chip.className = 'tag-chip';
    chip.textContent = t;
    var st = tagStyle(t);
    chip.style.background = st.bg;
    chip.style.borderColor = st.border;
    chip.style.color = st.text;
    viewTagsList.appendChild(chip);
  });
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
      undoStack = [];
      redoStack = [];
      if (lvl && lvl.levelId) {
        levelId = lvl.levelId;
        params.set('level', levelId);
        if (history && history.replaceState) {
          history.replaceState(null, '', '?' + params.toString());
        }
      }
      syncLevelContext(levelId, true);
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
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      navigateRelativeLevel(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      navigateRelativeLevel(1);
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
