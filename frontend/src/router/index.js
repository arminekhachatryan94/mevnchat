import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/views/Login'
import Register from '@/components/views/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
