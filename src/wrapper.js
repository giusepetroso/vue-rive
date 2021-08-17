// Import vue component
import { install as vue2Install } from 'vue-demi'
import component from './RiveCanvas.js'

// Declare install function executed by Vue.use()
export function install(Vue) {
  if (install.installed) return
  install.installed = true
  vue2Install()
  Vue.component('RiveCanvas', component)
}

// Create module definition for Vue.use()
const plugin = {
  install,
}

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}

// To allow use as module (npm/webpack/etc.) export component
export default component
