## How To Run

Install required packages:

`$ yarn install`

Build `shared` bundle:

`$ npx webpack`

Open `shared.html` page to check that **only** specific entrypoints (and their dependencies) are executed, see console messages:

```
Module C is executed
Module B is executed
```

