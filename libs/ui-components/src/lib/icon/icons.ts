/**
 * Andy UI icon registry.
 *
 * Each value is the inner SVG content (child elements only — no <svg> wrapper).
 * All icons are 24×24 viewBox, stroke-based (currentColor), Feather-style.
 *
 * To add an icon:
 *  1. Add its name to the IconName union.
 *  2. Add the SVG inner-content string to ICONS.
 *  3. Re-build the package.
 */

export type IconName =
  | 'add'
  | 'arrow-left'
  | 'arrow-right'
  | 'check'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'close'
  | 'delete'
  | 'edit'
  | 'error'
  | 'home'
  | 'info'
  | 'logout'
  | 'menu'
  | 'more-horizontal'
  | 'more-vertical'
  | 'search'
  | 'settings'
  | 'user'
  | 'warning';

export const ICONS: Record<IconName, string> = {
  add: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',

  'arrow-left':
    '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',

  'arrow-right':
    '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',

  check: '<polyline points="20 6 9 17 4 12"/>',

  'chevron-down': '<polyline points="6 9 12 15 18 9"/>',

  'chevron-left': '<polyline points="15 18 9 12 15 6"/>',

  'chevron-right': '<polyline points="9 18 15 12 9 6"/>',

  'chevron-up': '<polyline points="18 15 12 9 6 15"/>',

  close:
    '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',

  delete:
    '<polyline points="3 6 5 6 21 6"/>' +
    '<path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>' +
    '<path d="M10 11v6"/><path d="M14 11v6"/>' +
    '<path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',

  edit:
    '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>' +
    '<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',

  error:
    '<circle cx="12" cy="12" r="10"/>' +
    '<line x1="12" y1="8" x2="12" y2="12"/>' +
    '<line x1="12" y1="16" x2="12.01" y2="16"/>',

  home:
    '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>' +
    '<polyline points="9 22 9 12 15 12 15 22"/>',

  info:
    '<circle cx="12" cy="12" r="10"/>' +
    '<line x1="12" y1="8" x2="12" y2="12"/>' +
    '<line x1="12" y1="16" x2="12.01" y2="16"/>',

  logout:
    '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>' +
    '<polyline points="16 17 21 12 16 7"/>' +
    '<line x1="21" y1="12" x2="9" y2="12"/>',

  menu:
    '<line x1="3" y1="12" x2="21" y2="12"/>' +
    '<line x1="3" y1="6" x2="21" y2="6"/>' +
    '<line x1="3" y1="18" x2="21" y2="18"/>',

  'more-horizontal':
    '<circle cx="12" cy="12" r="1"/>' +
    '<circle cx="19" cy="12" r="1"/>' +
    '<circle cx="5" cy="12" r="1"/>',

  'more-vertical':
    '<circle cx="12" cy="12" r="1"/>' +
    '<circle cx="12" cy="5" r="1"/>' +
    '<circle cx="12" cy="19" r="1"/>',

  search:
    '<circle cx="11" cy="11" r="8"/>' +
    '<line x1="21" y1="21" x2="16.65" y2="16.65"/>',

  settings:
    '<circle cx="12" cy="12" r="3"/>' +
    '<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06' +
    'a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09' +
    'A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06' +
    'A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09' +
    'A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06' +
    'A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09' +
    'a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06' +
    'A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',

  user:
    '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>' +
    '<circle cx="12" cy="7" r="4"/>',

  warning:
    '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>' +
    '<line x1="12" y1="9" x2="12" y2="13"/>' +
    '<line x1="12" y1="17" x2="12.01" y2="17"/>',
};
