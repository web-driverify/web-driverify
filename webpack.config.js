var webpack = require('webpack')
var path = require('path')
var isDev = process.env.NODE_ENV !== 'production'

var config = {
  devtool: isDev && '#source-map',
  entry: {
    index: path.join(__dirname, '/src/proxy/assets/index.js')
  },
  output: {
    path: path.join(__dirname, '/src/proxy/assets'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['env']
        },
        exclude: [
          path.join(__dirname, 'node_modules')
        ]
      }
    ],
    noParse: [
      /(jquery|lodash|es6-promise)/
    ]
  },
  resolve: {
    alias: {
      'jquery': 'jquery/dist/jquery.min.js',
      'es6-promise': 'es6-promise/dist/es6-promise.min.js',
      'lodash': 'lodash/lodash.min.js',
      'http': path.join(__dirname, '/src/proxy/assets/utils/http.js')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify(process.env.NODE_ENV)
    })
  ]
}

if (!isDev) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      sourceMap: false
    })
  )
}

module.exports = config
