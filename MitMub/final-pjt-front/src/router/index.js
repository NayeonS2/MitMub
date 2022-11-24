import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUpView from '@/views/accounts/SignUpView'
import LogInView from '@/views/accounts/LogInView'
import HomeView from '@/views/movies/HomeView'
import DetailView from '@/views/movies/DetailView'
import NotFound404 from '@/views/NotFound404'

import CreateReviewView from '@/views/movies/CreateReviewView'
import UpdateReviewView from '@/views/movies/UpdateReviewView'
import ReviewView from '@/views/movies/ReviewView'
import ReviewDetailView from '@/views/movies/ReviewDetailView'
import IntroView from '@/views/movies/IntroView'

import CommunityView from '@/views/accounts/CommunityView'
import YourProfileView from '@/views/accounts/YourProfileView'
import YourDetailProfileView from '@/views/accounts/YourDetailProfileView'
import SearchView from '@/views/SearchView'
import WatchList from '@/views/movies/WatchList'

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(() => {
        return window.location.reload()
    })
};

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/intro',
    name: 'IntroView',
    component: IntroView
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
    path: '/404-not-found',
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
  {
    path: '/movies/reviewUpdate/:reviewId',
    name: 'UpdateReviewView',
    component: UpdateReviewView
  },
  {
    path: '/movies/reviewDetail/:reviewId/',
    name: 'ReviewDetailView',
    component: ReviewDetailView
  },
  {
    path: '/accounts/community/',
    name: 'CommunityView',
    component: CommunityView
  },
  {
    path: '/accounts/profile/:userId/',
    name: 'YourProfileView',
    component: YourProfileView
  },
  {
    path: '/accounts/detailProfile/:userId/',
    name: 'YourDetailProfileView',
    component: YourDetailProfileView
  },
  {
    path: '/search/:text/',
    name: 'SearchView',
    component: SearchView,
    props: true
  },
  {
    path: '/my-watch-list/',
    name: 'WatchList',
    component: WatchList,
    props: true
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
