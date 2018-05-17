import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Messages from '@/views/Messages'
import Conversation from '@/views/Conversation'
import Compose from '@/views/Compose'
import Error from '@/views/Error'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
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
    },
    {
      path: '/messages',
      name: 'Messages',
      component: Messages
    },
    {
      path: '/messages/:username',
      name: 'Conversation',
      component: Conversation
    },
    {
      path: '/compose',
      name: 'Compose',
      component: Compose
    },
    {
      path: '*',
      name: 'Error',
      component: Error
    }
  ]
})
