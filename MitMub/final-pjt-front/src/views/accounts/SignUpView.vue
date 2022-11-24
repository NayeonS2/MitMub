<template>
  <div class="d-flex justify-content-center">
      
    <div style="width:500px;">
      <h1>Sign Up</h1>
      <div id="sign-up-form">
        <form @submit.prevent="signUp" id="form-form" class="mt-3">
          <p class="text-start" for="username">username : </p>
          <input class="form-control" type="text" id="username" v-model="username"><br>
  
          <p for="password1" class="text-start">password1 : </p>
          <input class="form-control" type="text" id="password1" v-model="password1"><br>
  
          <p for="password2" class="text-start">password2 : </p>
          <input class="form-control" type="text" id="password2" v-model="password2"><br>
  
          <input class="form-control btn btn-success" type="submit" value="SignUp">
  
        </form>
      </div>
    </div>

  </div>
</template>

<script>
export default {
    name: 'SignUpView',
    data() {
        return {
            username: null,
            password1: null,
            password2: null,
        }
    },
    computed: {
        isLogin() {
            return this.$store.getters.isLogin
        }
    },
    methods: {
        signUp() {
            const username = this.username
            const password1 = this.password1
            const password2 = this.password2

            let unique = true
            for (const user of this.$store.state.users) {
                if (user.username === username) {
                    unique = false
                }
            }

            const payload = {
                username, password1, password2
            }
            
            if (unique === true) {
                if (password1 === password2) {
                    this.$store.dispatch('signUp', payload)
                    alert("회원가입이 완료되었습니다.")
                    
            
                    
                } else {
                    alert("비밀번호가 일치하지 않습니다!")
                    this.username = null
                    this.password1 = null
                    this.password2 = null
                }

            } else {
                alert("중복된 아이디입니다!")
                this.username = null
                this.password1 = null
                this.password2 = null
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
#sign-up-form {
    background-color: #0C162D;
    padding: auto;
    margin: auto;
    width: 390px;
    height: 390px;
    align-items: center;
    border-radius: 10px;
    border: solid 1px #627597;
}

#form-form {
    color: #627597;
    margin: auto;
}
</style>