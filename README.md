# vue-rive

> Warning: 
>
> This package actually depends on [rive-js v0.7.7](https://www.npmjs.com/package/rive-js/v/0.7.7) package.
>
> For the rive-js > v0.6.x versions you have to load a v7 format .riv file!

## Package installation

```
npm i vue-rive
```

## Simple Example

```
<template>
    <div>
        <rive-canvas
            canvas-id="my-canvas"
            :canvas-width="768"
            :canvas-height="768"
            rive-file-src="my_rive_v7_file_url.riv"
            :autoplay="true"
            layout-fit="cover"
            layout-alignment="center"
            artboard="home"
            :animations="['animation_1', 'animation_2']"
            @load="handleEvent"
            @loaderror="handleEvent"
            @play="handleEvent"
            @pause="handleEvent"
            @loop="handleEvent"
            @stop="handleEvent"
        />
        <button @click="riveInstance.play()">play</button>
        <button @click="riveInstance.pause()">pause</button>
        <button @click="riveInstance.stop()">stop</button>
        <button @click="riveInstance.play(['animation_1'])">first anim</button>
        <button @click="riveInstance.play(['animation_2'])">second anim</button>
    </div>
</template>

<script>
import RiveCanvas from "vue-rive";

export default {
    components: {
        RiveCanvas,
    },
    data() {
        return {
            riveInstance: null,
        };
    },
    mounted() {},
    methods: {
        handleEvent(ev, rive) {
            if (ev.type == "load") {
                this.riveInstance = rive;
            }
        },
    },
};
</script>

```

## Getting the instance
If you want to be able to control the animation you have to get the Rive Instance from the component.

The simplest way to achieve this is to get it from the load event (as in the example).

First bind an handler to load event 
```
@load="handleEvent"
```
Then store the instance reference to a variable
```
handleEvent(ev, rive) {
    if (ev.type == "load") {
        this.riveInstance = rive;
    }
}
```

## The event handler
The event handler for all component events is accepting two arguments **ev** and **rive**.
- **ev** contains the event type and other event informations.
- **rive** is the rive instance.

## Available Props
| Name | Type | Required | Default | Description |
| --- |:---:|:---:|:---:|:---:|
| canvas-id | **String** | yes | null | The **id** attribute for the HTML canvas |
| canvas-width | **Number** | yes | null | The HTML canvas **width** attribute |
| canvas-height | **Number** | yes | null | The HTML canvas **height** attribute |
| rive-file-src | **String** | yes | null | The **url** for the .riv file |
| autoplay | **Boolean** | no | false | If set to true animation will start at load |
| layout-fit | **String** | no | null | The Layout Fit. Accepted values are: 'cover', 'contain', 'Fill', 'fitWidth', 'fitHeight', 'none', 'scaleDown' |
| layout-alignment | **String** | no | null | The Layout alignment. Accepted values are: 'center', 'topLeft', 'topCenter', 'topRight', 'centerLeft', 'centerRight', 'bottomLeft', 'bottomCenter', 'bottomRight' |
| artboard | **String** | no | null | The selected artboard. If not specified it takes the last artboard of the .riv |
| animations | **Array** or **String** | no | null | The animation to play. If not specified it takes the first animation of the .riv |

## Available Events
| Name | Description |
| --- |:---:|
| load | fired when the Rive file is loaded and ready for playback |
| loaderror | fired if an error occurred while trying to load a Rive file |
| play | Rive has started playing an animation |
| pause | playback has been paused |
| loop | one of the playing animations has looped (LoopEvent) |
| stop | playback has stopped (when the animation completes if not a looping animation) |

## Available Properties of the Rive Instance
| Name | Description |
| --- |:---:|
| source | returns the source for the animation |
| animationNames | returns a list of animation names on the chosen (or default) artboard |
| playingAnimationNames | returns a list of animation names currently playing |
| pausedAnimationNames | returns a lists of paused animation names |
| isPlaying | are there any animations playing? |
| isPaused | are all animations paused? |
| isStopped | are all animation stopped? |