'use strict';

const stylelint = require('stylelint');

const ruleName = 'omnifex/mobile-first-media';

const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: (query) =>
    `"${query}" uses max-width — write mobile-first styles with min-width or prefer @container queries.`,
});

const meta = { url: 'https://github.com/rivoli-ai/andy-ui/blob/main/docs/BACKLOG.md#regression-prevention-rules' };

function rule(primary) {
  return (root, result) => {
    const validOptions = stylelint.utils.validateOptions(result, ruleName, {
      actual: primary,
      possible: [true, false],
    });
    if (!validOptions || !primary) return;

    root.walkAtRules('media', (atRule) => {
      const params = atRule.params || '';
      const normalized = params.toLowerCase();

      // Accept explicit range queries that contain BOTH min- and max-width
      // (intentional bracket like (min-width: 600px) and (max-width: 1199px)).
      const hasMin = /\(\s*min-width\s*:/.test(normalized);
      const hasMax = /\(\s*max-width\s*:/.test(normalized);
      if (!hasMax) return;
      if (hasMax && hasMin) return;

      stylelint.utils.report({
        ruleName,
        result,
        node: atRule,
        message: messages.rejected(`@media ${params}`),
        severity: 'error',
      });
    });
  };
}

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;

module.exports = stylelint.createPlugin(ruleName, rule);
