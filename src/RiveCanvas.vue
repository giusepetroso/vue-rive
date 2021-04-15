<template>
    <canvas
        ref="canvas"
        :id="canvasId"
        :width="canvasWidth"
        :height="canvasHeight"
    ></canvas>
</template>

<script>
import { Rive, Layout, Fit, Alignment } from "rive-js";

export default {
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
    data() {
        return {
            // rive instance
            rive: Object,
        };
    },
    beforeMount() {
        // controller events
        this.$on("play", this.play);
        this.$on("pause", this.pause);
        this.$on("stop", this.stop);
        this.$on("changeArtboard", this.requestArtboardChange);
        this.$on("changeAnimation", this.requestAnimationChange);
    },
    beforeDestroy() {
        // dispose event handlers
        this.$off();
    },
    mounted() {
        const self = this;

        // Rive instantiation
        this.rive = new Rive({
            src: this.riveFileSrc,
            canvas: this.$refs.canvas,
            autoplay: this.autoplay,
            layout: new Layout({
                fit: this.layoutFit,
                alignment: this.layoutAlignment,
            }),
            artboard: this.artboard,
            animations: this.animations,
        });

        // Event wrapping
        this.rive.on("load", (ev) => {
            self.$emit("load", ev, self.rive);
        });

        this.rive.on("loaderror", (ev) => {
            self.$emit("loaderror", ev, self.rive);
        });

        this.rive.on("play", (ev) => {
            self.$emit("play", ev, self.rive);
        });

        this.rive.on("pause", (ev) => {
            self.$emit("pause", ev, self.rive);
        });

        this.rive.on("loop", (ev) => {
            self.$emit("loop", ev, self.rive);
        });

        this.rive.on("stop", (ev) => {
            self.$emit("stop", ev, self.rive);
        });
    },
};
</script>