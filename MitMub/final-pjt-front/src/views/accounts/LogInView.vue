<template>
  <div class="d-flex justify-content-center">
    <div style="width:500px;">
      <h1>Sign in to MitMub</h1>
      <div id="sign-in-form">
        <form @submit.prevent="logIn" id="form-form">
          <p class="text-start mt-3" for="username">Username</p>
          <input class="form-control" type="text" id="username" v-model="username">
                <br>
          <div class="row">
            <p class="text-start col" for="password">Password</p>
          </div>
          <input class="form-control" type="text" id="password" v-model="password">
                <br>
          <input class="form-control btn btn-success" type="submit" value="Sign in">
        </form>
    </div>
        
    </div>
  </div>
</template>

<script>
const API_URL = 'http://127.0.0.1:8000'
import axios from 'axios'
export default {
    name: 'LogInView',
    data() {
        return {
            username: null,
            password: null,
        }
    },
    computed: {
        isLogin() {
            return this.$store.getters.isLogin
        }
    },

    methods: {
        logIn() {
            const username = this.username
            const password = this.password

            let Userexist = false
            for (let user of this.$store.state.users) {
                if (user.username === username) {
                    Userexist = true
                }
            }


          const payload = {
              username, password
          }
          if (Userexist === true) {
            this.$store.dispatch('logIn', payload)
          } else {
            alert('아이디와 비밀번호를 확인해주세요!')
          }
            
        }
    },
    created() {
      
        if (this.isLogin) {
            this.$router.push({name:'IntroView'})
        }
    }

}
</script>

<style>
#sign-in-form {
  background-color:#0C162D;
  padding: auto;
  margin: auto;
  width: 380px;
  height: 280px;
  align-items: center;
  border-radius: 10px;
  border: solid 1px #627597;
}

#form-form {
  color: #627597;
  margin: auto;
  width: 340px;
}

</style>