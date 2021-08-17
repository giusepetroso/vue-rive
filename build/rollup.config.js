import commonjs from "@rollup/plugin-commonjs";
import vue from "rollup-plugin-vue";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
export default {
  input: "src/wrapper.js", // Path relative to package.json
  output: {
    name: "RiveCanvas",
    exports: "named",
  },
  plugins: [
    commonjs(),
    vue({
      css: true, // Dynamically inject css as a <style> tag
      compileTemplate: true, // Explicitly convert template to render function
    }),
    resolve(),
    babel({ babelHelpers: "bundled" }),
  ],
  external: ["rive-js"]
};
