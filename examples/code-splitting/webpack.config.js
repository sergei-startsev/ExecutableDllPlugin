const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: ['./src/_main-bundle.js'],
  output: {
    filename: '_main-bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./dist/manifest.json')
    })
  ]
};
