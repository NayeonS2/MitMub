<template>
  <div id="app" style="margin: auto;">
    <!-- offcanvas == 옆에 뭐 띄우는 거 -->
    <div v-if="isLogin === true" class="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
      <div class="offcanvas-header">
        <div class="card-header" style="color:#141414;"><h5><b>{{profile?.username}}님의 프로필</b></h5></div>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ProfileView :user="user"/>
        <a href="#" @click.prevent="logOut" v-if="isLogin === true" class="text-decoration-none">LogOut</a>
      </div>
    </div>
    <!-- navbar LOGO는 누르면 새로고침되면서 메인으로 이동 router 이동 x -->
    <nav class="navbar">
<<<<<<< HEAD
      <div id="nav-div" class="container-lg">
        <div class="row">
          <a href="http://localhost:8080/" class="col">
            <img id="logo-image" 
            src="@/assets/images/RowLogo.png" 
            style="width:170px; height:80px;"
          />
          </a>
        </div>
=======
      <div id="nav-div" class="container justify-content-between">
        <a href="http://localhost:8080/"><img id="logo-image" 
          src="@/assets/images/RowLogo.png" 
          style="width:170px; height:80px;"
        />
        </a>
>>>>>>> b1c98dabe40df99bdbcc4384c5465b2ed039846b
        <div>
          <!-- 로그인 안 된 사용자 용 ui -->
          <router-link v-if="isLogin === false" class="text-decoration-none" :to="{ name: 'LogInView' }">Sign in </router-link><span v-if="isLogin === false"> | </span> 
          <router-link v-if="isLogin === false" class="text-decoration-none" :to="{ name: 'SignUpView' }">Sign up </router-link><span v-if="isLogin === false"> | </span>  
          <!-- 로그인 된 사용자 용 ui -->
          <router-link v-if="isLogin === true" class="text-decoration-none me-4 fs-5" :to="{ name: 'ReviewView' }">Reviews </router-link>
<<<<<<< HEAD
          <router-link v-if="isLogin === true" class="text-decoration-none me-4 fs-5" :to="{ name: 'CommunityView' }">Community </router-link>
          <button v-if="isLogin === true" class="btn btn-outline-secondary mb-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">{{profile?.username}} 님 환영합니다👋</button>
=======
          <button v-if="isLogin === true" class="btn btn-outline-light mb-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">{{profile?.username}} 님 환영합니다👋</button>
>>>>>>> b1c98dabe40df99bdbcc4384c5465b2ed039846b

        </div>
      </div>
    </nav>
    <transition name="slide-fade" mode="out-in">
      <router-view :key="$route.fullPath"/>
    </transition>
    <footer>
      <nav id="footer-nav">
        <a href='https://github.com/NayeonS2' target='_blank'>NayeonS2</a> |
        <a href='https://github.com/recorror' target='_blank'>recorror</a>
        <p>
          <span>Copyright 2020. cocoder. All Rights Reserved.</span>
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
          Authorization: `Token ${ this.$store.state.token }`,
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
            Authorization: `Token ${ this.$store.state.token }`,
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
            Authorization: `Token ${ this.$store.state.token }`,
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
    login: function() {
      
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
<<<<<<< HEAD
  min-height: 100vh;
  background-image: url(@/assets/images/hero-bg.jpg);
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
}
#app *{
  font-family: 'Nanum Gothic', sans-serif;
=======
  background: #141414;
>>>>>>> b1c98dabe40df99bdbcc4384c5465b2ed039846b
}

nav {
  margin: 0;
  padding: 30px;
  min-width: 992px;
  max-width: 1920px;
}

nav a {
  font-weight: bold;
  color: #eeeeee;
}
#nav-div {
  min-width: 992px;
  max-width: 1860px;
}

nav a.router-link-exact-active {
  color: #42b983;
}

<<<<<<< HEAD
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
	width: 100%;
	height: 60px;
	bottom: 0px;
	position: absolute;
}

#footer-nav {
  padding: 0;
  margin: 0;
}
#footer-nav *{
  padding: 0;
  margin: 0;
}

#nav-div-a {
  min-width: 300px;
}

#search-input {
  background: none;
  color: #eeeeee;
=======
#nav-div {
  max-width: 1600px;
>>>>>>> b1c98dabe40df99bdbcc4384c5465b2ed039846b
}
</style>
