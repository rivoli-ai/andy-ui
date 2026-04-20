'use strict';

const stylelint = require('stylelint');

const ruleName = 'omnifex/no-hex-in-components';

const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: (hex) =>
    `Hex literal "${hex}" is not allowed in component CSS. Use a design token via var(--theme-* | --color-* | --space-*).`,
  rejectedFallback: (hex) =>
    `Hex fallback "${hex}" inside var() is discouraged. Prefer a neutral fallback (e.g. currentColor / transparent / 0) or omit the fallback so missing tokens fail loudly.`,
});

const meta = { url: 'https://github.com/rivoli-ai/andy-ui/blob/main/docs/BACKLOG.md#regression-prevention-rules' };

const HEX_REGEX = /#[0-9a-fA-F]{3,8}\b/g;

function rule(primary, secondaryOptions) {
  return (root, result) => {
    const validOptions = stylelint.utils.validateOptions(
      result,
      ruleName,
      { actual: primary, possible: [true, false] },
      {
        actual: secondaryOptions,
        possible: { allowFallback: [true, false] },
        optional: true,
      },
    );
    if (!validOptions || !primary) return;

    const allowFallback = !!(secondaryOptions && secondaryOptions.allowFallback);

    root.walkDecls((decl) => {
      const value = decl.value;
      if (!value || !value.includes('#')) return;

      let match;
      HEX_REGEX.lastIndex = 0;
      while ((match = HEX_REGEX.exec(value)) !== null) {
        const hex = match[0];
        const before = value.slice(0, match.index).toLowerCase();
        const inVarFallback =
          before.lastIndexOf('var(') > before.lastIndexOf(')') &&
          before.includes(',');

        const severity = inVarFallback && allowFallback ? 'warning' : 'error';
        const message =
          inVarFallback && allowFallback
            ? messages.rejectedFallback(hex)
            : messages.rejected(hex);

        stylelint.utils.report({
          ruleName,
          result,
          node: decl,
          word: hex,
          message,
          severity,
        });
      }
    });
  };
}

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;

module.exports = stylelint.createPlugin(ruleName, rule);
