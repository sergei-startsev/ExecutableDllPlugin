const path = require('path');
const webpack = require('webpack');
const ExecutableDllPlugin = require('../../lib');

// executes only module B.js and its dependencies
const executableModules = [path.resolve(__dirname, './src/B.js')];

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
      filter: m => executableModules.includes(m.identifier())
    })
    // or use `execute` option:
    // new ExecutableDllPlugin({
    //   execute: [path.resolve(__dirname, './src/B.js')]
    // })
  ]
};
