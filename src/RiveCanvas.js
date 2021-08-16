import { h,  ref, watchEffect, defineComponent } from 'vue-demi'
import { Rive, Layout, Fit, Alignment } from "rive-js";

export default defineComponent({
    name: "RiveCanvas",
    props: {
        // canvas
        canvasId: {
            type: String,
            required: true,
        },
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
    emits: ["load", "loaderror", "play", "pause", "loop", "stop"],
    setup(props, { emit }) {
        const canvas = ref()

        watchEffect(() => {
            // Rive instantiation
            if (canvas.value) {
                const rive = new Rive({
                    src: props.riveFileSrc,
                    canvas: canvas.value,
                    autoplay: props.autoplay,
                    layout: new Layout({
                        fit: props.layoutFit,
                        alignment: props.layoutAlignment,
                    }),
                    artboard: props.artboard,
                    animations: props.animations,
                });

                // Event wrapping
                rive.on("load", (ev) => {
                    emit("load", ev, rive);
                });

                rive.on("loaderror", (ev) => {
                    emit("loaderror", ev, rive);
                });

                rive.on("play", (ev) => {
                    emit("play", ev, rive);
                });

                rive.on("pause", (ev) => {
                    emit("pause", ev, rive);
                });

                rive.on("loop", (ev) => {
                    emit("loop", ev, rive);
                });

                rive.on("stop", (ev) => {
                    emit("stop", ev, rive);
                });
            }
        })

        return () => h('canvas', {
            ref: canvas,
            id: props.canvasId,
            with: props.canvasWidth,
            with: props.canvasHeight,
        })
    },
});