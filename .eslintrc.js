const { eslintConfig } = require('imba-config')

eslintConfig.rules['no-unused-vars'] = 'off'
eslintConfig.rules['@typescript-eslint/no-unused-vars'] = 'off'
eslintConfig.rules['antfu/top-level-function'] = 'off'
eslintConfig.rules['@typescript-eslint/member-delimiter-style'] = 'off'
eslintConfig.rules['import/newline-after-import'] = 'off'
// console.log('%c [ eslintConfig ]-4', 'font-size:14px; background:#41b883; color:#ffffff;', eslintConfig)
module.exports = eslintConfig
