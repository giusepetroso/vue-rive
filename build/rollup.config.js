import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'
export default {
  input: 'src/wrapper.js', // Path relative to package.json
  output: {
    name: 'RiveCanvas',
    exports: 'named',
  },
  plugins: [commonjs(), vue()],
  external: ['rive-canvas', 'vue-demi', 'rive-js'],
}
