const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: ['./index'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle1.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.vue$/, loader: 'vue' }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
}
