const { antfu } = require('@antfu/eslint-config')
const { eslintConfig, ignoresConfig } = require('imba-config')

ignoresConfig.push('rust-package')
module.exports = antfu({
  typescript: true,
  vue: false,

  // Disable jsonc and yaml support
  jsonc: false,
  yaml: false,
  ignores: ignoresConfig,
}, {
  rules: eslintConfig,
  ignores: ignoresConfig,
})
