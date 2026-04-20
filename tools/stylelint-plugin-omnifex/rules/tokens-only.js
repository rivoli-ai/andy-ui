'use strict';

const stylelint = require('stylelint');

const ruleName = 'omnifex/tokens-only';

const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: (prop, value) =>
    `Property "${prop}" must resolve to a design token (var(--...)). Found raw value "${value}".`,
});

const meta = { url: 'https://github.com/rivoli-ai/andy-ui/blob/main/docs/BACKLOG.md#regression-prevention-rules' };

// Properties that must use tokens. Kept conservative: focus on color/background/border colors,
// radii, z-index, font-size. Shorthand 'border' and layout properties are omitted to avoid
// massive churn during the audit; the BACKLOG escalates those in later phases.
const TOKEN_REQUIRED_PROPS = new Set([
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

// Values that are always allowed because they have no "raw pixel/hex" content.
const NEUTRAL_VALUES = new Set([
  'inherit',
  'initial',
  'unset',
  'revert',
  'revert-layer',
  'currentcolor',
  'transparent',
  'none',
  'auto',
  '0',
]);

// Heuristic: token-only if the value is a keyword (NEUTRAL_VALUES) OR contains var(--...).
// This intentionally allows chained var() expressions and calc(var(--space) + var(--gap)).
function isTokenised(value) {
  const v = value.trim().toLowerCase();
  if (NEUTRAL_VALUES.has(v)) return true;
  return /var\(\s*--[a-z0-9-_]+/i.test(value);
}

function rule(primary, secondaryOptions) {
  return (root, result) => {
    const validOptions = stylelint.utils.validateOptions(
      result,
      ruleName,
      { actual: primary, possible: [true, false] },
      {
        actual: secondaryOptions,
        possible: {
          ignoreProperties: [String],
          additionalProperties: [String],
        },
        optional: true,
      },
    );
    if (!validOptions || !primary) return;

    const ignored = new Set(
      (secondaryOptions && secondaryOptions.ignoreProperties) || [],
    );
    const required = new Set(TOKEN_REQUIRED_PROPS);
    if (secondaryOptions && Array.isArray(secondaryOptions.additionalProperties)) {
      for (const p of secondaryOptions.additionalProperties) required.add(p);
    }

    root.walkDecls((decl) => {
      const prop = decl.prop.toLowerCase();
      if (ignored.has(prop)) return;
      if (!required.has(prop)) return;
      if (isTokenised(decl.value)) return;

      stylelint.utils.report({
        ruleName,
        result,
        node: decl,
        message: messages.rejected(decl.prop, decl.value.trim()),
        severity: 'warning',
      });
    });
  };
}

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;

module.exports = stylelint.createPlugin(ruleName, rule);
