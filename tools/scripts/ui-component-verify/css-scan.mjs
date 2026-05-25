/**
 * Dependency-free CSS scanner (shared contract with audit-ui-components.mjs).
 */

export const HEX_RE = /#[0-9a-fA-F]{3,8}\b/g;
export const PX_RE = /(?<![\d.])\d+(?:\.\d+)?px\b/gi;

export const TOKEN_PROPS = new Set([
  'color',
  'background',
  'background-color',
  'border-color',
  'border-top-color',
  'border-right-color',
  'border-bottom-color',
  'border-left-color',
  'outline-color',
  'fill',
  'stroke',
  'border-radius',
  'z-index',
  'font-size',
  'line-height',
  'min-height',
  'min-width',
  'max-width',
  'width',
  'height',
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'gap',
  'row-gap',
  'column-gap',
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'outline-width',
  'border-width',
  'border-top-width',
  'border-right-width',
  'border-bottom-width',
  'border-left-width',
  'letter-spacing',
  'font-weight',
]);

export const NEUTRAL = new Set([
  'inherit',
  'initial',
  'unset',
  'revert',
  'currentcolor',
  'transparent',
  'none',
  'auto',
  '0',
  '100%',
  'fit-content',
  'max-content',
  'min-content',
]);

export const TOGGLING_PROPS = new Set([
  'display',
  'visibility',
  'opacity',
  'pointer-events',
]);

export function stripComments(src) {
  return src.replace(/\/\*[\s\S]*?\*\//g, '');
}

export function scanCss(css) {
  const findings = {
    hex: [],
    nonToken: [],
    maxWidth: [],
    hoverOnly: [],
    rawPx: [],
    rawRgb: [],
  };

  const lines = css.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const noComment = lines[i].replace(/\/\*.*?\*\//g, '');
    let m;
    HEX_RE.lastIndex = 0;
    while ((m = HEX_RE.exec(noComment)) !== null) {
      const before = noComment.slice(0, m.index).toLowerCase();
      const inFallback =
        before.lastIndexOf('var(') > before.lastIndexOf(')') && before.includes(',');
      findings.hex.push({ line: i + 1, value: m[0], inFallback });
    }

    PX_RE.lastIndex = 0;
    while ((m = PX_RE.exec(noComment)) !== null) {
      findings.rawPx.push({ line: i + 1, value: m[0] });
    }

    if (
      /\brgb[a]?\s*\(/i.test(noComment) &&
      !/var\s*\(/i.test(noComment) &&
      !/color-mix\s*\(/i.test(noComment)
    ) {
      findings.rawRgb.push({ line: i + 1, value: noComment.trim() });
    }
    if (
      /\bhsl[a]?\s*\(/i.test(noComment) &&
      !/var\s*\(/i.test(noComment) &&
      !/color-mix\s*\(/i.test(noComment)
    ) {
      findings.rawRgb.push({ line: i + 1, value: noComment.trim() });
    }
  }

  const clean = stripComments(css);
  const mediaRe = /@media\s+([^{]+)\{/g;
  let mm;
  while ((mm = mediaRe.exec(clean)) !== null) {
    const params = mm[1].trim().toLowerCase();
    const hasMin = /\(\s*min-width\s*:/.test(params);
    const hasMax = /\(\s*max-width\s*:/.test(params);
    if (hasMax && !hasMin) {
      const line = clean.slice(0, mm.index).split('\n').length;
      findings.maxWidth.push({ line, query: `@media ${mm[1].trim()}` });
    }
  }

  const stack = [];
  let selBuf = '';
  let bodyBuf = '';
  let inBody = false;
  let selectorStartLine = 1;
  let currentLine = 1;

  for (let i = 0; i < clean.length; i++) {
    const ch = clean[i];
    if (ch === '\n') currentLine++;

    if (!inBody) {
      if (ch === '{') {
        const sel = selBuf.trim();
        if (sel.startsWith('@media') || sel.startsWith('@supports') || sel.startsWith('@keyframes')) {
          stack.push({ kind: 'at', sel });
          selBuf = '';
          continue;
        }
        stack.push({ kind: 'rule', sel, line: selectorStartLine });
        selBuf = '';
        inBody = true;
        bodyBuf = '';
        continue;
      }
      if (ch === '}') {
        stack.pop();
        continue;
      }
      if (selBuf.trim().length === 0 && /\S/.test(ch)) {
        selectorStartLine = currentLine;
        selBuf = ch;
        continue;
      }
      selBuf += ch;
      continue;
    }

    if (ch === '}') {
      const frame = stack.pop();
      inBody = false;
      if (frame?.kind === 'rule') {
        analyseBody(frame, bodyBuf, findings);
      }
      bodyBuf = '';
      continue;
    }
    bodyBuf += ch;
  }

  return findings;
}

function selectorHoverOnly(selector) {
  const s = selector.toLowerCase();
  if (!s.includes(':hover')) return false;
  if (s.includes(':focus')) return false;
  if (s.includes(':focus-visible')) return false;
  if (s.includes(':focus-within')) return false;
  return true;
}

function analyseBody(frame, body, findings) {
  const hoverOnly = selectorHoverOnly(frame.sel);
  let lineNo = frame.line;
  let running = '';
  let startLine = null;

  for (let i = 0; i < body.length; i++) {
    const ch = body[i];
    if (ch === '\n') lineNo++;
    if (ch === ';') {
      const decl = running.trim();
      if (decl && startLine != null) {
        checkDecl(frame, decl, startLine, findings, hoverOnly);
      }
      running = '';
      startLine = null;
      continue;
    }
    if (running.length === 0 && /\s/.test(ch)) continue;
    if (startLine == null && !/\s/.test(ch)) startLine = lineNo;
    running += ch;
  }

  const tail = running.trim();
  if (tail && startLine != null) {
    checkDecl(frame, tail, startLine, findings, hoverOnly);
  }
}

function checkDecl(frame, decl, line, findings, hoverOnly) {
  const colon = decl.indexOf(':');
  if (colon < 0) return;
  const prop = decl.slice(0, colon).trim().toLowerCase();
  const value = decl.slice(colon + 1).trim();

  if (TOKEN_PROPS.has(prop) && !/var\(\s*--[a-z0-9-_]+/i.test(value)) {
    const normalised = value.toLowerCase();
    if (!NEUTRAL.has(normalised)) {
      findings.nonToken.push({ line, prop, value });
    }
  }

  if (hoverOnly && TOGGLING_PROPS.has(prop)) {
    if (prop === 'opacity') {
      const n = parseFloat(value);
      if (!Number.isNaN(n) && n >= 0.5) return;
    }
    findings.hoverOnly.push({ line, selector: frame.sel, prop, value });
  }
}
