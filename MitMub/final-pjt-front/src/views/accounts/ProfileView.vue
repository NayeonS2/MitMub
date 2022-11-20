<template>
  <div>
    <div class="mb-4">   
        <img :src=img_url alt="" style="width:200px; height:20  0px;" class="rounded-circle"><br>
    </div>
    
    <h5>닉네임 : {{ profile?.username }}</h5>
    
    
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'


export default {
    name: 'ProfileView',
    props: {
        user: String,
    },
    data() {
        return {
            profile: [],
            img_url : `https://avatars.dicebear.com/api/identicon/${this.$store.state.profile?.username}.svg`,
   
        }
    },
    methods: {
        getProfile() {
            if (this.user) {
            axios({
                method: 'get',
                url: `${API_URL}/api/v1/accounts/${this.user}/`, 
                headers: {
                    Authorization: `Token ${ this.$store.state.token }`,
                },
                    })
                    .then(res => {
                        this.$store.dispatch('getProfile', res.data)
                        this.$router.go(this.$router.currentRoute)
                      

                        console.log(this.profile)
                    })
                    .catch(err => {
                        console.error(err)
                    })
         } 
        }
    },
    created() {
        this.getProfile()
        this.profile = this.$store.state.profile
        //this.$router.go(this.$router.currentRoute)

    },
    mounted() {
        //this.$router.go(this.$router.currentRoute)
    },
    watch: {
        user: function() {
            this.getProfile()
            this.profile = this.$store.state.profile
            
        }
    }
}
</script>

<style>

</style>