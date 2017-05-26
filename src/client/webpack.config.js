var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');

var minify = process.argv.indexOf('--minify') !== -1;
if (minify) {
    debug = false;
}

module.exports = {
    context: path.join(__dirname, ""),
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./client.js",
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "autoprefixer", "sass"]
            },
            {
                test: /\.css$/,
                loaders: ["style", "css"]
            },
            {
                test: /\.json$/,
                loaders: ["json"]
            },
             {
                test: /\.svg$/,
                loaders: ["svg"]
            }
        ]
    },
    output: {
        path: "../public/",
        filename: "./js/client.min.js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false}),
    ],
};
