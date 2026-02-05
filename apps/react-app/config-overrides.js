const path = require('path');
const webpack = require('webpack');

module.exports = function override(config, env) {
  // Disable ModuleScopePlugin to allow imports outside src/
  config.resolve.plugins = config.resolve.plugins || [];
  config.resolve.plugins = config.resolve.plugins.filter(
    (plugin) => plugin.constructor.name !== 'ModuleScopePlugin'
  );

  // Add resolve aliases to point to source files
  config.resolve.alias = {
    ...config.resolve.alias,
    '@omnifex/identity-react$': path.resolve(__dirname, '../../libs/identity-react/src/public-api.ts'),
    '@omnifex/identity$': path.resolve(__dirname, '../../libs/identity/src/public-api.ts'),
    '@omnifex/styles-react$': path.resolve(__dirname, '../../libs/styles-react/src/public-api.ts'),
    '@omnifex/styles$': path.resolve(__dirname, '../../libs/styles/src/public-api.ts'),
    '@omnifex/ui-components$': path.resolve(__dirname, '../../libs/ui-components/src/public-api.ts'),
    '@omnifex/ui-components/loader$': path.resolve(__dirname, '../../libs/ui-components/loader/index.js'),
    '@omnifex/styles-react/theme.css$': path.resolve(__dirname, '../../libs/styles-react/src/theme.css'),
    '@omnifex/styles/lib/theme.css$': path.resolve(__dirname, '../../libs/styles/src/lib/theme.css'),
  };

  // Ensure .ts and .tsx extensions are resolved
  config.resolve.extensions = [...(config.resolve.extensions || []), '.ts', '.tsx'];
  
  // Map .js imports to .ts/.tsx files (for TypeScript ESM compatibility)
  config.resolve.extensionAlias = {
    '.js': ['.ts', '.tsx', '.js'],
    '.jsx': ['.tsx', '.jsx'],
  };

  const libsPath = path.resolve(__dirname, '../../libs');

  // Remove source-map-loader entirely to prevent it from processing TypeScript files
  config.module.rules = config.module.rules.map((rule) => {
    if (rule.oneOf) {
      return {
        ...rule,
        oneOf: rule.oneOf
          .filter((oneOfRule) => {
            // Remove source-map-loader rules
            if (oneOfRule.loader && oneOfRule.loader.includes('source-map-loader')) {
              return false;
            }
            if (oneOfRule.use && Array.isArray(oneOfRule.use)) {
              const hasSourceMapLoader = oneOfRule.use.some(
                (u) => (typeof u === 'string' && u.includes('source-map-loader')) ||
                       (typeof u === 'object' && u.loader && u.loader.includes('source-map-loader'))
              );
              if (hasSourceMapLoader) {
                return false;
              }
            }
            return true;
          })
          .map((oneOfRule) => {
            // Update TypeScript/TSX rules to include libs/
            if (oneOfRule.test && oneOfRule.test.toString().includes('tsx')) {
              return {
                ...oneOfRule,
                include: Array.isArray(oneOfRule.include)
                  ? [...oneOfRule.include, libsPath]
                  : [oneOfRule.include, libsPath].filter(Boolean),
                exclude: oneOfRule.exclude
                  ?                     (filepath) => {
                      // Don't exclude libs/
                      if (filepath.includes('/libs/')) return false;
                      // Don't exclude @omnifex
                      if (filepath.includes('/@omnifex/')) return false;
                      // Use original exclude for everything else
                      if (typeof oneOfRule.exclude === 'function') {
                        return oneOfRule.exclude(filepath);
                      }
                      if (oneOfRule.exclude instanceof RegExp) {
                        return oneOfRule.exclude.test(filepath);
                      }
                      return false;
                    }
                  : /node_modules\/(?!@omnifex)/,
              };
            }
            return oneOfRule;
          }),
      };
    }
    return rule;
  });

  // Add webpack dev server configuration to suppress external errors
  if (config.devServer) {
    config.devServer.client = config.devServer.client || {};
    config.devServer.client.overlay = {
      errors: function(error) {
        // Hide errors from injected scripts
        if (error.message && error.message.includes('_0x')) {
          return false;
        }
        return true;
      },
      warnings: false,
      runtimeErrors: function(error) {
        // Hide runtime errors from injected scripts
        if (error.message && error.message.includes('_0x')) {
          return false;
        }
        return true;
      }
    };
  }

  return config;
};

