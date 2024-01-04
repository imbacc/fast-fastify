const { eslintConfig } = require('imba-config')
eslintConfig.rules['no-unused-vars'] = 'off'
eslintConfig.rules['unused-imports/no-unused-imports'] = 'off'
eslintConfig.rules['@typescript-eslint/no-unused-vars'] = 'off'
eslintConfig.rules['antfu/top-level-function'] = 'off'
eslintConfig.rules['@typescript-eslint/member-delimiter-style'] = 'off'
eslintConfig.rules['import/newline-after-import'] = 'off'
module.exports = eslintConfig
