<template>
    <div>
        <h1>LogIn</h1>
        <form @submit.prevent="logIn">
            <label for="username">username : </label>
            <input type="text" id="username" v-model="username"><br>

            <label for="password">password : </label>
            <input type="text" id="password" v-model="password"><br>


            <input type="submit" value="logIn">

        </form>
    </div>
</template>

<script>
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

            const payload = {
                username, password
            }
            
            this.$store.dispatch('logIn', payload)
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

</style>