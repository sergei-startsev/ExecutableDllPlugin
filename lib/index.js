/**
 * @file ExecutableDllPlugin allows to execute DllPlugin bundle when it is imported via a script tag into the page
 */

module.exports = class ExecutableDllPlugin {
  constructor(options) {
    const defaultOptions = {
      filter: () => true
    };
    this.options = Object.assign({}, defaultOptions, options);
    this.name = 'ExecutableDllPlugin';
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(this.name, compilation => {
      compilation.mainTemplate.hooks.startup.tap(this.name, (source, chunk) => {
        const requireFn = compilation.mainTemplate.requireFn;
        const { execute, filter: customFilter } = this.options;
        const filterChunkModules = m => {
          if (execute) {
            return execute.includes(m.identifier());
          }
          return true;
        };
        const ids = [...chunk.modulesIterable]
          .filter(filterChunkModules)
          .filter(customFilter)
          .map(m => `'${m.id}'`)
          .join(',');

        if (ids.length) {
          return `[${ids}].forEach(${requireFn});\n\n` + source;
        }

        return source;
      });
    });
  }
};
