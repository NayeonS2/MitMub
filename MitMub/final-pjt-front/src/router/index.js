import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUpView from '@/views/accounts/SignUpView'
import LogInView from '@/views/accounts/LogInView'
import HomeView from '@/views/movies/HomeView'
import DetailView from '@/views/movies/DetailView'
import NotFound404 from '@/views/NotFound404'

import CreateReviewView from '@/views/movies/CreateReviewView'
import ReviewView from '@/views/movies/ReviewView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },
  {
    path: '/login',
    name: 'LogInView',
    component: LogInView
  },
  {
    path: '404-not-found',
    name: 'NotFound404',
    component: NotFound404
  },
  {
    path: '/:id',
    name: 'DetailView',
    component: DetailView
  },
  {
    path: '/movies/review',
    name: 'ReviewView',
    component: ReviewView
  },
  {
    path: '/movies/:movieId/review',
    name: 'CreateReviewView',
    component: CreateReviewView
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
