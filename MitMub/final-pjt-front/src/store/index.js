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
    token: null,
    movies: [],
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    },
    movies(state) {
      return state.movies
    },
  },
  mutations: {
    SAVE_TOKEN(state, token) {
      state.token = token
      router.push({name: 'HomeView'})
    },

    GET_MOVIES(state, movies) {
      state.movies = movies
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
      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username: payload.username,
          password: payload.password,
        },

      })
        .then((res) => {
          // console.log(res)
          context.commit('SAVE_TOKEN', res.data.key)
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
    } 


  },
  modules: {
  }
})
