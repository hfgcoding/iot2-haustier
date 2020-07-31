import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
import router from './router'

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
    debug: false,
    connection: 'https://hal.hfg.design:10000/', //WICHTIG: Hier nach dem Slash den Namen eures Bots angeben (wie auf dem Pi festgelegt)
    options: {
      useConnectionNamespace: true
    }
}))

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
