<template>
  <div class="d-flex justify-content-center">
    <div style="width:500px;">
      <h1>Sign in to MitMub</h1>
      <div id="sing-in-form">
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
#sing-in-form {
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