<template>
    <b-container class="container_def">
        <b-row class="mb-4">
            <b-col>
                <h2>Server-Status</h2>
            </b-col>
        </b-row>
        <b-row style="background-color:#efefef" class="pt-3">
            <b-col>
                <p>CPU</p>
                <p>Speicher</p>
                <p>Netzwerk</p>
                <p>Prozesse</p>
            </b-col>
            <b-col cols="9">
                <p><strong>Ø CPU: </strong>{{(stats.load.avgload*100).toFixed(2)}} % | <strong>Current CPU:
                    </strong>{{stats.load.currentload.toFixed(2)}} % | <strong>Idle:
                    </strong>{{stats.load.currentload_idle.toFixed(2)}} % </p>
                <p><strong>Total: </strong>{{(stats.mem.total/1024/1024).toFixed(2)}} MB | <strong>Used:
                    </strong>{{(stats.mem.used/1024/1024).toFixed(2)}} MB | <strong>% used:
                    </strong>{{((stats.mem.used/stats.mem.total)*100).toFixed(2)}} % </p>
                <p><strong>Empfangen / sec: </strong>{{(stats.net[1].rx_sec/1024/1024).toFixed(2)}} MBit |
                    <strong>Senden / sec: </strong>{{(stats.net[1].tx_sec/1024/1024).toFixed(2)}} MBit</p>
                <p><strong><a v-b-toggle.collapse-1>{{stats.proc.all}} Prozesse (klicken zum aufklappen)</a></strong>
                </p>
                <b-collapse id="collapse-1" class="mt-2">
                    <ul>
                        <li v-for="proc in stats.proc.list" v-bind:key="proc.pid">
                            {{proc.name}} ({{proc.command}})
                        </li>
                    </ul>
                </b-collapse>
            </b-col>
        </b-row>
        <b-row class="mb-4 mt-5">
            <b-col>
                <h2>Bot-Status - welche Bots sind online?</h2>
            </b-col>
        </b-row>
        <b-row class="mb-4 mt-5">
            <b-col>
                <strong>Im Moment aktiv (klicken um zu den Details zu gelangen):</strong>
                <ul>
                    <li v-for="(client, key) in clientData" v-bind:key="client.socket">
                        <a :href="'#'+key">{{key}}</a>
                    </li>
                </ul>
            </b-col>
        </b-row>
        <b-row class="mb-4 pb-3 pt-3 mt-5" v-for="(client, key) in clientData" v-bind:key="client.socket"
            style="background-color:#efefef;">
            <b-col>
                <a :name="key" />
                <h3>{{key}}</h3>
                <hr />
                <b-row>
                    <b-col cols="3">
                        <img :src="'http://hal.hfg.design:50005/still-'+client.port+'.jpg'" class="still_thumb">
                    </b-col>
                    <b-col>
                        <table class="inline_table">
                            <tr>
                                <td width="200"><strong>Bot Socket ID</strong></td>
                                <td>{{client.socket}}</td>
                            </tr>
                            <tr>
                                <td><strong>Internal (Pi) Cam Port</strong></td>
                                <td>{{client.port}}</td>
                            </tr>
                            <tr>
                                <td><strong>Public Cam Feed</strong></td>
                                <td>http://hal.hfg.design:50005/live-{{client.port}}.mjpg</td>
                            </tr>
                            <tr>
                                <td><strong>Public Cam Stills</strong></td>
                                <td><a
                                        :href="'http://hal.hfg.design:50005/still-'+client.port+'.jpg'">http://hal.hfg.design:50005/still-{{client.port}}.jpg</a>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Externer SSH</strong></td>
                                <td>
                                    <pre>ssh pi@hal.hfg.design -p 5{{client.port.substr(1,2)}}22</pre>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Queue Frontends</strong></td>
                                <td>
                                    <ul>
                                        <li v-for="fc in client.queue" v-bind:key="fc.id">
                                            {{fc.name}} (<small>{{fc.id}}</small>)
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><strong>Rohdaten</strong></td>
                                <td>
                                    <b-button :v-b-toggle="'collapse-'+key" variant="secondary" size="sm">Ausklappen</b-button>
                                    <b-collapse :id="'collapse-'+key" class="mt-2">
                                        <b-card>
                                            <small style="color:gray">{{client}}</small>
                                        </b-card>
                                    </b-collapse>
                                </td>
                            </tr>
                        </table>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        mounted() {

        },
        methods: {
            compareProcs: function (a, b) {
                let comparison = 0;
                if (a.pcpu > b.pcpu) {
                    comparison = -1;
                } else if (a.pcpu < b.pcpu) {
                    comparison = 1;
                }
                return comparison;
            }
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
            },
            nsp_list: function (data) {
                console.log("NSPs:" + data);
            },
            serverStats_mem: function (stats) {
                //console.log(stats)
                this.stats.mem = stats;
            },
            serverStats_proc: function (stats) {
                //console.log(stats)
                this.stats.proc = stats;
                this.stats.proc.list = stats.list.sort(this.compareProcs);
            },
            serverStats_load: function (stats) {
                //console.log(stats)
                this.stats.load = stats;
            },
            serverStats_net: function (stats) {
                //console.log(stats)
                this.stats.net = stats;
            },
        },
        data: function () {
            return {
                connected: false,
                stats: {
                    mem: {},
                    proc: {},
                    load: {},
                    net: [{},{}]
                },
                clientData: {}
            }
        },
        computed: {

        }
    }
</script>

<style scoped>
    .container_def {
        text-align: left;
        vertical-align: top;
    }

    .still_thumb {
        width:200px;
        min-height: 150px;
        border: 1px solid black;
        vertical-align: top;
    }

    .inline_table {
        display: inline-block;
    }

    pre {
        background-color: lightgray;
        color: darkgoldenrod;
    }

    td {
        vertical-align: top;
    }
</style>