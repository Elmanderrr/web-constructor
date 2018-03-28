const path = require('path');

module.exports = {
    entry: './app/bootstrap.js',
    output: {
        filename: 'build.min.js',
        path: path.resolve(__dirname, 'app/dist')
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test : /\.js$/,
                loader : 'babel-loader',
                exclude : [/node_modules/],
                query : {
                    presets : ['es2015']
                }
            }
        ]
    }
};