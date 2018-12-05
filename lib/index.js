/**
 * @file ExecutableDllPlugin allows to execute DllPlugin bundle when it is imported via a script tag into the page
 */

module.exports = class ExecutableDllPlugin {
  constructor(options) {
    this.options = options || {};
    this.name = 'ExecutableDllPlugin';
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(this.name, compilation => {
      compilation.mainTemplate.hooks.startup.tap(this.name, (source, chunk) => {
        const requireFn = compilation.mainTemplate.requireFn;
        const filterChunkModules = m => {
          const execute = this.options.execute;
          if (execute) {
            return execute.includes(m.id);
          }
          return true;
        };
        const ids = [...chunk.modulesIterable]
          .filter(filterChunkModules)
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
