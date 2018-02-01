const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
    filename: 'main.css'
});

module.exports = function () {
    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: extractPlugin.extract({
                        use: ['css-loader', 'sass-loader']
                    })
                }
            ]
        },
        plugins: [
            extractPlugin
        ]
    }
};