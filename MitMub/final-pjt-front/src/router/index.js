import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUpView from '@/views/accounts/SignUpView'
import LoginView from '@/views/accounts/LoginView'
import HomeView from '@/views/movies/HomeView'
import DetailView from '@/views/movies/DetailView'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/detail',
    name: 'DetailView',
    component: DetailView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
