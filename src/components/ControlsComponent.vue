<template>
    <div id="controlscontainer">
        <h4>Connected: {{connected}}</h4>
        <div id="queue">
            <h4>Current Queue (own ID: {{ownId}})</h4>
            <ul>
                <li v-for="w in currentQueue" :key="w">{{w}}</li>
            </ul>
        </div>
        <hr>
        <h4>Presets</h4>
        <button v-on:click="lichtAnschalten()" :disabled="!connected">Licht An</button>
        <button v-on:click="lichtAusschalten()" :disabled="!connected">Licht Aus</button>
        <button v-on:click="buttonClick(3)" :disabled="!connected">Position 3</button><br>
    </div>
</template>

<script>
    export default {
        methods: {
            //CHANGEME: die Namen der Nachrichten die ihr mit emit() verschickt müssen mit dem Backend matchen
            buttonClick: function (preset) {
                console.log("Click button " + preset);
                this.$socket.emit('preset', preset);
            },
            lichtAnschalten: function () {
                this.$socket.emit('lightOn');
            },
            lichtAusschalten: function () {
                this.$socket.emit('lightOff');
            }
        },
        sockets: {
            connect: function () {
                console.log('socket connected')
                this.connected = true;
                this.ownId = this.$socket.id
                this.$socket.emit("register_front")
            },
            disconnect: function () {
                console.log('socket disconnected')
                this.connected = false;
            },
            //CHANGEME: die Namen der Nachrichten hier reinkommen müssen mit dem Backend matchen (Funktionsname = Nachrichtenname)
            nsp_list: function (data) {
                console.log("NSPs:" + data);
            },
            update_queue: function (data) {
                this.currentQueue = data;
            }
        },
        data: function () {
            return {
                connected: false,
                currentQueue: [],
                ownId: "undefined"
            }
        }
    }
</script>

<style>

</style>