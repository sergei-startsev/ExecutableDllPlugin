# ExecutableDllPlugin

## Install

Install with `yarn`:

`yarn add executable-dll-plugin --dev`

With `npm`:

`npm install executable-dll-plugin --save-dev`

## Motivation

[DllPlugin](https://webpack.js.org/plugins/dll-plugin/) webpack plugin cannot be configured to meet both requirements: a) bundle shared modules and b) run these modules. That is, it is impossible for a DllPlugin bundle to execute code when it is imported via a script tag into the page.

`ExecutableDllPlugin` allows you to execute an entrypoint module(s) included to a DllPlugin bundle.

## API

Add `ExecutableDllPlugin` to webpack configuration next to `DllPlugin`:

```diff
+ const ExecutableDllPlugin = require('executable-dll-plugin');
//...
output: {
  //...
  library: 'MyLibrary'
},
plugins: [
  new DllPlugin({
    name: 'MyLibrary',
    path: path.join(__dirname, 'manifest.json')
  }),
+ new ExecutableDllPlugin()
]
```

By default all entry modules are run, if you would like to execute a particular entrypoint(s), you could specify it via plugin options:

```js
new ExecutableDllPlugin({
  execute: [path.resolve(__dirname, './src/A.js')]
})
```

## How it works

The idea is to call `__webpack_require__` for each `entry` during webpack bootstrapping, e.g.:

```js
['0','./src/A.js','./src/B.js','./src/C.js'].forEach(__webpack_require__);
```

## Execution Order
If your modules are sensitive to execution order, you might want to use [optimization.moduleIds](https://webpack.js.org/configuration/optimization/#optimization-moduleids) webpack option to produce a stable call order for both `dev` and `prod` modes.

```diff
+ const ExecutableDllPlugin = require('executable-dll-plugin');
//...
output: {
  //...
  library: 'MyLibrary'
},
+ optimization: { moduleIds: 'natural' },
plugins: [
  new DllPlugin({
    name: 'MyLibrary',
    path: path.join(__dirname, 'manifest.json')
  }),
+ new ExecutableDllPlugin()
]
```

## License
[MIT](https://opensource.org/licenses/MIT)