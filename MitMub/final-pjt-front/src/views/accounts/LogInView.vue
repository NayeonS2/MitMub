<template>
    <div class="d-flex justify-content-center">
        <div style="width:500px;">
            <h1>LogIn</h1>
            <form @submit.prevent="logIn" class="mt-3">
                <p class="text-start" for="username">username : </p>
                <input class="form-control" type="text" id="username" v-model="username"><br>

                <p class="text-start" for="password">password : </p>
                <input class="form-control" type="text" id="password" v-model="password"><br>


                <input class="form-control btn btn-secondary" type="submit" value="logIn">

            </form>
        </div>
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