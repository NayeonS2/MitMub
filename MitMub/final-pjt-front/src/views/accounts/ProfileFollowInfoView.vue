<template>
  <div>
     
        <!-- <span v-if="isFollow" @click="follow"><i class="bi bi-person-hearts"></i></span>
        <span v-else @click="follow"><i  class="bi bi-person-plus"></i></span> -->

        <i class="bi bi-person-hearts" style="font-size: 2rem; color: #F56E6E;"></i>


    
    <p id="myFollow" class="m-0 pe-2" style="color: #FFEBF0"><b>My Followers: {{ followers_len }}</b></p>
    <p id="myFollow" class="mt-1 pe-2" style="color: #FFEBF0"><b>My Follwings: {{ followings_len }}</b></p>
    <hr>
  </div>

</template>

<script>
// import axios from 'axios'

// const API_URL = 'http://127.0.0.1:8000'
export default {
    name: 'ProfileFollowInfoView',
    data() {
        return {
            Myprofile : [],
            followers_len: 0,
            followings_len: 0,
        }
    },
    props: {
        profile: {},
    },
    methods: {

        // followNum() {
        //     axios({
        //         method: 'get',
        //         url: `${API_URL}/api/v1/accounts/${this.profile.username}/follow_num/`,
    
        //         headers: {
        //             Authorization: `Token ${this.$store.state.token}`
        //         }
        //     })
        //     .then((res) => {
        //         this.$store.commit('REFRESH_PROFILE', res.data)
        
        //         this.followers_len = res.data.followers_num
        //         this.followings_num = res.data.followings_num
                       
            
        //     })
        //     .catch((err) => { 
        //         console.log(err)
        //     })
        // }
    },
    created() {
        // console.log(this.$store.state.token)
       
          
                this.Myprofile = this.$store.state.profile
                this.followers_len = this.Myprofile.followers?.length
                this.followings_len = this.Myprofile.followings?.length
          
            
  
        
        //this.checkFollow()
        //this.followNum()
        // console.log()

    },
    mounted() {
                this.Myprofile = this.$store.state.profile
                this.followers_len = this.Myprofile.followers?.length
                this.followings_len = this.Myprofile.followings?.length
        
       //this.checkFollow()
        //this.followNum() 

        //this.followers_len = this.profile.followers.length
        //this.followings_len = this.profile.followings.length


        // console.log(this.profile)
        // console.log(this.isFollow)
    },

}
</script>

<style>
    #myFollow {
        font-family: 'Abel', sans-serif;
    }
</style>