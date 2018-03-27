const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'build.min.js',
        path: path.resolve(__dirname, 'app/dist')
    }
};