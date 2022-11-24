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
/* eslint-disable */
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
        },

  

    },
    methods: {
        signUp() {
            //let users = this.$store.state.users
            const username = this.username
            const password1 = this.password1
            const password2 = this.password2

            let unique = true
            for (let user of this.$store.state.users) {
                if (user.username === username) {
                    unique = false
                }
            }

            const specialChar = ['`','~','!','@','#','$','%','^','&','*','(',')','-','_','=','+','[',']','{','}',',','<','.','>','/','?']
            const upperChar = Array.from({ length: 26 }, (v, i) => String.fromCharCode(i + 65));
            const lowerChar = Array.from({ length: 26 }, (v, i) => String.fromCharCode(i + 97));
            
            const arrUsername = Array.from(username)
            
            let confUsername = specialChar.filter(it => arrUsername.includes
                (it))

            let rightUsername = true
            if (confUsername.length > 0) {
                rightUsername = false
            } else {
                rightUsername = true
            }
             
            console.log(username == password1)
            
            
            let str = '';	

            for (let i = 65; i <= 122; i++) {
                console.log(String.fromCharCode(i));
                
                str += String.fromCharCode(i);
            }
            const allAlpha = Array.from(str)
            //const allAlpha = [...new Set([...upperChar, ...lowerChar])];
            const nums = ['0','1','2','3','4','5','6','7','8','9']

            const arrPass = Array.from(password1)
            console.log(upperChar,lowerChar)


            let confPass = true
            if (password1 === password2) {
               
                confPass = true
            } else {
                confPass = false
            }

            const payload = {
                username, password1, password2
            }


            let conf1 = specialChar.filter(it => arrPass.includes
                (it))

            let conf2 = allAlpha.filter(it => arrPass.includes
            (it))

            let conf3 = nums.filter(it => arrPass.includes
            (it))


            let similarConf = arrPass.filter(it => arrUsername.includes(it))

            console.log(conf1,conf2,conf3)

            if (unique === true && rightUsername === true && similarConf.length < arrPass.length*0.7 && confPass === true && conf1.length > 0 && conf2.length >0 && conf3.length > 0 && arrPass.length >= 8) {
                this.$store.dispatch('signUp', payload)
                alert("회원가입이 완료되었습니다.")
            } else {
                alert("아이디와 비밀번호 양식을 확인해주세요!")
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