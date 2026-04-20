#!/usr/bin/env node
/**
 * Audit every CSS file under libs/ui-components/src/lib and report the four
 * UI-8 regression classes: hex literals, non-token raw values, max-width media
 * queries, and hover-only affordances.
 *
 * This script is deliberately dependency-free (no stylelint, no postcss) so it
 * can run on a fresh checkout before `pnpm install` completes, and so CI can
 * fall back to it if installing fails for any reason.
 *
 * Writes the report to docs/UI_AUDIT_REPORT.md.
 *
 * Usage: node tools/scripts/audit-ui-components.mjs [--fail-on-error]
 */

import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..', '..');
const SRC = join(ROOT, 'libs', 'ui-components', 'src', 'lib');
const OUT = join(ROOT, 'docs', 'UI_AUDIT_REPORT.md');

const COMPONENTS_OF_INTEREST = [
  'button',
  'badge',
  'card',
  'header',
  'footer',
  'theme-toggle',
];

const HEX_RE = /#[0-9a-fA-F]{3,8}\b/g;
const TOKEN_PROPS = new Set([
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
]);
const NEUTRAL = new Set([
  'inherit',
  'initial',
  'unset',
  'revert',
  'currentcolor',
  'transparent',
  'none',
  'auto',
  '0',
]);
const TOGGLING_PROPS = new Set([
  'display',
  'visibility',
  'opacity',
  'pointer-events',
]);

async function* walkCss(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkCss(full);
    } else if (entry.isFile() && entry.name.endsWith('.css')) {
      yield full;
    }
  }
}

function stripComments(src) {
  return src.replace(/\/\*[\s\S]*?\*\//g, '');
}

/**
 * Very small CSS scanner. Walks top-level rules and @-rules without a full
 * parser; good enough for the audit surface (single-level selectors and
 * @media blocks used in the component library today).
 */
function scan(css) {
  const findings = {
    hex: [],           // { line, value, inFallback }
    nonToken: [],      // { line, prop, value }
    maxWidth: [],      // { line, query }
    hoverOnly: [],     // { line, selector, prop, value }
  };

  const lines = css.split('\n');

  // Hex scan (very cheap)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const noComment = line.replace(/\/\*.*?\*\//g, '');
    let m;
    HEX_RE.lastIndex = 0;
    while ((m = HEX_RE.exec(noComment)) !== null) {
      const before = noComment.slice(0, m.index).toLowerCase();
      const inFallback =
        before.lastIndexOf('var(') > before.lastIndexOf(')') &&
        before.includes(',');
      findings.hex.push({ line: i + 1, value: m[0], inFallback });
    }
  }

  // @media scan
  const mediaRe = /@media\s+([^{]+)\{/g;
  const clean = stripComments(css);
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

  // Rule scan: find blocks "{ ... }" at any level; we do it per top-level rule
  // by splitting on closing braces at depth 1. Simpler: iterate character-wise.
  const stack = [];
  let selBuf = '';
  let bodyBuf = '';
  let inBody = false;
  let selectorStartLine = 1;
  let currentLine = 1;
  const state = { atMediaDepth: 0 };

  for (let i = 0; i < clean.length; i++) {
    const ch = clean[i];
    if (ch === '\n') currentLine++;

    if (!inBody) {
      if (ch === '{') {
        const sel = selBuf.trim();
        if (sel.startsWith('@media') || sel.startsWith('@supports')) {
          // open at-rule container; don't treat as a selector rule.
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
        // Closing an at-rule container with no pending selector.
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

    // inBody === true
    if (ch === '}') {
      // Analyse declarations in bodyBuf against the top-of-stack rule.
      const frame = stack.pop();
      inBody = false;
      if (frame && frame.kind === 'rule') {
        analyseBody(frame, bodyBuf, findings);
      }
      bodyBuf = '';
      continue;
    }
    bodyBuf += ch;
  }

  return findings;
}

function analyseBody(frame, body, findings) {
  const hoverOnly = selectorHoverOnly(frame.sel);

  // Walk chars, tracking current line, and capture the line at which each
  // declaration *starts* (first non-whitespace char of the running buffer).
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

function selectorHoverOnly(selector) {
  const s = selector.toLowerCase();
  if (!s.includes(':hover')) return false;
  if (s.includes(':focus')) return false;
  if (s.includes(':focus-visible')) return false;
  if (s.includes(':focus-within')) return false;
  return true;
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

function componentOf(relPath) {
  // libs/ui-components/src/lib/<component>/<file>.css
  const parts = relPath.split(/[\\/]/);
  const idx = parts.indexOf('lib');
  return idx >= 0 ? parts[idx + 1] ?? 'unknown' : 'unknown';
}

function mdEscape(s) {
  return String(s).replace(/\|/g, '\\|');
}

function section(title) {
  return `\n## ${title}\n\n`;
}

async function main() {
  const argFail = process.argv.includes('--fail-on-error');
  try {
    await stat(SRC);
  } catch {
    console.error(`ERROR: Source dir not found: ${SRC}`);
    process.exit(2);
  }

  const perComponent = new Map();
  for await (const file of walkCss(SRC)) {
    const rel = relative(ROOT, file);
    const css = await readFile(file, 'utf8');
    const findings = scan(css);
    const comp = componentOf(rel);
    if (!perComponent.has(comp)) perComponent.set(comp, []);
    perComponent.get(comp).push({ file: rel, findings });
  }

  // Build markdown report.
  const now = new Date().toISOString();
  let totals = { hex: 0, nonToken: 0, maxWidth: 0, hoverOnly: 0 };
  const out = [];
  out.push('# UI Components Audit Report');
  out.push('');
  out.push(`Generated by \`tools/scripts/audit-ui-components.mjs\` on ${now}.`);
  out.push('');
  out.push('This report is the dependency-free equivalent of the UI-8 stylelint checks. It scans every CSS file under `libs/ui-components/src/lib/` and reports four regression classes:');
  out.push('');
  out.push('1. **Hex literals** (`#rgb`, `#rrggbb`, `#rrggbbaa`) — excluding or annotating hex values inside `var(..., #fallback)`.');
  out.push('2. **Non-token raw values** on `color`, `background(-color)`, `border-*color`, `outline-color`, `fill`, `stroke`, `border-radius`, `z-index`, `font-size`.');
  out.push('3. **`@media (max-width:)` queries** (anti-pattern; mobile-first requires `min-width` or `@container`).');
  out.push('4. **Hover-only affordances** — `:hover` rules toggling `display`, `visibility`, `opacity < 0.5`, `pointer-events` without a matching `:focus`/`:focus-visible`/`:focus-within`.');
  out.push('');

  // Summary table.
  out.push(section('Summary').trim());
  out.push('');
  out.push('| Component | Hex (hard) | Hex (fallback) | Non-token | max-width | hover-only |');
  out.push('| --- | ---: | ---: | ---: | ---: | ---: |');
  const orderedComps = [
    ...COMPONENTS_OF_INTEREST,
    ...[...perComponent.keys()].filter((c) => !COMPONENTS_OF_INTEREST.includes(c)).sort(),
  ].filter((c) => perComponent.has(c));

  for (const comp of orderedComps) {
    const files = perComponent.get(comp);
    const sums = files.reduce(
      (acc, f) => {
        acc.hexHard += f.findings.hex.filter((h) => !h.inFallback).length;
        acc.hexFallback += f.findings.hex.filter((h) => h.inFallback).length;
        acc.nonToken += f.findings.nonToken.length;
        acc.maxWidth += f.findings.maxWidth.length;
        acc.hoverOnly += f.findings.hoverOnly.length;
        return acc;
      },
      { hexHard: 0, hexFallback: 0, nonToken: 0, maxWidth: 0, hoverOnly: 0 },
    );
    totals.hex += sums.hexHard;
    totals.nonToken += sums.nonToken;
    totals.maxWidth += sums.maxWidth;
    totals.hoverOnly += sums.hoverOnly;
    out.push(
      `| ${comp} | ${sums.hexHard} | ${sums.hexFallback} | ${sums.nonToken} | ${sums.maxWidth} | ${sums.hoverOnly} |`,
    );
  }

  out.push('');
  out.push(`**Hard errors** (must fix before DoD): \`hex(hard) + max-width + hover-only = ${totals.hex + totals.maxWidth + totals.hoverOnly}\`.`);
  out.push(`**Warnings** (non-token raw values + hex fallbacks): tracked per component below.`);
  out.push('');

  // Per-component detail.
  for (const comp of orderedComps) {
    const files = perComponent.get(comp);
    const hasAny = files.some(
      (f) =>
        f.findings.hex.length +
          f.findings.nonToken.length +
          f.findings.maxWidth.length +
          f.findings.hoverOnly.length >
        0,
    );
    out.push(section(`Component: \`${comp}\``).trim());
    out.push('');
    if (!hasAny) {
      out.push('_No findings._');
      out.push('');
      continue;
    }
    for (const f of files) {
      const fi = f.findings;
      if (fi.hex.length + fi.nonToken.length + fi.maxWidth.length + fi.hoverOnly.length === 0) continue;
      out.push(`### \`${f.file}\``);
      out.push('');
      if (fi.hex.length) {
        out.push('**Hex literals**');
        out.push('');
        out.push('| Line | Value | In var() fallback? |');
        out.push('| ---: | --- | :---: |');
        for (const h of fi.hex) {
          out.push(`| ${h.line} | \`${mdEscape(h.value)}\` | ${h.inFallback ? 'yes' : 'no'} |`);
        }
        out.push('');
      }
      if (fi.nonToken.length) {
        out.push('**Non-token raw values**');
        out.push('');
        out.push('| Line | Property | Value |');
        out.push('| ---: | --- | --- |');
        for (const n of fi.nonToken) {
          out.push(`| ${n.line} | \`${n.prop}\` | \`${mdEscape(n.value)}\` |`);
        }
        out.push('');
      }
      if (fi.maxWidth.length) {
        out.push('**`max-width` media queries**');
        out.push('');
        out.push('| Line | Query |');
        out.push('| ---: | --- |');
        for (const m of fi.maxWidth) {
          out.push(`| ${m.line} | \`${mdEscape(m.query)}\` |`);
        }
        out.push('');
      }
      if (fi.hoverOnly.length) {
        out.push('**Hover-only affordances**');
        out.push('');
        out.push('| Line | Selector | Property | Value |');
        out.push('| ---: | --- | --- | --- |');
        for (const h of fi.hoverOnly) {
          out.push(
            `| ${h.line} | \`${mdEscape(h.selector)}\` | \`${h.prop}\` | \`${mdEscape(h.value)}\` |`,
          );
        }
        out.push('');
      }
    }
  }

  out.push(section('Exit code').trim());
  out.push('');
  out.push('Run with `--fail-on-error` to return non-zero when hard errors are present (suitable for CI before the stylelint plugin is wired in).');
  out.push('');

  await writeFile(OUT, out.join('\n'), 'utf8');

  const total = totals.hex + totals.maxWidth + totals.hoverOnly;
  const warnings = totals.nonToken;
  console.log(`Audit written to ${relative(ROOT, OUT)}`);
  console.log(
    `  Hard errors : ${total}  (hex=${totals.hex}  max-width=${totals.maxWidth}  hover-only=${totals.hoverOnly})`,
  );
  console.log(`  Warnings    : ${warnings}  (non-token raw values)`);
  if (argFail && total > 0) {
    console.error('Failing because hard errors are present and --fail-on-error was passed.');
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
