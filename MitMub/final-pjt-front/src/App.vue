<template>
  <div id="app" style="margin: auto;">
    <!-- offcanvas == 옆에 뭐 띄우는 거 -->

    <div v-if="isLogin === true" class="offcanvas offcanvas-end"
      tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">

      <div class="offcanvas-header">
        <div class="card-header" style="color:#141414;">
          <h5 style="color: lightgrey;">Signed in as <b style="color: #eeeeee;">{{ profile?.username }}</b></h5>
        </div>
        <h5 type="button" data-bs-dismiss="offcanvas"
          aria-label="Close">✖</h5>
      </div>
      <div class="offcanvas-body">
        <ProfileView :user="user" />
        <a href="#" @click.prevent="logOut" v-if="isLogin === true" class="text-decoration-none">LogOut</a>
      </div>
    </div>
    <!-- navbar LOGO는 누르면 새로고침되면서 메인으로 이동 router 이동 x -->
    <nav class="navbar">

      <div id="nav-div" class="container justify-content-between">
        <a href="http://localhost:8080/"><img id="logo-image" src="@/assets/images/RowLogo.png"
            style="width:170px; height:80px;" />
        </a>

        <div>
          <!-- 로그인 안 된 사용자 용 ui -->
          <router-link v-if="isLogin === false" class="text-decoration-none" :to="{ name: 'LogInView' }">Sign in
          </router-link><span v-if="isLogin === false"> | </span>
          <router-link v-if="isLogin === false" class="text-decoration-none" :to="{ name: 'SignUpView' }">Sign up
          </router-link><span v-if="isLogin === false"> | </span>
          <!-- 로그인 된 사용자 용 ui -->
          <router-link v-if="isLogin === true" class="text-decoration-none me-4 fs-5" :to="{ name: 'ReviewView' }">
            Reviews </router-link>

          <router-link v-if="isLogin === true" class="text-decoration-none me-4 fs-5" :to="{ name: 'CommunityView' }">
            Community </router-link>
          <button v-if="isLogin === true" class="btn btn-outline-secondary mb-2" type="button"
            data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Signed in
            as <b style="color: #eeeeee;">{{ profile?.username }}</b> 🚀</button>


        </div>
      </div>
    </nav>
    <transition name="slide-fade" mode="out-in">
      <router-view :key="$route.fullPath" />
    </transition>
    <footer>
      <nav id="footer-nav">
        <a href='https://github.com/NayeonS2' target='_blank'>NayeonS2</a> |
        <a href='https://github.com/recorror' target='_blank'>recorror</a>
        <p>
          <span>Copyright 2022. 중요한 것은 꺾이지 않는 마음. All Rights Reserved.</span>
        </p>
      </nav>
    </footer>
  </div>
</template>

<script>
import axios from 'axios'
import ProfileView from '@/views/accounts/ProfileView'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'App',
  components: {
    ProfileView,
  },
  data() {
    return {
      login: false,
      refresh: 0,
      user: '',
      profile: null,
      profile_list: null,

    }
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    },

    popularLen() {
      return this.$store.getters.movies.length
    },
    highRateLen() {
      return this.$store.getters.highRateMovies.length
    },
    newLen() {
      return this.$store.getters.newMovies.length
    },
    upcomingLen() {
      return this.$store.getters.upcomingMovies.length
    },
    longLen() {
      return this.$store.getters.longMovies.length
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('logOut')
    },

    getUserName() {

      this.$store.dispatch('getUserName')

    },
    getUser() {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/accounts/get_user/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then(res => {
          // 모든 유저 정보 받아옴.
          this.$store.dispatch('getUser', res.data)
        })
        .catch(err => {
          console.error(err)
        })
    },

    getProfile() {

      if (this.user) {
        axios({
          method: 'get',
          // username 경로로 토큰 요청
          url: `${API_URL}/api/v1/accounts/${this.user}/`,
          headers: {
            Authorization: `Token ${this.$store.state.token}`,
          },
        })
          .then(res => {
            console.log(res.data)
            // acounts serializers에 정의된 프로필 데이터 받아옴.
            this.$store.dispatch('getProfile', res.data)
            this.profile = this.$store.state.profile


          })
          .catch(err => {
            console.error(err)
          })
      }
    },


    profileList() {
      axios({
        method: 'get',
        // username 경로로 토큰 요청
        url: `${API_URL}/api/v1/accounts/profile_list/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then(res => {
          // console.log(res.data) 
          // acounts serializers에 정의된 프로필 데이터 받아옴.
          this.$store.dispatch('profileList', res.data)
          this.profile_list = this.$store.state.profile_list


        })
        .catch(err => {
          console.error(err)
        })
    },

    getMovies() {
      this.$store.dispatch('getMovies')
    },
    highRateMovies() {
      this.$store.dispatch('highRateMovies')
    },
    newMovies() {
      this.$store.dispatch('newMovies')
    },
    upcomingMovies() {
      this.$store.dispatch('upcomingMovies')
    },
    longMovies() {
      this.$store.dispatch('longMovies')
    },

    getReviews() {
      this.$store.dispatch('getReviews')
    },


  },

  // 인스턴스 생성 시에 로그인 된 상태면 불러올 메서드들 정의
  created() {

    if (this.isLogin) {
      this.login = true
      this.getUserName()

      this.getUser()
      this.getProfile()
      this.profileList()



      // this.getMovies()
      // this.highRateMovies()
      // this.newMovies()
      // this.upcomingMovies()
      // this.longMovies()
      this.getReviews()
    } else {
      this.login = false
    }
    if (this.popularLen === 0) {
      this.getMovies()
    }
    if (this.highRateLen === 0) {
      this.highRateMovies()
    }
    if (this.newLen === 0) {
      this.newMovies()
    }
    if (this.upcomingLen === 0) {
      this.upcomingMovies()
    }
    if (this.longLen === 0) {
      this.longMovies()
    }

    //this.refresh = this.refresh + 1
    //this.refresher()

  },
  update() {
    //this.$router.push({name:'HomeView'})
  },
  mounted() {


  },

  // login 할 때  
  watch: {
    login: function () {

      this.getProfile()
      this.getUser()
      this.profileList()
      this.profile = this.$store.state.profile
      this.user = this.$store.state.username
      this.profile_list = this.$store.state.profile_list


    },

  }



}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap');

#app {
  font-family: 'Nanum Gothic', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #eeeeee;
  position: relative;
  min-width: 992px;
  max-width: 1920px;

  min-height: 100vh;
  background-image: url(@/assets/images/hero-bg.jpg);
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;

  display: block;
}

nav {
  margin: 0;
  padding: 30px;
  min-width: 997px;
  max-width: 1920px;
}

nav a {
  font-weight: bold;
  color: #eeeeee;
}

#nav-div {
  min-width: 997px;
  max-width: 1860px;
}

nav a.router-link-exact-active {
  color: #42b983;
}


.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}

footer {
  font-family: 'Abel', sans-serif;
  width: 100%;
  height: 60px;
  bottom: 0px;
  position: absolute;
  margin-top: 5px;
  color: #eeeeee;
}

#footer-nav {
  font-family: 'Abel', sans-serif;
  padding: 0;
  margin: 0;
  color: #eeeeee;
}

#footer-nav * {
  font-family: 'Nanum Gothic', sans-serif;
  font-family: 'Abel', sans-serif;
  padding: 0;
  margin: 0;
  color: #eeeeee;
}

#nav-div-a {
  min-width: 300px;
}

#search-input {
  background: none;
  color: #eeeeee;
}

#offcanvasScrolling {

  background-image:url(@/assets/images/profileback.jpg);
  background-repeat: no-repeat;
  height:960px;
  width:380px;
  background-size: cover;
}

</style>

