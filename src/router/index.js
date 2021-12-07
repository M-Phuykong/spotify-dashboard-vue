import Vue from 'vue'
import VueRouter from 'vue-router'
import Authentication from '../views/Authentication.vue'
import Home from '../views/Home.vue'
import Track from '../views/Track.vue'
import Artist from '../views/Artist.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Authentication',
    component: Authentication
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/artist',
    name: 'artist',
    component: Artist
  },
  {
    path: '/track',
    name: 'track',
    component: Track
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
