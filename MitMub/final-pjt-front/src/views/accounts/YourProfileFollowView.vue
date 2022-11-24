<template>
  <div> 
        <span class="row me-3">
        
        <div class="col text-end mt-2 me-0">
            <span v-if="isFollow===false" @click="[follow(),checkFollow(),followNum()]" class="material-symbols-outlined"><i class="bi bi-person-plus-fill" style="font-size: 2rem; color: #7ee787;"></i></span>
            <span v-else @click="follow" class="material-symbols-outlined"><i class="bi bi-person-check-fill" style="font-size: 2rem; color: #7ee787;"></i></span>
        </div>
        <div class="col text-start me-3 ms-0">
             <p style="color: #eeeeee; font-size:17px;" class="p-0 m-0"><b>followers: {{ followers_len }}</b></p>
             <p style="color: #eeeeee; font-size:17px;"><b>follwings: {{ followings_len }}</b></p>
        </div>  
       
        </span>
        <!-- <span class="material-symbols-outlined" style="color: red;">diversity_1</span> -->



    
        

  </div>

</template>

<script>
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'
export default {
    name: 'YourProfileFollowView',
    data() {
        return {
            isFollow: null,
            followers_len: 0,
            followings_len: 0
,

            profileList: [],
        }
    },
    props: {
        profile: Object,
    },

    computed: {
        // profileList() {
        //     return this.$store.state.profile_list
        // }
    },
    methods: {
        follow: function () {
            axios({
                method: 'post',
                url: `${API_URL}/api/v1/accounts/${this.profile.username}/follow/`,
    
                headers: {
                    Authorization: `Token ${this.$store.state.token}`
                }
            })
            .then((res) => {
                this.$store.commit('REFRESH_PROFILE', res.data)
                console.log(res.data)
                //console.log(res.data.detail)
                if (res.data.detail !== '본인을 팔로우 할 수 없습니다.'){
                        //this.isFollow = !this.isFollow
                       
                        // if (this.isFollow) {
                        // this.followers_len += 1
                        // } else {
                        // this.followers_len -= 1
                        // }
                     
                        // this.followers_len = res.data.followers.length
                        // this.followings_len = res.data.followings.length    
                        this.$emit('refreshProfile', res.data.yours)
                        this.$store.dispatch('getProfile', res.data.mine)
                        
            
                }
                else {
                    alert('본인을 팔로우 할 수 없습니다.')
                }
                
            })
            .catch((err) => { 
                console.log(err)
            })

        
        },

        // myFollow: function () {
        //     axios({
        //         method: 'post',
        //         url: `${API_URL}/api/v1/accounts/${this.profile.username}/my_follow/`,
    
        //         headers: {
        //             Authorization: `Token ${this.$store.state.token}`
        //         }
        //     })
        //     .then((res) => {
        //         this.$store.dispatch('getProfile', res.data)
        //         console.log(res.data.followings)
        //         //console.log(res.data.detail)
              
        //     })
        //     .catch((err) => { 
        //         console.log(err)
        //     })

        
        // },


        checkFollow() {
            axios({
                method: 'get',
                url: `${API_URL}/api/v1/accounts/${this.profile.username}/check_follow/`,
    
                headers: {
                    Authorization: `Token ${this.$store.state.token}`
                }
            })
            .then((res) => {
                //this.$store.commit('REFRESH_PROFILE', res.data)
                //this.$store.commit('REFRESH_PROFILE', res.data)
                //console.log(res.data.followers)
                //console.log(res.data.detail)
                if (res.data.IFollow == true){

                        this.isFollow = true
                       
                        // if (this.isFollow) {
                        // this.followers_len += 1
                        // } else {
                        // this.followers_len -= 1
                        // }
                     
                        // this.followers_len = res.data.followers.length
                        // this.followings_len = res.data.followings.length    
                        // this.$emit('refreshProfile', res.data)
            
                }
                else {
                    this.isFollow = false
                }
            
            })
            .catch((err) => { 
                console.log(err)
            })
        },

        followNum() {
            axios({
                method: 'get',
                url: `${API_URL}/api/v1/accounts/${this.profile.username}/follow_num/`,
    
                headers: {
                    Authorization: `Token ${this.$store.state.token}`
                }
            })
            .then((res) => {
                //this.$store.commit('REFRESH_PROFILE', res.data)
        
                this.followers_len = res.data.followers_num
                this.followings_num = res.data.followings_num
                       
            
            })
            .catch((err) => { 
                console.log(err)
            })
        }


        // nowProfile() {
        //     this.profileList = this.$store.state.profile_list
        //     const id = this.profile.id
        //         // console.log(typeof(id), id)
        //         // console.log(typeof(this.$route.params.userId))
        //         for (let profile of this.profileList) {
        //             if (id === profile.id) {
        //                 this.profile = profile
        //                 console.log(this.profile)
                        
        //             }
            
        //     this.followers_len = this.profile.followers.length
        //     this.followings_len = this.profile.followings.length
                
        //     }
        // },

    },
    created() {

        this.checkFollow()
        this.followNum()

        //this.profileList = this.$store.state.profile_list
        // console.log('followers_len',this.profile.followers.length)
        // console.log('followings_len',this.profile.followings.length)
        // this.followers_len = this.profile.followers.length
        // this.followings_len = this.profile.followings.length
        //this.$store.dispatch('profileList')
        //this.$store.dispatch('getProfile')
        // if (this.profile.followers.includes(this.$store.state.profile.id)) {
        //     this.isFollow = true
        // } else {
        //     this.isFollow = false
        // }
        // if (this.profile.followers.includes(this.$store.state.profile.id)) {
        //     this.isFollow = true
        //     this.followers_len = this.profile.followers.length
        //     this.followings_len = this.profile.followings.length
        // } else {
        //     this.isFollow = false
        //     this.followers_len = this.profile.followers.length
        //     this.followings_len = this.profile.followings.length
        // }
        
    },
    mounted() {
        //this.profileList = this.$store.state.profile_list
        //this.$store.dispatch('profileList')
        //this.$store.dispatch('getProfile')

        // for (let follower of this.profile.followers) {
        //     if (follower.id === this.$store.state.profile.id) {
        //         this.isFollow = true
        //     } else {
        //         this.isFollow = false
        //     }
        // }
        this.followers_len = this.profile.followers.length
        this.followings_len = this.profile.followings.length


        // console.log(this.profile.followers.find(follower => follower.includes(this.$store.state.users[this.$store.state.profile.id])))
        // if (this.profile.followers.includes(this.$store.state.users[this.$store.state.profile.id])) {
        //     this.isFollow = true
            
        // } else {
        //     this.isFollow = false
     
        // }

        console.log(this.profile)
        console.log(this.isFollow)
    },
    watch: {
        isFollow() {
            //this.$router.go()
            // this.followers_len = this.profile.followers.length
            // this.followings_len = this.profile.followings.length
        }
    }

}
</script>

<style>

</style>