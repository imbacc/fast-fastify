const { eslintConfig } = require('imba-config')

eslintConfig.rules['no-unused-vars'] = 'off'
eslintConfig.rules['@typescript-eslint/no-unused-vars'] = 'off'
// console.log('%c [ eslintConfig ]-4', 'font-size:14px; background:#41b883; color:#ffffff;', eslintConfig)
module.exports = eslintConfig
