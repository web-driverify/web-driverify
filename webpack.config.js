var webpack = require('webpack');
var isDev = process.env.NODE_ENV !== 'production';

var config = {
    devtool: isDev && '#source-map',
    entry: {
        index: './src/proxy/assets/index.js'
    },
    output: {
        path: './src/proxy/assets',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: "babel-loader?presets[]=es2015"
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            ENV: JSON.stringify(process.env.NODE_ENV)
        })
    ]
};

if (!isDev) {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            sourceMap: false
        })
    );
}

module.exports = config;
