// Deterministic three-word name generator (mirrors C# DeterministicNameGenerator)
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
      if (hi) { // handle potential non-ASCII, keep deterministic
        hash ^= hi & 0xff;
        hash = Math.imul(hash, 0x01000193) >>> 0;
      }
    }
    return hash >>> 0;
  }
  var i1 = fnv1a32(id + '|0') % adjectives.length;
  var i2 = fnv1a32(id + '|1') % biomes.length;
  var i3 = fnv1a32(id + '|2') % nouns.length;
  return adjectives[i1] + '-' + biomes[i2] + '-' + nouns[i3];
}

// Simple toast helper
function showToast(message, type) {
  var container = document.getElementById('toast-container');
  if (!container) return alert(message); // fallback
  var el = document.createElement('div');
  el.className = 'toast ' + (type || '');
  el.textContent = message;
  container.appendChild(el);
  setTimeout(function(){
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    setTimeout(function(){ if (el.parentNode) el.parentNode.removeChild(el); }, 250);
  }, 2400);
}

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

  var params = new URLSearchParams(window.location.search);
  var flow = params.get('flow') || '';
  var flowSelect = document.getElementById('flow-select');
  var targetFlowSelect = document.getElementById('flow-target-select');
  var filterInput = document.getElementById('level-filter');
  var filterClearBtn = document.getElementById('level-filter-clear');
  var filterQuery = '';
  var filteredIndices = null; // array of indices into `levels` when filtered
  var copyToBtn = document.getElementById('prop-copy-to');
  var moveToBtn = document.getElementById('prop-move-to');

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
        if (effective !== flow) {
          flow = effective;
          // Reflect flow in the URL without reload
          if (!params.get('flow')) {
            params.set('flow', effective);
            if (history && history.replaceState) {
              history.replaceState(null, '', '?' + params.toString());
            }
          }
          // Reload first page to ensure data matches selected flow
          currentPage = 0;
          loadPage(currentPage);
        }
      }

      // Populate target flow select if present
      if (targetFlowSelect) {
        targetFlowSelect.innerHTML = '';
        flows.forEach(function(name){
          var opt = document.createElement('option');
          opt.value = name;
          opt.textContent = name;
          targetFlowSelect.appendChild(opt);
        });
        // Prefer a different target than current flow if possible
        var defaultTarget = flows.find(function(n){ return n !== flow; }) || flows[0] || '';
        if (defaultTarget) {
          targetFlowSelect.value = defaultTarget;
        }
      }
    });

  flowSelect.addEventListener('change', function(){
    params.set('flow', flowSelect.value);
    window.location.search = params.toString();
  });

  var levels = [];
  var totalLevels = 0;
  var pageSize = 100;
  var currentPage = 0;
  var grid = document.getElementById('levels-grid');
  var prevBtn = document.getElementById('prev-page');
  var nextBtn = document.getElementById('next-page');
  var pageInfo = document.getElementById('page-info');
  var dragSrcIndex = null;
  var dropIndex = null;
  var selectedIndex = null;
  var selectedSet = new Set();
  var anchorIndex = null; // for shift-range selection
  var isCreatingLevel = false;
  var multiInfo = document.getElementById('multi-select-info');
  var propId = document.getElementById('prop-id');
  var propOrdinal = document.getElementById('prop-ordinal');
  var propUpdate = document.getElementById('prop-update');
  var propDuplicate = document.getElementById('prop-duplicate');
  var propPlay = document.getElementById('prop-play');
  var propDelete = document.getElementById('prop-delete');
  // Tags UI
  var tagsGroup = document.getElementById('tags-group');
  var tagsList = document.getElementById('tags-list');
  var tagInput = document.getElementById('tag-input');
  var tagAddBtn = document.getElementById('tag-add');
  var tagsSuggestions = document.getElementById('tags-suggestions');

  // Cache for full level JSON by id
  var levelCache = Object.create(null);
  var levelCachePending = Object.create(null);
  // Collected tag suggestions
  var allTagSuggestions = new Set();

  // Tag color helpers
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

  function generateLevelId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return window.crypto.randomUUID();
    }
    var bytes = new Uint8Array(16);
    if (window.crypto && typeof window.crypto.getRandomValues === 'function') {
      window.crypto.getRandomValues(bytes);
    } else {
      for (var i = 0; i < bytes.length; i++) {
        bytes[i] = Math.floor(Math.random() * 256);
      }
    }
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    var hex = Array.prototype.map.call(bytes, function(b) {
      return ('00' + b.toString(16)).slice(-2);
    }).join('');
    return (
      hex.slice(0, 8) + '-' +
      hex.slice(8, 12) + '-' +
      hex.slice(12, 16) + '-' +
      hex.slice(16, 20) + '-' +
      hex.slice(20)
    );
  }

  function createBlankLevelPayload(id) {
    var width = 9;
    var height = 9;
    var cells = [];
    for (var i = 0; i < width * height; i++) {
      cells.push({ cellType: 'normal', item: null, overlay: null, base: null });
    }
    return {
      version: 1,
      levelId: id,
      id: id,
      fileName: id + '.json',
      name: levelNameFromId(id),
      tags: [],
      currentGrid: 0,
      grids: [{
        width: width,
        height: height,
        cells: cells,
        targets: []
      }],
      config: {
        seed: 0,
        moves: 25,
        powerUpSpawnOnShapeChance: 0.25,
        multiplierSpawnOnShapeChance: 0,
        mode: 'clearAll',
        targets: [],
        shapeGroup: 'easy, medium, hard',
        groupWeights: [],
        shapeWeights: [],
        startingShapes: [],
        useFeatureOverrides: false
      }
    };
  }

  function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer || 0);
    var chunk = 0x8000;
    for (var i = 0; i < bytes.length; i += chunk) {
      var slice = bytes.subarray(i, i + chunk);
      binary += String.fromCharCode.apply(null, slice);
    }
    return window.btoa(binary);
  }

  function fetchLevelScreenshotData(id) {
    if (!id) return Promise.resolve(null);
    var url = '/levels/' + encodeURIComponent(id) + '.png?flow=' + encodeURIComponent(flow) + '&cb=' + Date.now();
    return fetch(url, { cache: 'no-store' })
      .then(function(res) {
        if (!res.ok) {
          return null;
        }
        return res.arrayBuffer().then(function(buffer) {
          if (!buffer || buffer.byteLength === 0) {
            return null;
          }
          try {
            return 'data:image/png;base64,' + arrayBufferToBase64(buffer);
          } catch (err) {
            console.warn('Failed to encode screenshot', err);
            return null;
          }
        });
      })
      .catch(function(err) {
        console.warn('fetchLevelScreenshotData failed', err);
        return null;
      });
  }

  grid.addEventListener('dragover', onGridDragOver);
  grid.addEventListener('drop', onDrop);
  grid.addEventListener('dragleave', clearDragClasses);
  propUpdate.addEventListener('click', applyOrdinal);
  if (propDuplicate) propDuplicate.addEventListener('click', duplicateLevel);
  propPlay.addEventListener('click', playLevel);
  propDelete.addEventListener('click', deleteLevel);
  if (copyToBtn) copyToBtn.addEventListener('click', copyToFlow);
  if (moveToBtn) moveToBtn.addEventListener('click', moveToFlow);
  if (tagAddBtn) tagAddBtn.addEventListener('click', onAddTag);
  if (tagInput) {
    tagInput.addEventListener('keydown', function(e){
      if (e.key === 'Enter') {
        e.preventDefault();
        onAddTag();
      }
    });
  }
  loadPage(0);

  // Debounce helper
  function debounce(fn, ms) {
    var t = null;
    return function() {
      var args = arguments;
      clearTimeout(t);
      t = setTimeout(function(){ fn.apply(null, args); }, ms);
    };
  }

  function applyFilter(q) {
    filterQuery = (q || '').trim().toLowerCase();
    if (!filterQuery) {
      filteredIndices = null;
      currentPage = 0;
      // If we don't have any data yet, load normally, else just render
      if (totalLevels === 0) {
        loadPage(0);
      } else {
        renderPage();
      }
      return Promise.resolve();
    }
    // Ensure we have all levels before filtering
    return ensureAllLevelsLoaded().then(function(){
      filteredIndices = [];
      for (var i = 0; i < levels.length; i++) {
        var it = levels[i];
        if (!it) continue;
        var idStr = String(it.id || '').toLowerCase();
        var nameStr = String(levelNameFromId(it.id)).toLowerCase();
        if (idStr.indexOf(filterQuery) !== -1 || nameStr.indexOf(filterQuery) !== -1) {
          filteredIndices.push(i);
        }
      }
      currentPage = 0;
      renderPage();
    }).catch(function(err){
      console.error('applyFilter failed', err);
    });
  }

  function updateFilterClearVisibility() {
    if (!filterInput || !filterClearBtn) return;
    filterClearBtn.style.visibility = filterInput.value ? 'visible' : 'hidden';
  }

  if (filterInput) {
    filterInput.addEventListener('input', debounce(function(e){
      updateFilterClearVisibility();
      applyFilter(e.target.value);
    }, 150));
    // initialize visibility on load
    updateFilterClearVisibility();
  }

  if (filterClearBtn) {
    filterClearBtn.addEventListener('click', function(){
      if (!filterInput) return;
      if (!filterInput.value) return;
      filterInput.value = '';
      updateFilterClearVisibility();
      applyFilter('');
      filterInput.focus();
    });
  }

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
    // When filtered, we already ensured everything is loaded; just render
    if (filteredIndices && Array.isArray(filteredIndices)) {
      renderPage();
      return;
    }
    var start = page * pageSize;
    var end = Math.min(start + pageSize, totalLevels);
    var needsFetch = totalLevels === 0 || levels.slice(start, end).includes(undefined);
    if (needsFetch) {
      fetch('/levels?page=' + page + '&pageSize=' + pageSize + '&flow=' + encodeURIComponent(flow))
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
    var displayTotal = filteredIndices ? filteredIndices.length : totalLevels;
    var start = currentPage * pageSize;
    var end = Math.min(start + pageSize, displayTotal);
    for (var idx = start; idx < end; idx++) {
      var i = filteredIndices ? filteredIndices[idx] : idx;
      if (!filteredIndices) { i = idx; i += currentPage * pageSize; }
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

      var badges = document.createElement('div');
      badges.className = 'level-badges';
      thumb.appendChild(badges);

      var multiBadge = createBadge('Multi-grid', 'multi');
      badges.appendChild(multiBadge);
      renderMultiGridBadge(multiBadge, id);

      var scoreBadge = createBadge('Score', 'score');
      badges.appendChild(scoreBadge);
      renderGoalBadge(scoreBadge, id, 'score');

      var coinBadge = createBadge('Coin', 'coin');
      badges.appendChild(coinBadge);
      renderGoalBadge(coinBadge, id, 'coin');

      var gemBadge = createBadge('Gem', 'gem');
      badges.appendChild(gemBadge);
      renderGoalBadge(gemBadge, id, 'gem');

      var img = document.createElement('img');
      img.src = '/levels/' + encodeURIComponent(id) + '.png?flow=' + encodeURIComponent(flow);
      img.alt = id;
      img.onerror = function() { this.remove(); };
      thumb.appendChild(img);

      card.appendChild(thumb);

      var link = document.createElement('a');
      const displayName = levelNameFromId(id);
      link.textContent = displayName;
      link.title = id;
      link.href = 'index.html?level=' + encodeURIComponent(id) + (flow ? '&flow=' + encodeURIComponent(flow) : '');

      var nameRow = document.createElement('div');
      nameRow.className = 'name-row';

      var copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.className = 'copy-name-btn';
      copyBtn.title = 'Copy name';
      copyBtn.textContent = '📋';
      copyBtn.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        var text = displayName;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text)
            .then(function(){ if (typeof showToast === 'function') showToast('Name copied', 'success'); })
            .catch(function(){ if (typeof showToast === 'function') showToast('Copy failed', 'error'); });
        } else {
          try {
            var ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            if (typeof showToast === 'function') showToast('Name copied', 'success');
          } catch (_) {
            if (typeof showToast === 'function') showToast('Copy failed', 'error');
          }
        }
      });

      nameRow.appendChild(link);
      nameRow.appendChild(copyBtn);
      card.appendChild(nameRow);

      // Tags container (compact)
      var cardTags = document.createElement('div');
      cardTags.className = 'tags-list tags-compact card-tags';
      card.appendChild(cardTags);
      // Populate tags lazily
      renderCardTags(cardTags, id);

      card.addEventListener('dragstart', onDragStart);
      card.addEventListener('dragover', onDragOver);
      card.addEventListener('dragleave', clearDragClasses);
      card.addEventListener('dragend', clearDragClasses);
      card.addEventListener('click', function(e) {
        var idx = Number(this.dataset.index);
        if (e.metaKey || e.ctrlKey) {
          // If we had a single selection, migrate it into the set before toggling
          if (selectedIndex !== null) {
            selectedSet.add(selectedIndex);
            selectedIndex = null;
          }
          // Toggle selection
          if (selectedSet.has(idx)) {
            selectedSet.delete(idx);
          } else {
            selectedSet.add(idx);
            anchorIndex = idx;
          }
          updateSelectionUI();
        } else if (e.shiftKey) {
          if (anchorIndex === null) {
            // Anchor from current single selection if present
            anchorIndex = (selectedIndex !== null) ? selectedIndex : idx;
          }
          var start = Math.min(anchorIndex, idx);
          var endI = Math.max(anchorIndex, idx);
          selectedSet.clear();
          for (var k = start; k <= endI; k++) selectedSet.add(k);
          selectedIndex = null;
          updateSelectionUI();
        } else {
          // Single select
          selectedSet.clear();
          selectedIndex = (selectedIndex === idx) ? null : idx;
          if (selectedIndex !== null) {
            anchorIndex = selectedIndex;
          }
          updateSelectionUI();
        }
      });

      grid.appendChild(card);
    }
    renderCreateLevelCard();
    pageInfo.textContent = (displayTotal === 0) ? '0 / 0' : ((start + 1) + '-' + end + ' / ' + displayTotal);
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = (currentPage + 1) * pageSize >= displayTotal;
    // Highlight selection(s)
    if (selectedIndex !== null) {
      var selectedCard = grid.querySelector('.level-card[data-index="' + selectedIndex + '"]');
      if (selectedCard) selectedCard.classList.add('selected');
    }
    selectedSet.forEach(function(i){
      if (i >= start && i < end) {
        var c = grid.querySelector('.level-card[data-index="' + i + '"]');
        if (c) c.classList.add('selected');
      }
    });
  }

  function renderCreateLevelCard() {
    var card = document.createElement('div');
    card.className = 'level-card level-card--new';
    card.draggable = false;

    var icon = document.createElement('div');
    icon.className = 'new-level-icon';
    icon.textContent = '+';
    card.appendChild(icon);

    var hint = document.createElement('div');
    hint.className = 'new-level-hint';
    hint.textContent = 'Create a new level in this flow';
    card.appendChild(hint);

    var action = document.createElement('button');
    action.type = 'button';
    action.className = 'new-level-button';
    action.textContent = 'New Level';
    action.addEventListener('click', function(){ createNewLevel(action); });
    card.appendChild(action);

    grid.appendChild(card);
  }

  function renderCardTags(container, id) {
    if (!container) return;
    container.innerHTML = '';
    var data = levelCache[id];
    if (data && Array.isArray(data.tags) && data.tags.length) {
      data.tags.forEach(function(t){
        var chip = document.createElement('span');
        chip.className = 'tag-chip';
        chip.textContent = t;
        var st = tagStyle(t);
        chip.style.background = st.bg;
        chip.style.borderColor = st.border;
        chip.style.color = st.text;
        container.appendChild(chip);
      });
      return;
    }
    // If not cached, load then render
    loadLevelDetails(id).then(function(){
      var d = levelCache[id];
      container.innerHTML = '';
      if (d && Array.isArray(d.tags) && d.tags.length) {
        d.tags.forEach(function(t){
          var chip = document.createElement('span');
          chip.className = 'tag-chip';
          chip.textContent = t;
          var st = tagStyle(t);
          chip.style.background = st.bg;
          chip.style.borderColor = st.border;
          chip.style.color = st.text;
          container.appendChild(chip);
        });
      }
    });
  }

  function createNewLevel(buttonEl) {
    if (isCreatingLevel) return;
    isCreatingLevel = true;
    var originalLabel = buttonEl ? buttonEl.textContent : '';
    if (buttonEl) {
      buttonEl.disabled = true;
      buttonEl.textContent = 'Creating...';
    }

    var newId = generateLevelId();
    var payload = createBlankLevelPayload(newId);

    ensureAllLevelsLoaded()
      .then(function() {
        return saveLevel(payload);
      })
      .then(function() {
        levelCache[newId] = payload;

        if (filterInput && filterInput.value) {
          filterInput.value = '';
          updateFilterClearVisibility();
        }
        filterQuery = '';
        filteredIndices = null;

        levels.push({ id: newId });
        totalLevels = levels.length;
        updateOrdinals();

        selectedSet.clear();
        selectedIndex = levels.length - 1;
        anchorIndex = selectedIndex;
        currentPage = Math.floor(selectedIndex / pageSize);

        renderPage();
        updateSelectionUI();

        var orderIds = levels
          .filter(function(entry) { return entry && entry.id; })
          .map(function(entry) { return entry.id; });
        var orderJson = JSON.stringify(orderIds);
        var orderUrl = '/save-order?flow=' + encodeURIComponent(flow);
        var beaconSent = false;
        if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
          try {
            var blob = new Blob([orderJson], { type: 'application/json' });
            beaconSent = navigator.sendBeacon(orderUrl, blob);
          } catch (err) {
            beaconSent = false;
          }
        }
        if (!beaconSent) {
          fetch(orderUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: orderJson
          }).catch(function(err) {
            console.error('Failed to persist order after create', err);
          });
        }

        var targetUrl = 'index.html?level=' + encodeURIComponent(newId);
        if (flow) {
          targetUrl += '&flow=' + encodeURIComponent(flow);
        }
        window.location.href = targetUrl;
      })
      .catch(function(err) {
        console.error('createNewLevel failed', err);
        showToast('Create level failed', 'error');
        if (buttonEl) {
          buttonEl.disabled = false;
          buttonEl.textContent = originalLabel || 'New Level';
        }
      })
      .finally(function() {
        isCreatingLevel = false;
      });
  }

  function createBadge(label, modifier) {
    var badge = document.createElement('div');
    var className = 'level-badge';
    if (modifier) {
      className += ' level-badge--' + modifier;
    }
    badge.className = className;
    badge.textContent = label;
    badge.setAttribute('aria-hidden', 'true');
    badge.style.display = 'none';
    return badge;
  }

  function renderMultiGridBadge(el, id) {
    if (!el) return;
    var data = levelCache[id];
    if (data && Array.isArray(data.grids)) {
      var isMulti = data.grids.length > 1;
      el.style.display = isMulti ? 'inline-flex' : 'none';
      el.setAttribute('aria-hidden', isMulti ? 'false' : 'true');
      return;
    }
    if (data === null) {
      el.style.display = 'none';
      el.setAttribute('aria-hidden', 'true');
      return;
    }
    el.style.display = 'none';
    el.setAttribute('aria-hidden', 'true');
    loadLevelDetails(id).then(function(){ renderMultiGridBadge(el, id); });
  }

  function renderGoalBadge(el, id, goalType) {
    if (!el) return;
    var data = levelCache[id];
    if (data && data !== null) {
      var hasGoal = levelHasGoalType(data, goalType);
      el.style.display = hasGoal ? 'inline-flex' : 'none';
      el.setAttribute('aria-hidden', hasGoal ? 'false' : 'true');
      return;
    }
    if (data === null) {
      el.style.display = 'none';
      el.setAttribute('aria-hidden', 'true');
      return;
    }
    el.style.display = 'none';
    el.setAttribute('aria-hidden', 'true');
    loadLevelDetails(id).then(function(){ renderGoalBadge(el, id, goalType); });
  }

  function levelHasGoalType(levelData, goalType) {
    if (!levelData || !goalType) return false;
    var normalized = String(goalType).toLowerCase();
    if (!normalized) return false;

    if (Array.isArray(levelData.grids)) {
      for (var i = 0; i < levelData.grids.length; i++) {
        var grid = levelData.grids[i];
        if (!grid || !Array.isArray(grid.targets)) continue;
        for (var j = 0; j < grid.targets.length; j++) {
          var target = grid.targets[j];
          if (!target) continue;
          var type = target.type != null ? String(target.type).toLowerCase() : '';
          if (type === normalized && Number(target.count) > 0) {
            return true;
          }
        }
      }
    }

    if (levelData.config && Array.isArray(levelData.config.targets)) {
      for (var k = 0; k < levelData.config.targets.length; k++) {
        var cfgTarget = levelData.config.targets[k];
        if (!cfgTarget) continue;
        var cfgType = cfgTarget.type != null ? String(cfgTarget.type).toLowerCase() : '';
        if (cfgType === normalized && Number(cfgTarget.count) > 0) {
          return true;
        }
      }
    }

    return false;
  }

  function onDragStart(e) {
    if (filterQuery) {
      e.preventDefault();
      if (typeof showToast === 'function') showToast('Clear search to reorder', 'warning');
      return;
    }
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
    selectedSet.clear();
    selectedIndex = index;
    anchorIndex = index;
    updateSelectionUI();
  }

  function clearSelection() {
    selectedIndex = null;
    selectedSet.clear();
    anchorIndex = null;
    propId.value = '';
    propOrdinal.value = '';
    clearSelectionHighlight();
    updateSelectionUI();
  }

  function clearSelectionHighlight() {
    Array.from(grid.children).forEach(function(child) {
      child.classList.remove('selected');
    });
  }

  function updateSelectionUI() {
    // Toggle card classes
    clearSelectionHighlight();
    if (selectedIndex !== null) {
      var c = grid.querySelector('.level-card[data-index="' + selectedIndex + '"]');
      if (c) c.classList.add('selected');
    }
    selectedSet.forEach(function(i){
      var c = grid.querySelector('.level-card[data-index="' + i + '"]');
      if (c) c.classList.add('selected');
    });
    // Selection counts
    var numSelected = selectedSet.size + (selectedIndex !== null ? 1 : 0);
    var isMulti = numSelected >= 2 || (selectedSet.size >= 1 && selectedIndex !== null);
    var single = numSelected === 1;
    // Elements
    var idGroup = document.querySelector('label[for="prop-id"]').parentElement;
    var ordGroup = document.querySelector('label[for="prop-ordinal"]').parentElement;
    idGroup.style.display = isMulti ? 'none' : '';
    ordGroup.style.display = isMulti ? 'none' : '';
    propUpdate.style.display = isMulti ? 'none' : '';
    if (propDuplicate) propDuplicate.style.display = isMulti ? 'none' : '';
    propPlay.style.display = isMulti ? 'none' : '';
    propDelete.style.display = isMulti ? 'none' : '';
    if (tagsGroup) tagsGroup.style.display = isMulti ? 'none' : '';
    if (multiInfo) {
      if (isMulti) {
        multiInfo.style.display = '';
        multiInfo.textContent = numSelected + ' levels selected';
      } else {
        multiInfo.style.display = 'none';
        multiInfo.textContent = '';
      }
    }
    // Enable copy/move when at least one selected
    if (copyToBtn) copyToBtn.disabled = numSelected === 0;
    if (moveToBtn) moveToBtn.disabled = numSelected === 0;
    // Populate single properties if needed
    if (single) {
      var selIdx = (selectedIndex !== null) ? selectedIndex : Array.from(selectedSet)[0];
      var item = levels[selIdx];
      if (item) {
        propId.value = item.id;
        propOrdinal.value = item.ordinal;
        // Load and render tags for this level
        loadLevelDetails(item.id).then(function(){ renderTagsUI(item.id); });
      }
    } else {
      propId.value = '';
      propOrdinal.value = '';
      renderTagsUI(null);
    }
  }

  function loadLevelDetails(id) {
    if (!id) return Promise.resolve();
    if (levelCache[id]) return Promise.resolve(levelCache[id]);
    if (levelCachePending[id]) return levelCachePending[id];
    levelCachePending[id] = fetch('/levels/' + encodeURIComponent(id) + '?flow=' + encodeURIComponent(flow))
      .then(function(res){
        if (!res.ok) throw new Error('Failed to load level');
        return res.json();
      })
      .then(function(json){
        levelCache[id] = json;
        // collect suggestions from this level's tags
        var tags = Array.isArray(json.tags) ? json.tags : [];
        tags.forEach(function(t){ if (t && typeof t === 'string') allTagSuggestions.add(t); });
        refreshTagSuggestions();
        return json;
      })
      .catch(function(err){
        console.error('loadLevelDetails error', err);
        levelCache[id] = null;
      })
      .finally(function(){ delete levelCachePending[id]; });
    return levelCachePending[id];
  }

  function refreshTagSuggestions() {
    if (!tagsSuggestions) return;
    // Keep current input text
    var curr = tagInput ? tagInput.value : '';
    tagsSuggestions.innerHTML = '';
    Array.from(allTagSuggestions).sort().forEach(function(t){
      var opt = document.createElement('option');
      opt.value = t;
      tagsSuggestions.appendChild(opt);
    });
    if (tagInput) tagInput.value = curr;
  }

  function renderTagsUI(id) {
    if (!tagsList) return;
    tagsList.innerHTML = '';
    if (!id) return; // nothing selected
    var ld = levelCache[id];
    var tags = (ld && Array.isArray(ld.tags)) ? ld.tags : [];
    if (tags.length === 0) {
      var empty = document.createElement('div');
      empty.className = 'text-muted';
      empty.textContent = 'No tags';
      tagsList.appendChild(empty);
      return;
    }
    tags.forEach(function(tag){
      var chip = document.createElement('span');
      chip.className = 'tag-chip';
      var label = document.createElement('span');
      label.textContent = tag;
      var st = tagStyle(tag);
      chip.style.background = st.bg;
      chip.style.borderColor = st.border;
      chip.style.color = st.text;
      var rm = document.createElement('button');
      rm.className = 'tag-remove';
      rm.setAttribute('type', 'button');
      rm.setAttribute('title', 'Remove');
      rm.textContent = '×';
      rm.addEventListener('click', function(){ onRemoveTag(id, tag); });
      chip.appendChild(label);
      chip.appendChild(rm);
      tagsList.appendChild(chip);
    });
  }

  function onAddTag() {
    if (selectedIndex === null) return;
    var item = levels[selectedIndex];
    if (!item) return;
    var id = item.id;
    var val = (tagInput && tagInput.value) ? tagInput.value.trim() : '';
    if (!val) return;
    loadLevelDetails(id).then(function(ld){
      ld = ld || levelCache[id];
      if (!ld) return;
      if (!Array.isArray(ld.tags)) ld.tags = [];
      // prevent dupes (case-sensitive by default)
      if (ld.tags.indexOf(val) !== -1) { showToast('Tag already exists', 'warning'); return; }
      ld.tags.push(val);
      // update suggestions immediately
      allTagSuggestions.add(val);
      refreshTagSuggestions();
      // persist
      return saveLevel(ld).then(function(){
        renderTagsUI(id);
        if (tagInput) tagInput.value = '';
        showToast('Tag added', 'success');
        // Update card tags display
        var card = grid.querySelector('.level-card[data-index="' + selectedIndex + '"] .card-tags');
        if (card) renderCardTags(card, id);
      });
    });
  }

  function onRemoveTag(id, tag) {
    var ld = levelCache[id];
    if (!ld || !Array.isArray(ld.tags)) return;
    var idx = ld.tags.indexOf(tag);
    if (idx === -1) return;
    ld.tags.splice(idx, 1);
    saveLevel(ld).then(function(){
      renderTagsUI(id);
      showToast('Tag removed', 'success');
      // Update card tags display
      if (selectedIndex !== null) {
        var card = grid.querySelector('.level-card[data-index="' + selectedIndex + '"] .card-tags');
        if (card) renderCardTags(card, id);
      }
    });
  }

  function saveLevel(levelJson) {
    // Post full JSON back. Screenshot is optional; server ignores missing.
    return fetch('/save-level?flow=' + encodeURIComponent(flow), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(levelJson)
    }).then(function(res){ if (!res.ok) throw new Error('Save failed'); });
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

  function duplicateLevel() {
    if (selectedIndex === null) {
      showToast('Select a level to duplicate', 'warning');
      return;
    }
    if (selectedSet.size > 0) {
      showToast('Duplicate one level at a time', 'warning');
      return;
    }
    var sourceIndex = selectedIndex;
    var sourceSummary = levels[sourceIndex];
    if (!sourceSummary) {
      showToast('Unable to duplicate the selected level', 'error');
      return;
    }
    var sourceId = sourceSummary.id;

    ensureAllLevelsLoaded()
      .then(function() {
        var idx = levels.findIndex(function(entry) {
          return entry && entry.id === sourceId;
        });
        if (idx === -1) {
          throw new Error('Source level not found after refresh');
        }
        sourceIndex = idx;
        sourceSummary = levels[idx];
        return loadLevelDetails(sourceId);
      })
      .then(function(levelData) {
        if (!levelData) {
          throw new Error('Failed to load source level data');
        }
        var newId = generateLevelId();
        var clone = JSON.parse(JSON.stringify(levelData));
        clone.levelId = newId;
        clone.name = levelNameFromId(newId);
        if (Object.prototype.hasOwnProperty.call(clone, 'id')) {
          clone.id = newId;
        }
        if (Object.prototype.hasOwnProperty.call(clone, 'fileName')) {
          clone.fileName = newId + '.json';
        }

        return fetchLevelScreenshotData(sourceId)
          .then(function(screenshotData) {
            if (screenshotData) {
              clone.screenshot = screenshotData;
            }
            return saveLevel(clone).then(function() {
              if (screenshotData) {
                delete clone.screenshot; // Avoid caching large base64 payloads
              }
              levelCache[newId] = clone;

              var newSummary = { id: newId };
              levels.splice(sourceIndex + 1, 0, newSummary);
              totalLevels = (totalLevels || 0) + 1;
              updateOrdinals();

              selectedIndex = sourceIndex + 1;
              selectedSet.clear();
              anchorIndex = selectedIndex;
              if (!filterQuery) {
                currentPage = Math.floor(selectedIndex / pageSize);
                renderPage();
                updateSelectionUI();
              } else {
                var activeFilter = filterInput ? filterInput.value : filterQuery;
                applyFilter(activeFilter).then(function() {
                  updateSelectionUI();
                });
              }

              var orderPayload = levels
                .filter(function(entry) { return entry && entry.id; })
                .map(function(entry) { return entry.id; });
              fetch('/save-order?flow=' + encodeURIComponent(flow), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderPayload)
              }).catch(function(err) {
                console.error('Failed to persist order after duplicate', err);
              });

              showToast('Level duplicated', 'success');
            });
          });
      })
      .catch(function(err) {
        console.error('duplicateLevel failed', err);
        showToast('Duplicate failed', 'error');
      });
  }

  function deleteLevel() {
    if (selectedIndex === null) {
      return;
    }
    if (!confirm('Are you sure?')) {
      return;
    }
    var id = levels[selectedIndex].id;
    fetch('/delete-level?flow=' + encodeURIComponent(flow), {
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

  function copyToFlow() {
    if (!targetFlowSelect) return;
    var target = targetFlowSelect.value;
    if (!target || target === flow) {
      showToast('Select a different target flow', 'warning');
      return;
    }
    var ids = [];
    if (selectedSet.size > 0) ids = Array.from(selectedSet).map(function(i){ return levels[i] && levels[i].id; }).filter(Boolean);
    else if (selectedIndex !== null) ids = [levels[selectedIndex].id];
    if (ids.length < 1) { showToast('Select at least one level', 'warning'); return; }
    fetch('/copy-level?sourceFlow=' + encodeURIComponent(flow) + '&targetFlow=' + encodeURIComponent(target), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: ids })
    }).then(function(res){
      if (!res.ok) throw new Error('Copy failed');
      showToast('Copied ' + ids.length + ' to ' + target, 'success');
    }).catch(function(){ showToast('Copy failed', 'error'); });
  }

  function moveToFlow() {
    if (!targetFlowSelect) return;
    var target = targetFlowSelect.value;
    if (!target || target === flow) {
      showToast('Select a different target flow', 'warning');
      return;
    }
    var ids = [];
    if (selectedSet.size > 0) ids = Array.from(selectedSet).map(function(i){ return levels[i] && levels[i].id; }).filter(Boolean);
    else if (selectedIndex !== null) ids = [levels[selectedIndex].id];
    if (ids.length < 1) { showToast('Select at least one level', 'warning'); return; }
    fetch('/move-level?sourceFlow=' + encodeURIComponent(flow) + '&targetFlow=' + encodeURIComponent(target), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: ids })
    }).then(function(res){
      if (!res.ok) throw new Error('Move failed');
      showToast('Moved ' + ids.length + ' to ' + target, 'success');
      // Remove moved items from current list and refresh view
      var idSet = new Set(ids);
      levels = levels.filter(function(x){ return x && !idSet.has(x.id); });
      totalLevels = levels.length;
      updateOrdinals();
      if (currentPage * pageSize >= totalLevels && currentPage > 0) {
        currentPage--;
      }
      clearSelection();
      loadPage(currentPage);
    }).catch(function(){ showToast('Move failed', 'error'); });
  }

  // Initialize UI state for copy/move buttons
  updateSelectionUI();

  function playLevel() {
    if (selectedIndex === null) {
      return;
    }
    var id = levels[selectedIndex].id;
    // Fetch the full level JSON, then post it to /play-level
    fetch('/levels/' + encodeURIComponent(id) + '?flow=' + encodeURIComponent(flow))
      .then(function(res) {
        if (!res.ok) { throw new Error('Failed to fetch level'); }
        return res.text();
      })
      .then(function(levelJson) {
        return fetch('/play-level?flow=' + encodeURIComponent(flow), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: levelJson
        });
      })
      .catch(function(err) {
        console.error('Play level failed:', err);
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
    var init = Promise.resolve();
    if (totalLevels === 0) {
      init = fetch('/levels?page=0&pageSize=' + pageSize + '&flow=' + encodeURIComponent(flow))
        .then(function(res) { return res.json(); })
        .then(function(data) {
          totalLevels = data.total;
          levels = new Array(totalLevels);
          for (var i = 0; i < data.items.length; i++) {
            levels[i] = data.items[i];
          }
        });
    }
    return init.then(function(){
      var promises = [];
      var totalPages = Math.ceil(totalLevels / pageSize);
      for (var p = 0; p < totalPages; p++) {
        var start = p * pageSize;
        var end = Math.min(start + pageSize, totalLevels);
        var slice = levels.slice(start, end);
        if (slice.some(function(x) { return x === undefined; })) {
          (function(pLocal, startLocal){
            promises.push(
              fetch('/levels?page=' + pLocal + '&pageSize=' + pageSize + '&flow=' + encodeURIComponent(flow))
                .then(function(res) { return res.json(); })
                .then(function(data) {
                  if (levels.length !== data.total) {
                    levels = new Array(data.total);
                    totalLevels = data.total;
                  }
                  for (var i = 0; i < data.items.length; i++) {
                    levels[startLocal + i] = data.items[i];
                  }
                })
            );
          })(p, start);
        }
      }
      return Promise.all(promises);
    });
  }

  function saveOrder() {
    ensureAllLevelsLoaded().then(function() {
      updateOrdinals();
      fetch('/save-order?flow=' + encodeURIComponent(flow), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(levels.map(function(x) { return x.id; }))
      });
    });
  }
});
