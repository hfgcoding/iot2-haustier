<template>
    <div id="controlscontainer">
        <div>Status: {{connected}}</div>
        <button v-on:click="buttonClick(1)">Position 1</button>
        <button v-on:click="buttonClick(2)">Position 2</button>
        <button v-on:click="buttonClick(3)">Position 3</button><br>
    </div>
</template>

<script>


export default {
    methods: {
        buttonClick: function(preset) {
            console.log("Click button "+preset);
            this.$socket.emit('preset', preset);
        }
    },
    sockets: {
        connect: function () {
            console.log('socket connected')
            this.connected = "Connected"
            this.$socket.emit("register_front")
        },
        disconnect: function () {
            console.log('socket disconnected')
            this.connected = "Disonnected"
        },
        nsp_list: function(data) {
            console.log("NSPs:"+data);
        }
    },
    data: function() {
        return {
            connected: "Disconnected"
        }
    }
}
</script>

<style>

</style>