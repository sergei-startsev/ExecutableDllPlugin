## How To Run

Install required packages:

`$ yarn install`

Build `shared` bundle:

`$ npx webpack --config=webpack.shared.config.js`

Build `main` bundle:

`$ npx webpack --config=webpack.config.js`

Open `shared.html` page to check that modules included to `_shared-bundle.js` are actually executed, see console messages:

```
Module B is executed
Module A is executed
Shared is executed
```

Open `main.html` page to check that modules included to both `_shared-bundle.js` and `_main-bundle.js` are executed **only once** (module `B.js` is imported in both), see console messages:

```
Module B is executed
Module A is executed
Shared is executed
Module C is executed
Main is executed
```

