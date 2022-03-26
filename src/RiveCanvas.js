import { h, ref, watchEffect, defineComponent, unref } from 'vue'
import { Rive, Layout, Fit, Alignment } from 'rive-js'

export default defineComponent({
  name: 'RiveCanvas',
  props: {
    // canvas
    canvasWidth: {
      type: Number,
      required: true,
    },
    canvasHeight: {
      type: Number,
      required: true,
    },

    // file
    riveFileSrc: {
      type: String,
      required: true,
    },

    // options
    autoplay: Boolean,

    // layout
    layoutFit: Fit,
    layoutAlignment: Alignment,

    // artboard
    artboard: String,

    // animations
    animations: Array | String,
  },
  emits: ['load', 'loaderror', 'play', 'pause', 'loop', 'stop'],
  setup(props, { emit, expose }) {
    const canvas = ref(null)
    // const riveInstance = ref(null)
    let rive = null

    watchEffect(() => {
      // Rive instantiation
      if (canvas.value) {
        // const rive = new Rive({
        rive = new Rive({
          src: props.riveFileSrc,
          canvas: canvas.value,
          autoplay: props.autoplay,
          layout: new Layout({
            fit: props.layoutFit,
            alignment: props.layoutAlignment,
          }),
          artboard: props.artboard,
          animations: props.animations,
        })
        // riveInstance.value = rive

        // Event wrapping
        rive.on('load', (ev) => {
          emit('load', ev, rive)
        })

        rive.on('loaderror', (ev) => {
          emit('loaderror', ev, rive)
        })

        rive.on('play', (ev) => {
          emit('play', ev, rive)
        })

        rive.on('pause', (ev) => {
          emit('pause', ev, rive)
        })

        rive.on('loop', (ev) => {
          emit('loop', ev, rive)
        })

        rive.on('stop', (ev) => {
          emit('stop', ev, rive)
        })
      }
    })

    function getInstance() {
      //   return unref(riveInstance)
      return rive
    }

    expose({ getInstance })

    return () =>
      h('canvas', {
        ref: canvas,
        width: props.canvasWidth,
        height: props.canvasHeight,
      })
  },
})
