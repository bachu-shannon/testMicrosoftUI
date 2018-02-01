const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const devserver = require('./webpack/devserver');
const babel = require('./webpack/babel');
const sass = require('./webpack/sass');
const uglifyJS = require('./webpack/js.uglify');
const path = require('path');

const common = merge([
    {
        entry: ['./src/index.js', './src/sass/styles.scss'],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.[hash].js',
            publicPath: '/'
        },
        plugins: [
            new HtmlWebpackPlugin(
                {
                    template: path.resolve(__dirname, './index.html'),
                    filename: 'index.html'
                }
            ),
            new ExtractTextPlugin('styles-[name].css')
        ],
    },
    babel()
]);

module.exports = function (env) {
    if (env === 'production') {
        return merge([
            common,
            uglifyJS()
        ]);
    }
    if (env === 'development') {
        return merge([
            common,
            devserver(),
            sass()
        ])
    }
};
