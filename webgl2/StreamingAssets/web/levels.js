document.addEventListener('DOMContentLoaded', function() {
  fetch('/levels')
    .then(function(res) { return res.json(); })
    .then(function(levels) {
      var grid = document.getElementById('levels-grid');
      levels.forEach(function(id) {
        var card = document.createElement('div');
        card.className = 'level-card';

        var thumb = document.createElement('div');
        thumb.className = 'level-thumb';
        card.appendChild(thumb);

        var link = document.createElement('a');
        link.textContent = id;
        link.href = 'index.html?level=' + encodeURIComponent(id);
        card.appendChild(link);

        grid.appendChild(card);
      });
    });
});
