import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import router from '@/router'

Vue.use(Vuex)

// django 서버 주소
const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    username: '',
    users: [],
    profile: [],
  
    token: null,
    movies: [],
    high_rate_movies: [],
    new_movies: [],
    upcoming_movies: [],
    long_movies: [],
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    },
    movies(state) {
      return state.movies
    },
    highRateMovies(state) {
      return state.high_rate_movies
    },
    newMovies(state) {
      return state.new_movies
    },
    upcomingMovies(state) {
      return state.upcoming_movies
    },
    longMovies(state) {
      return state.long_movies
    }
  },
  mutations: {
    SAVE_TOKEN(state, token) {
      state.token = token
      router.push({name: 'HomeView'})
    },

    GET_MOVIES(state, movies) {
      state.movies = movies
    },
    HIGH_RATE_MOVIES(state, movies) {
      state.high_rate_movies = movies
    },
    NEW_MOVIES(state, movies) {
      state.new_movies = movies
    },
    UPCOMING_MOVIES(state, movies) {
      state.upcoming_movies = movies
    },
    LONG_MOVIES(state, movies) {
      state.long_movies = movies
    },
    
    GET_USER(state,users) {
      state.users = users
    },

    GET_PROFILE(state, profile) {
      state.profile = profile
    },
    
    GET_USERNAME(state, username) {
      state.username = username
    }
  },
  actions: {
    signUp(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username: payload.username,
          password1: payload.password1,
          password2: payload.password2,
        },

      })
        .then((res) => {
          console.log(res)
          context.commit('SAVE_TOKEN', res.data.key)
          
        })
        .catch((err) => {
          console.log(err)
        })
    },
    logIn(context, payload) {
      context.commit('GET_USERNAME', payload.username)
      console.log(payload)
      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username: payload.username,
          password: payload.password,
        },

      })
        .then((res) => {
          console.log(res)
  
          context.commit('SAVE_TOKEN', res.data.key)
          
          this.$router.push({name:'HomeView'})
        })
    },

    // movies actions
    getMovies(context) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/movies/`,
        headers: {
          Authorization: `Token ${ context.state.token }`,
         
        },
        
      })
        .then(res => {
          context.commit('GET_MOVIES', res.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    highRateMovies(context) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/movies/highrate/`,
        headers: {
          Authorization: `Token ${ context.state.token }`,
         
        },
        
      })
        .then(res => {
          context.commit('HIGH_RATE_MOVIES', res.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    
    newMovies(context) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/movies/new/`,
        headers: {
          Authorization: `Token ${ context.state.token }`,
         
        },
        
      })
        .then(res => {
          context.commit('NEW_MOVIES', res.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    upcomingMovies(context) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/movies/upcoming/`,
        headers: {
          Authorization: `Token ${ context.state.token }`,
         
        },
        
      })
        .then(res => {
          context.commit('UPCOMING_MOVIES', res.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    longMovies(context) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/movies/long/`,
        headers: {
          Authorization: `Token ${ context.state.token }`,
         
        },
        
      })
        .then(res => {
          context.commit('LONG_MOVIES', res.data)
        })
        .catch(err => {
          console.error(err)
        })
    },


    getUser(context, users) {
      context.commit('GET_USER', users)
    },

    getProfile(context, profile) {
      context.commit('GET_PROFILE', profile)
    },


  },
  modules: {
  }
})
