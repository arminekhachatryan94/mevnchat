// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueSession from 'vue-session'
Vue.use(VueSession)

import VueSocketio from 'vue-socket.io'
Vue.use(VueSocketio, 'http://localhost:3000')

Vue.config.productionTip = false

Vue.prototype.$eventHub = new Vue(); // Global event bus

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
