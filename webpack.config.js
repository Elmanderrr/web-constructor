const path = require('path');

module.exports = {
    entry: './app/bootstrap.js',
    output: {
        filename: 'build.min.js',
        path: path.resolve(__dirname, 'app/dist')
    }
};