'use strict';

// Aggregator for the Omnifex stylelint rules. See UI-8 in docs/BACKLOG.md
// for the rationale behind each rule.
module.exports = [
  require('./rules/no-hex-in-components'),
  require('./rules/tokens-only'),
  require('./rules/mobile-first-media'),
  require('./rules/no-hover-only-affordance'),
];
