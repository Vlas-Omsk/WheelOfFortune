import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Wheel from '@/views/Wheel'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Wheel
    }
  ]
})