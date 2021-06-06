import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Football from '../views/Football.vue'
import League from '../views/League'
import YearList from '../views/YearList'
import Team from '../views/Team'

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
    path: '/:league',
    component: League,
    children: [
      {
        path: 'year',
        component: YearList
      },
      {
        path: 'team',
        component: Team
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
