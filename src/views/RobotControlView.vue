<template>
  <div id="mainview">
    <h2>Live Feed</h2>
    <VideoPlayer></VideoPlayer>

    <br/>

    <h2>Controls</h2>
    <Controls></Controls>
  </div>
</template>

<script>
import Controls from "../components/ControlsComponent";
import VideoPlayer from "../components/VideoPlayerComponent";

export default {
    components: {
        VideoPlayer,
        Controls
    }
}
</script>

<style>

</style>