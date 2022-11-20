<template>
    <div>
        <h1>Sign Up</h1>
        <form @submit.prevent="signUp">
            <label for="username">username : </label>
            <input type="text" id="username" v-model="username"><br>

            <label for="password1">password1 : </label>
            <input type="text" id="password1" v-model="password1"><br>

            <label for="password2">password2 : </label>
            <input type="text" id="password2" v-model="password2"><br>

            <input type="submit" value="SignUp">

        </form>


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
            this.$router.push({name:'HomeView'})
        }
    }
}
</script>

<style>

</style>