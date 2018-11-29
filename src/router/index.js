import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component:() => import('@/views/Login')
    },
    {
      path: '/lk',
      name: 'Lk',
      component:() => import('@/views/Lk')
    },
  ]
})
