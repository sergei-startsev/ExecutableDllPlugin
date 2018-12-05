const path = require('path');
const webpack = require('webpack');
const ExecutableDllPlugin = require('../../lib');

module.exports = {
  mode: 'development',
  entry: ['./src/_shared-bundle.js'],
  output: {
    filename: '_shared-bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'MyLibrary'
  },
  plugins: [
    new webpack.DllPlugin({
      name: 'MyLibrary',
      path: path.join(__dirname, 'dist', 'manifest.json')
    }),
    new ExecutableDllPlugin({
      execute: [path.resolve(__dirname, './src/B.js')]
    })
  ]
};
