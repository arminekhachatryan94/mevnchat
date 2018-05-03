import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/views/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/'
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
