const HMR = require('fastify-webpack-hmr')
const webpack = require('webpack')
const config = require('../webpack.config')
// const webpackDev = { publicPath: '/dist' }

module.exports = (fastify) => {
	fastify.register(HMR, { config })
}