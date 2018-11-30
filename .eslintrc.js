module.exports = {
  root: true,
  extends: ['eslint:recommended'],
  env: {
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 2017
  },
  rules: {
    'brace-style': 'error',
    'comma-dangle': 'error',
    'no-caller': 'error',
    'no-extra-bind': 'error',
    'no-extra-semi': 'error',
    'no-process-exit': 'error',
    'no-template-curly-in-string': 'error',
    'no-undef': 'error',
    'no-unsafe-negation': 'error',
    'no-unused-vars': ['error', { args: 'none' }],
    eqeqeq: 'error',
    yoda: 'error',
    indent: 'off',
    'valid-jsdoc': [
      'error',
      {
        prefer: {
          return: 'returns'
        },
        preferType: {
          '*': 'any'
        },
        requireReturnType: true
      }
    ]
  }
};
