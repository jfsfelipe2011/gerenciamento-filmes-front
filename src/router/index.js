import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Films from '../views/Film'
import Description from '../views/Description'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/films/:categoryId',
    name: 'films',
    component: Films
  },
  {
    path: '/description/:filmId',
    name: 'description',
    component: Description
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
