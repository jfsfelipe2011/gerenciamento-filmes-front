import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Films from '../views/Film'
import Description from '../views/Description'
import User from '../views/User'
import UserCreate from '../views/UserCreate'

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
  },
  {
    path: '/user',
    name: 'user',
    component: User
  },
  {
    path: '/user/create/:document',
    name: 'userCreate',
    component: UserCreate
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
