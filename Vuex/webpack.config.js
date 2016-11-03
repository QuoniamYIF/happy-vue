const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: ['./count_3/app.js'],
  output: {
    path: path.join(__dirname, 'count_3/dist'),
    filename: 'bundle.js'
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
