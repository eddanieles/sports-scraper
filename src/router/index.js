import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Football from '../views/Football.vue'
import Basketball from '../views/Basketball'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/football',
    name: 'Football',
    component: Football
  },
  {
    path: '/basketball',
    name: 'Basketball',
    component: Basketball
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
