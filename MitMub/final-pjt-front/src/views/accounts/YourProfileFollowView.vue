<template>
  <div>
        <span>
 
        <span v-if="isFollow===false" @click="follow" class="material-symbols-outlined">person_add</span>
        <span v-else @click="follow" class="material-symbols-outlined">diversity_1</span>
        </span>
        <!-- <span class="material-symbols-outlined" style="color: red;">diversity_1</span> -->



    
    <p>followers: {{ followers_len }} </p>
    <p>follwings: {{ followings_len }} </p>

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
            followings_len: 0,

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
                this.$store.commit('ADD_REFRESH_PROFILE')
                console.log(res.data.followers)
                console.log(res.data.detail)
                if (res.data.detail !== '본인을 팔로우 할 수 없습니다.'){
                        this.isFollow = !this.isFollow
                     
                        this.followers_len = res.data.followers.length
                        this.followings_len = res.data.followings.length    
                    
            
                }
                else {
                    alert('본인을 팔로우 할 수 없습니다.')
                }
                //this.$router.go()
                
            
            })
            .catch((err) => { 
                console.log(err)
            })
        
        },

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
        //this.$store.dispatch('profileList')
        //this.$store.dispatch('getProfile')
        // if (this.profile.followers.includes(this.$store.state.profile.id)) {
        //     this.isFollow = true
        // } else {
        //     this.isFollow = false
        // }
        if (this.profile.followers.includes(this.$store.state.profile.id)) {
            this.isFollow = true
            this.followers_len = this.profile.followers.length
            this.followings_len = this.profile.followings.length
        } else {
            this.isFollow = false
            this.followers_len = this.profile.followers.length
            this.followings_len = this.profile.followings.length
        }
        
    },
    mounted() {
        //this.$store.dispatch('profileList')
        //this.$store.dispatch('getProfile')
        console.log(this.profile)
        console.log(this.isFollow)
        if (this.profile.followers.includes(this.$store.state.profile.id)) {
            this.isFollow = true
            this.followers_len = this.profile.followers.length
            this.followings_len = this.profile.followings.length
        } else {
            this.isFollow = false
            this.followers_len = this.profile.followers.length
            this.followings_len = this.profile.followings.length
        }
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