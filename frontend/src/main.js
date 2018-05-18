// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSession from 'vue-session'
import Vuex from 'vuex'
import VueChatScroll from 'vue-chat-scroll'
import VueSocketio from 'vue-socket.io'

Vue.use(VueSession)
Vue.use(Vuex)
Vue.use(VueChatScroll)
Vue.use(VueSocketio, 'http://localhost:3000')

const store = new Vuex.Store({
  state: {
    auth: false,
    username: 'hi'
  },
  mutations: {
    logout (state) {
      state.auth = false;
      state.username = '';
    },
    login (state, username) {
      state.auth = true;
      state.username = username;
    }
  }
});

Vue.prototype.$eventHub = new Vue() // Global event bus

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store: store
})
