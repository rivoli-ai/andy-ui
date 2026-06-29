/* Andy-UI docs — shared shell behaviours (theme, nav, demos) */
(function () {
  // ---- Theme (persisted) -------------------------------------------------
  var saved = localStorage.getItem('andy-ui-theme') || 'light';
  document.documentElement.dataset.theme = saved;

  window.AndyUI = {
    toggleTheme: function () {
      var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      localStorage.setItem('andy-ui-theme', next);
    }
  };

  function brandMark() {
    return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
      '<path d="M12 3 3.5 7.2 12 11.4l8.5-4.2L12 3Z" fill="currentColor" opacity=".95"/>' +
      '<path d="M3.5 12 12 16.2 20.5 12" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" opacity=".75"/>' +
      '<path d="M3.5 16.6 12 20.8l8.5-4.2" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" opacity=".5"/></svg>';
  }

  var NAV = [
    { href: 'index.html', label: 'Overview' },
    { href: 'foundations.html', label: 'Foundations' },
    { href: 'components.html', label: 'Components' },
    { href: 'patterns.html', label: 'Domain' },
    { href: 'showcase.html', label: 'Showcase' }
  ];

  function buildNav() {
    var mount = document.querySelector('[data-doc-nav]');
    if (!mount) return;
    var here = (location.pathname.split('/').pop() || 'index.html');
    var links = NAV.map(function (n) {
      var active = n.href === here ? ' is-active' : '';
      return '<a class="doc-nav__link' + active + '" href="' + n.href + '">' + n.label + '</a>';
    }).join('');
    mount.innerHTML =
      '<a class="doc-brand" href="index.html">' +
        '<span class="doc-brand__mark">' + brandMark() + '</span>' +
        '<span class="doc-brand__text"><span class="doc-brand__name">Andy-UI</span>' +
        '<span class="doc-brand__tag">Design System</span></span>' +
      '</a>' +
      '<nav class="doc-nav__links">' + links + '</nav>' +
      '<div class="doc-nav__right">' +
        '<span class="doc-nav__src">4 apps · unified</span>' +
        '<button class="theme-toggle" onclick="AndyUI.toggleTheme()" aria-label="Toggle theme" title="Toggle theme">' +
          '<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>' +
          '<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>' +
        '</button>' +
      '</div>';
  }

  // ---- Generic demo interactions ----------------------------------------
  function wire() {
    // Tabs: [data-tabs] container, [data-tab="key"] buttons, [data-panel="key"] panels
    document.querySelectorAll('[data-tabs]').forEach(function (group) {
      group.querySelectorAll('[data-tab]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var key = btn.getAttribute('data-tab');
          group.querySelectorAll('[data-tab]').forEach(function (b) {
            b.classList.toggle('is-active', b === btn);
            b.classList.toggle('settings-tabs__tab--active', b === btn && b.classList.contains('settings-tabs__tab'));
            b.classList.toggle('provider-tab', b.classList.contains('provider-tab'));
            if (b.classList.contains('provider-tab')) b.classList.toggle('active', b === btn);
          });
          // Panels may live inside the group OR in a sibling/wrapper; fall back to nearest scope.
          var panels = group.querySelectorAll('[data-panel]');
          if (!panels.length) {
            var scope = group.closest('[data-tabs-scope]') || group.parentElement || document;
            panels = scope.querySelectorAll('[data-panel]');
          }
          panels.forEach(function (p) {
            p.style.display = p.getAttribute('data-panel') === key ? '' : 'none';
          });
        });
      });
    });

    // Segmented toggles: [data-segment] with [data-seg] buttons -> toggles is-active
    document.querySelectorAll('[data-segment]').forEach(function (group) {
      group.querySelectorAll('[data-seg]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          group.querySelectorAll('[data-seg]').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
          var target = group.getAttribute('data-segment-target');
          if (target) {
            var host = document.querySelector(target);
            if (host) host.setAttribute('data-view', btn.getAttribute('data-seg'));
          }
        });
      });
    });

    // Simple is-on toggles
    document.querySelectorAll('[data-toggle-on]').forEach(function (btn) {
      btn.addEventListener('click', function () { btn.classList.toggle('is-on'); });
    });

    // Copy buttons: [data-copy="text"]
    document.querySelectorAll('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var txt = btn.getAttribute('data-copy');
        if (navigator.clipboard) navigator.clipboard.writeText(txt).catch(function(){});
        var old = btn.getAttribute('data-label-default') || btn.textContent;
        btn.classList.add('is-copied');
        var done = btn.getAttribute('data-label-copied') || 'Copied';
        if (btn.hasAttribute('data-copy-text')) btn.textContent = done;
        setTimeout(function () { btn.classList.remove('is-copied'); if (btn.hasAttribute('data-copy-text')) btn.textContent = old; }, 1400);
      });
    });

    // Modals: [data-open-modal="id"] / [data-close-modal] / backdrop click
    document.querySelectorAll('[data-open-modal]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var m = document.getElementById(btn.getAttribute('data-open-modal'));
        if (m) m.style.display = 'flex';
      });
    });
    document.querySelectorAll('[data-modal]').forEach(function (m) {
      m.addEventListener('click', function (e) {
        if (e.target === m || e.target.hasAttribute('data-close-modal')) m.style.display = 'none';
      });
    });

    // Collapse chevrons: [data-collapse="targetId"]
    document.querySelectorAll('[data-collapse]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var t = document.getElementById(btn.getAttribute('data-collapse'));
        if (!t) return;
        var hidden = t.style.display === 'none';
        t.style.display = hidden ? '' : 'none';
        btn.classList.toggle('is-collapsed', !hidden);
      });
    });

    // Reveal key cells: [data-reveal]
    document.querySelectorAll('[data-reveal]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cell = btn.closest('[data-keycell]');
        if (!cell) return;
        cell.classList.toggle('is-revealed');
        var code = cell.querySelector('code');
        if (code) code.textContent = cell.classList.contains('is-revealed')
          ? code.getAttribute('data-full') : code.getAttribute('data-mask');
      });
    });
  }

  // ---- Toast demo --------------------------------------------------------
  window.AndyUI.toast = function (kind, title, msg) {
    var vp = document.querySelector('.toast-viewport');
    if (!vp) { vp = document.createElement('div'); vp.className = 'toast-viewport'; document.body.appendChild(vp); }
    var icons = {
      success: '<path d="M20 6 9 17l-5-5"/>',
      info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
      warning: '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/>',
      error: '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/>'
    };
    var el = document.createElement('div');
    el.className = 'dp-toast ' + kind;
    el.style.animation = 'au-toast-in .3s var(--ease-spring)';
    el.innerHTML =
      '<span class="icon-box"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (icons[kind] || icons.info) + '</svg></span>' +
      '<span class="body"><span class="title">' + title + '</span>' + (msg ? '<span class="msg">' + msg + '</span>' : '') + '</span>' +
      '<button class="close" aria-label="Dismiss"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>';
    el.querySelector('.close').addEventListener('click', function () { el.remove(); });
    vp.appendChild(el);
    setTimeout(function () { if (el.parentNode) { el.style.opacity = '0'; el.style.transition = 'opacity .3s'; setTimeout(function(){ el.remove(); }, 300); } }, 4200);
  };

  document.addEventListener('DOMContentLoaded', function () { buildNav(); wire(); });
  if (document.readyState !== 'loading') { buildNav(); wire(); }
})();
