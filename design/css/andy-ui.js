/* Andy-UI — shared docs interactions */
(function () {
  // ---- Theme: persist + toggle ----
  var KEY = 'andy-ui-theme';
  function apply(t) { document.documentElement.dataset.theme = t; }
  try { apply(localStorage.getItem(KEY) || 'light'); } catch (e) { apply('light'); }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-theme-toggle]');
    if (t) {
      var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (err) {}
      return;
    }

    // ---- Segmented control / tab groups ----
    var seg = e.target.closest('[data-seg] button, [data-seg] [role="tab"]');
    if (seg) {
      var group = seg.closest('[data-seg]');
      group.querySelectorAll('button, [role="tab"]').forEach(function (b) { b.classList.remove('active'); });
      seg.classList.add('active');
      var target = seg.getAttribute('data-target');
      if (target) {
        var panels = document.querySelectorAll('[data-panel-group="' + group.getAttribute('data-seg') + '"]');
        panels.forEach(function (p) { p.hidden = p.getAttribute('data-panel') !== target; });
      }
      return;
    }

    // ---- Copy to clipboard ----
    var cp = e.target.closest('[data-copy]');
    if (cp) {
      var text = cp.getAttribute('data-copy');
      var done = function () {
        cp.classList.add('is-copied');
        var lbl = cp.querySelector('[data-copy-label]');
        var prev = lbl ? lbl.textContent : null;
        if (lbl) lbl.textContent = 'Copied';
        setTimeout(function () { cp.classList.remove('is-copied'); if (lbl && prev !== null) lbl.textContent = prev; }, 1400);
      };
      if (navigator.clipboard) { navigator.clipboard.writeText(text).then(done, done); } else { done(); }
      return;
    }

    // ---- Modal open / close ----
    var opener = e.target.closest('[data-open-modal]');
    if (opener) { var m = document.getElementById(opener.getAttribute('data-open-modal')); if (m) m.hidden = false; return; }
    var closer = e.target.closest('[data-close-modal]');
    if (closer) { var mc = closer.closest('[data-modal]'); if (mc) mc.hidden = true; return; }
    var back = e.target.closest('[data-modal]');
    if (back && e.target === back) { back.hidden = true; return; }

    // ---- Accordion (thinking / collapse) ----
    var acc = e.target.closest('[data-accordion]');
    if (acc) { var body = acc.nextElementSibling; if (body) body.hidden = !body.hidden; acc.classList.toggle('open'); return; }

    // ---- Toast spawner (demo) ----
    var spawn = e.target.closest('[data-toast]');
    if (spawn) { spawnToast(spawn.getAttribute('data-toast'), spawn.getAttribute('data-toast-msg')); return; }
  });

  // ---- Toast host ----
  var ICONS = {
    success: '<polyline points="20 6 9 17 4 12"/>',
    info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    warning: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    error: '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>'
  };
  var TITLES = { success: 'Settings saved', info: 'Backlog imported', warning: 'Token expiring soon', error: 'Connection failed' };
  function spawnToast(type, msg) {
    var host = document.getElementById('toast-host');
    if (!host) { host = document.createElement('div'); host.id = 'toast-host'; document.body.appendChild(host); }
    var t = document.createElement('div');
    t.className = 'dp-toast ' + type;
    t.style.animation = 'ds-toast-in 0.3s cubic-bezier(0.34,1.56,0.64,1)';
    t.innerHTML =
      '<div class="icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px">' + (ICONS[type] || ICONS.info) + '</svg></div>' +
      '<div class="body"><div class="title">' + (TITLES[type] || 'Notice') + '</div><div class="msg">' + (msg || 'This is a ' + type + ' notification.') + '</div></div>' +
      '<button class="close" aria-label="Dismiss"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';
    t.querySelector('.close').addEventListener('click', function () { remove(t); });
    host.appendChild(t);
    setTimeout(function () { remove(t); }, 4200);
  }
  function remove(t) { t.style.animation = 'ds-toast-out 0.25s ease forwards'; setTimeout(function () { t.remove(); }, 260); }

  // ---- Reveal (api key) ----
  document.addEventListener('click', function (e) {
    var rev = e.target.closest('[data-reveal]');
    if (rev) {
      var cell = rev.closest('[data-key-cell]');
      if (cell) {
        var masked = cell.querySelector('[data-masked]');
        var plain = cell.querySelector('[data-plain]');
        if (masked && plain) { var show = masked.hidden; masked.hidden = show; plain.hidden = !show; }
      }
    }
  });
})();
