'use strict';

const stylelint = require('stylelint');

const ruleName = 'omnifex/no-hover-only-affordance';

const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: (selector, prop) =>
    `"${selector}" toggles "${prop}" on :hover — hover-only affordances fail on touch. Also expose the state via :focus-visible, aria, or a persistent UI.`,
});

const meta = { url: 'https://github.com/rivoli-ai/andy-ui/blob/main/docs/BACKLOG.md#regression-prevention-rules' };

// Declarations that effectively hide/show UI. If these appear inside a selector containing
// :hover but NOT :focus / :focus-visible / :focus-within, the affordance is hover-only.
const TOGGLING_PROPS = new Set([
  'display',
  'visibility',
  'opacity',
  'pointer-events',
]);

function hasHover(s) {
  return s.toLowerCase().includes(':hover');
}
function hasFocus(s) {
  const t = s.toLowerCase();
  return t.includes(':focus') || t.includes(':focus-visible') || t.includes(':focus-within');
}

function rule(primary) {
  return (root, result) => {
    const validOptions = stylelint.utils.validateOptions(result, ruleName, {
      actual: primary,
      possible: [true, false],
    });
    if (!validOptions || !primary) return;

    root.walkRules((r) => {
      // A rule is hover-only when at least one selector hovers AND no selector
      // in the same rule exposes the same declarations via focus-*. The same
      // declaration block is shared by every selector, so a single focus
      // selector is enough to make the affordance keyboard-reachable.
      const hovers = r.selectors.some(hasHover);
      if (!hovers) return;
      const hasAnyFocus = r.selectors.some(hasFocus);
      if (hasAnyFocus) return;

      r.walkDecls((decl) => {
        const prop = decl.prop.toLowerCase();
        if (!TOGGLING_PROPS.has(prop)) return;

        // opacity:1, opacity:0.9, etc. are OK if they are subtle (0.5..1.0).
        // Flag only full hide (opacity:0) or extreme changes.
        if (prop === 'opacity') {
          const num = parseFloat(decl.value);
          if (!Number.isNaN(num) && num >= 0.5) return;
        }

        // display: block/flex/grid back from none, OR display: none are both "toggle".
        stylelint.utils.report({
          ruleName,
          result,
          node: decl,
          message: messages.rejected(r.selector, decl.prop),
          severity: 'error',
        });
      });
    });
  };
}

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;

module.exports = stylelint.createPlugin(ruleName, rule);
