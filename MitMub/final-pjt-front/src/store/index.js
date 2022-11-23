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
    watch_list : [],
  

    profile_list: [],

    refresh_create_rev: 0,
    refresh_delete_rev: 0,
    refresh_update_rev: 0,
    
    refresh_create_com: 0,
    refresh_delete_com: 0,
    
    refresh_home: 0,

    refresh_review_like: 0,

    refresh_detail: 0,

    refresh_profile: 0,

    refresh_pick_movie: 0,
  
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

    ADD_REFRESH_CR(state) {
      state.refresh_create_rev ++
    },
    ADD_REFRESH_DR(state) {
      state.refresh_delete_rev ++
    },
    ADD_REFRESH_UR(state) {
      state.refresh_update_rev ++
    },
    ADD_REFRESH_CC(state) {
      state.refresh_create_com ++
    },
    ADD_REFRESH_DC(state) {
      state.refresh_delete_com ++
    },
    ADD_REFRESH_H(state) {
      state.refresh_home ++
    },
    ADD_REFRESH_DETAIL(state) {
      state.refresh_detail ++
    },
    ADD_REFRESH_PICK_MOVIE(state) {
      state.refresh_pick_movie ++
    },

    ADD_REFRESH_REVIEW_LIKE(state) {
      state.refresh_review_like ++ 
    },

    ADD_REFRESH_PROFILE(state) {
      state.refresh_profile ++ 
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
    
    REFRESH_MOVIE(state, newMovie) {
      for (let movie of state.movies) {
        if (newMovie.id === movie.id) {
          state.movies[movie.id-1] = newMovie
          
        }
      }
      console.log(33333,state.movies)
    },



    GET_USER(state,users) {
      state.users = users
    },

    GET_PROFILE(state, profile) {
      state.profile = profile
    },

    PROFILE_LIST(state, profiles) {
      state.profile_list = profiles
    },

    REFRESH_PROFILE(state, newProfile) {
      for (let profile in state.profile_list) {
        if (profile.id === newProfile.id) {
          // profile = newProfile
          profile = {...profile, followers: newProfile.followers}
          
          break

        }
      }
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

          console.log(res)
          context.commit('SAVE_TOKEN_SIGNUP', res.data.key)

          context.commit('ADD_REFRESH_H')

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
          context.commit('ADD_REFRESH_H')
          
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
      if (context.getters.isLogin) {
        axios({
          method: 'get',
          url: `${API_URL}/api/v1/movies/`,
          headers: {
            Authorization: `Token ${ context.state.token }`,
           
          },
          
        })
          .then(res => {
            context.commit('GET_MOVIES', res.data)
            console.log('popular')
          })
          .catch(err => {
            console.error(err)
          })
      }
      
    },
    highRateMovies(context) {
      if (context.getters.isLogin) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/movies/highrate/`,
        headers: {
          Authorization: `Token ${ context.state.token }`,
         
        },
        
      })
        .then(res => {
          context.commit('HIGH_RATE_MOVIES', res.data)
          console.log('highrate')
        })
        .catch(err => {
          console.error(err)
        })
      }  
    },
    
    
    newMovies(context) {
      if (context.getters.isLogin) {
        axios({
          method: 'get',
          url: `${API_URL}/api/v1/movies/new/`,
          headers: {
            Authorization: `Token ${ context.state.token }`,
           
          },
          
        })
          .then(res => {
            context.commit('NEW_MOVIES', res.data)
            console.log('new')
          })
          .catch(err => {
            console.error(err)
          })
      }
      
    },
    upcomingMovies(context) {
      if (context.getters.isLogin) {
        axios({
          method: 'get',
          url: `${API_URL}/api/v1/movies/upcoming/`,
          headers: {
            Authorization: `Token ${ context.state.token }`,
           
          },
          
        })
          .then(res => {
            context.commit('UPCOMING_MOVIES', res.data)
            console.log('upcoming')
          })
          .catch(err => {
            console.error(err)
          })
      }
      
      
    },
    longMovies(context) {
      if (context.getters.isLogin) {
        axios({
          method: 'get',
          url: `${API_URL}/api/v1/movies/long/`,
          headers: {
            Authorization: `Token ${ context.state.token }`,
           
          },
          
        })
          .then(res => {
            context.commit('LONG_MOVIES', res.data)
            console.log('long')
          })
          .catch(err => {
            console.error(err)
          })
      }
      
    },


    getUser(context, users) {
      context.commit('GET_USER', users)
    },

    getProfile(context, profile) {
      context.commit('GET_PROFILE', profile)
    },

    profileList(context, profiles) {
      context.commit('PROFILE_LIST', profiles)
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
