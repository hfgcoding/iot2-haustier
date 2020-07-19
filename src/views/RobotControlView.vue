<template>
  <div id="mainview">
    <h2>Live Feed</h2>
    <hr/>
    <slot name="videocomponent"></slot>
    <hr/>
    <br/>

    <h2>Controls</h2>
    <hr/>
    <slot name="controlcomponent"></slot>
  </div>
</template>

<script>

</script>

<style>
  #mainview {
    max-width: 1200px;
    margin-left:auto;
    margin-right: auto;
  }
</style>