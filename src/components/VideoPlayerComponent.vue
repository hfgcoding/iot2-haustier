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
            //CHANGEME: hier (vorerst) lokale IP-Adresse des Pi eintragen!
            default: "http://192.168.1.100:8080/stream.mjpg"
        }
    }
}
</script>

<style>
    
</style>