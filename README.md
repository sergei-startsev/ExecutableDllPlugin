# ExecutableDllPlugin

## Install

`$ npm install ExecutableDllPlugin`

## Motivation

[DllPlugin](https://webpack.js.org/plugins/dll-plugin/) cannot be configured to meet both requirements: a) bundle shared modules and b) run these modules. That is, it is impossible for a DllPlugin bundle to execute code when it is imported via a script tag into the page.

`ExecutableDllPlugin` allows you to execute an entrypoint module(s) included to a DllPlugin bundle.

## API

Add `ExecutableDLLPlugin` to webpack configuration next to `DllPlugin`:

```diff
output: {
  //...
  library: 'MyLibrary'
},
plugins: [
  new DllPlugin({
    name: 'MyLibrary',
    path: path.join(__dirname, 'manifest.json')
  }),
+ new ExecutableDLLPlugin()
]
```

By default all entry modules are run, if you would like to execute a particular entrypoint(s), you could specify it via plugin options:

```js
new ExecutableDLLPlugin({
  execute: ['./src/A.js']
})
```

## How it works

The idea is to call `__webpack_require__` for each `entry` during webpack bootstrapping, e.g.:

```js
['0','./src/A.js','./src/B.js','./src/C.js'].forEach(__webpack_require__);
```

## License
[MIT](https://opensource.org/licenses/MIT)