<template>
  <div id="videocontainer">
      <img :src="srcurl"/>
  </div>
</template>

<script>
export default {
    props: {
        srcurl: {
            type: String,
            default: "http://63.32.119.241:10000/index-lab.jpg"
        }
    }
}
</script>

<style>
    
</style>