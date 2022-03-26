import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'
export default {
  input: 'src/wrapper.js', // Path relative to package.json
  output: {
    name: 'RiveCanvas',
    exports: 'named',
    globals: {
      vue: 'vue',
      'vue-demi': 'vueDemi',
      'rive-js': 'riveJs',
    },
  },
  plugins: [commonjs(), vue()],
  external: ['rive-canvas', 'vue', 'vue-demi', 'rive-js'],
}
