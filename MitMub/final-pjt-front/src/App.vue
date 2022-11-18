<template>
  <div id="app" class="container-lg">
    <!-- offcanvas == 옆에 뭐 띄우는 거 -->
    <div class="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
      <div class="offcanvas-header">
        <div class="card-header"><h5><b>{{user}}님의 프로필</b></h5></div>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ProfileView :user="user"/>
      </div>
    </div>
    <!-- navbar LOGO는 누르면 새로고침되면서 메인으로 이동 router 이동 x -->
    <nav class="navbar bg-white">
      <div class="container-lg">
        <a href=""><img id="logo-image" 
          src="@/assets/images/RowLogo.png" 
          style="width:160px; height:80px;"
        />
        </a>
        <div>
          <!-- 로그인 안 된 사용자 용 ui -->
          <router-link v-if="isLogin === false" class="text-decoration-none" :to="{ name: 'LogInView' }">LogIn </router-link><span v-if="isLogin === false"> | </span> 
          <router-link v-if="isLogin === false" class="text-decoration-none" :to="{ name: 'SignUpView' }">SignUp </router-link><span v-if="isLogin === false"> | </span>  
          <!-- 로그인 된 사용자 용 ui -->
          <button v-if="isLogin === true" class="btn btn-outline-secondary mb-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">{{user}} 님 환영합니다👋</button>
        </div>
      </div>
    </nav>
    <router-view/>
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
      user: '',
      profile: this.$store.state.profile,

    }
  },
  computed: {
    isLogin() {
        return this.$store.getters.isLogin
    },
  },
  methods: {
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
            // console.log(res.data) 
            // acounts serializers에 정의된 프로필 데이터 받아옴.
            this.$store.dispatch('getProfile', res.data)
            this.profile = this.$store.state.profile
          })
          .catch(err => {
            console.error(err)
          })
      }
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
  },

  // 인스턴스 생성 시에 로그인 된 상태면 불러올 메서드들 정의
  created() {
    if (this.isLogin) {
      this.login = true
    } 
    this.getUser()
    this.getProfile()
    this.getMovies()
    this.highRateMovies()
    this.newMovies()
    this.upcomingMovies()
    this.longMovies()
  },

  // login 할 때  
  watch: {
    login: function() {
      this.user = this.$store.state.username
      this.getProfile()
      this.getUser()
    }
  }



}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 992px;
}

nav {
  padding: 30px;
  min-width: 992px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
