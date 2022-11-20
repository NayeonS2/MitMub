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

    genre: {
      28: "액션",
      12: "모험",
      16: "애니메이션",
      35: "코미디",
      80: "범죄",
      99: "다큐멘터리",
      18: "드라마",
      10751: "가족",
      14: "판타지",
      36: "역사",
      27: "공포",
      10402: "음악",
      9648: "미스터리",
      10749: "로맨스",
      878: "SF",
      10770: "TV 영화",
      53: "스릴러",
      10752: "전쟁",
      37: "서부"
    },

    users: [],
    profile: [],

    refresh: 0,
  
    // 추천 알고리즘
    token: null,
    movies: [],
    high_rate_movies: [],
    new_movies: [],
    upcoming_movies: [],
    long_movies: [],


    reviews: [],
    comments: [],
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

    ADD_REFRESH(state) {
      state.refresh ++
    },

    SAVE_TOKEN_LOGIN(state, token) {
      state.token = token
      //router.go(router.currentRoute)
      router.go(router.currentRoute)
      //router.push({ name: 'HomeView' })
      
    },

    SAVE_TOKEN_SIGNUP(state, token) {
      state.token = token
      router.go(router.currentRoute)
      
      //router.push({ name: 'HomeView' })
      
    },

    LOGOUT(state) {
      state.token = null  
      state.username = ''
      state.profile = []
      router.push({name:'LogInView'})
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
    },

    CREATE_USER(state, payload) {
      state.username = payload.username

    },


    GET_REVIEWS(state, reviews) {
      state.reviews = reviews
      
    }

  },
  actions: {

    getUserName(context) {
      axios({
        method: 'get',
        url: `${API_URL}/accounts/user/`,
        headers: {
          Authorization: `Token ${ context.state.token }`,
         
        },

      })
        .then((res) => {
          console.log(res)
  
          context.commit('GET_USERNAME', res.username)
          
        })
    },

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
<<<<<<< HEAD
          console.log(res)
          context.commit('SAVE_TOKEN_SIGNUP', res.data.key)
=======
          // console.log(res)
          context.commit('SAVE_TOKEN', res.data.key)
>>>>>>> f98dd7a0f64a7ef1f0ec7fbeb6206a7f788e07d1
          context.commit('CREATE_USER',payload)
          
        })
        .catch((err) => {
          console.log(err)
        })
    },
    logIn(context, payload) {
      context.commit('GET_USERNAME', payload.username)
      // console.log(payload)
      let success = false
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
          alert("로그인이 완료되었습니다!")
          success = true
  
          context.commit('SAVE_TOKEN_LOGIN', res.data.key)
          
          //router.push({name:'HomeView'})
        })
        .catch((err) => {
          console.log(err)
          if (success === false) {
            alert("아이디와 비밀번호를 확인해주세요.")
          router.go()
          }
          
          
        })
    },


    logOut(context) {
  
      axios({
        method: 'post',
        url: `${API_URL}/accounts/logout/`,
        headers: {
          Authorization: `Token ${ context.state.token }`,
         
        },

      })
        .then((res) => {
          console.log(res)
  
          context.commit('LOGOUT')
          
          router.push({name:'LogInView'})
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


    getReviews(context) {
          axios({
              method: 'get',
              url: `${API_URL}/api/v1/movies/review/`,
              headers: {
                      Authorization: `Token ${context.state.token}`
                  }
          })
          .then(res => {
            console.log(res)

            context.commit('GET_REVIEWS', res.data)
            
          })
          .catch(err => {
            console.log(err)
          })
      },



  },
  modules: {
  }
})
