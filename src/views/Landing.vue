<template>
    <div class="mc_container">
            <div v-if="clientsAsArray.length == 0">Leider keine Roboter online :(</div>
            <div v-for="(item, index) in clientsAsArray" v-bind:key="index" class="minicard">
                <a :href="mapFrontendURL(item[0])" target="_blank">
                    <div class="mini_thumb">
                        <img :src="'http://hal.hfg.design:50005/still-'+item[1].port+'.jpg?v='+imgRand" class="still_thumb">
                    </div>
                    <div class="contents">
                        <span style="font-weight:bold">{{mapName(item[0])}}</span><br/>
                        <span>{{mapName(item[1].queue.length)}} Person(en) warten</span>
                    </div>
                    <div class="overlay">Live steuern &gt;&gt;</div>
                </a>
            </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            setInterval(() => {
                this.imgRand = Math.random().toString().substr(2,10);
            }, 5000);
        },
        sockets: {
            connect: function () {
                console.log('socket connected')
                this.$socket.emit("getServerStats");
                this.$socket.emit("getClientStats");
                this.connected = true;
            },
            disconnect: function () {
                console.log('socket disconnected')
                this.connected = false;
            },
            clientStats: function (data) {
                //console.log("CLIENT STAT:" + data);
                this.clientData = JSON.parse(data);
                Object.keys(this.clientData).forEach((item) => {
                    console.log(item);
                    if(this.whitelist.indexOf(item) == -1) {
                        delete this.clientData[item];
                    }
                });
                console.log(this.clientsAsArray);
            },
            nsp_list: function (data) {
                console.log("NSPs:" + data);
            },
        },
        data: function () {
            return {
                connected: false,
                clientData: {},
                imgRand: "initial",
                whitelist: ["lisabot_control","tarsbot_control","marcbot_control","linnbot_control"]
            }
        },
        methods: {
            mapName: function(inname) {
                switch(inname) {
                    case "lisabot_control":
                        return "Linefollower";
                    case "tarsbot_control":
                        return "Spidercam 2D";
                    case "marcbot_control":
                        return "Gartenbot";
                    case "linnbot_control":
                        return "Kameraslider-Bot";
                    default:
                        return inname;
                }
            },
            mapFrontendURL: function(inname) {
                switch(inname) {
                    case "lisabot_control":
                        return "https://master.d3oap6hbnnv24f.amplifyapp.com/";
                    case "tarsbot_control":
                        return "https://master.d13kt0ieexnpov.amplifyapp.com/";
                    case "marcbot_control":
                        return "https://master.d2um57wk9lhggc.amplifyapp.com/";
                    case "linnbot_control":
                        return "https://master.d3pweseaqhnk54.amplifyapp.com/";
                    default:
                        return "#";
                }
            }
        },
        computed: {
            clientsAsArray() {
                if(this.clientData == undefined || this.clientData == null) return [];
                return Object.entries(this.clientData)
            }
        }
    }
</script>

<style>
    .mc_container {
        text-align: left;
    }

    .minicard {
        display: inline-block;
        margin:1%;
        background-color: black;
        color:white;
        font-family: 'Courier New', Courier, monospace;
        width:40%;
        height:60px;
    }

    .mini_thumb {
        display:inline-block;
        position: relative;
        width: 20%;
        height: 0;
        padding-bottom: 20%;
        margin-right:10px;
        background-color: gray;
        border:0px;
    }
    .contents {
        display: inline-block;
        position:absolute;
        margin-top:5px;
        height:60px;
        overflow: hidden;
    }

    .still_thumb {
        max-width: 60px;
        width:60px;
        height:60px;
        max-height: 60px;
        object-fit: cover;
    }

    .overlay {
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        visibility: hidden;
        background-color: rgba(255,255,255,0.9);
        color: white;
        font-weight:bold;
    }

    .mc_container a {
        color: white;
    }

</style>