const { join } = require('path')
const hotConf = 'webpack-hot-middleware/client?path=/__webpack_hmr'
// let externals = _externals()

module.exports = {
	mode: 'development',
	target: 'node',
	entry: [join(__dirname, 'index.js'), hotConf],
	output: {
		path: './build',
		filename: '[name].js'
	},
	resolve: {
		extensions: ['', '.js']
	},
	// externals: externals,
	node: {
		console: true,
		global: true,
		process: true,
		Buffer: true,
		__filename: true,
		__dirname: true,
		setImmediate: true
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel',
			query: {
				presets: ['es2015', 'stage-0']
			},
			exclude: /node_modules/
		}]
	},
}

