<template>
  <div id="Allprofile">
    <div class="mb-4">   
        <img :src=this.imgUrl alt="" style="width:200px; height:20  0px;" class="rounded-circle"><br>
    </div>
    
    <h5>{{ profile?.username }}님의 프로필</h5>
    <YourProfileFollowView :profile="profile"/><br>
     <h5><b>[WatchList]</b></h5>
    <YourWatchListView :profile="profile"/>

    <hr>
    

  </div>
</template>

<script>
//import axios from 'axios'

//const API_URL = 'http://127.0.0.1:8000'

import YourProfileFollowView from '@/views/accounts/YourProfileFollowView'
import YourWatchListView from '@/views/accounts/YourWatchListView'

export default {
    name: 'YourProfileView',
    components: {
        YourProfileFollowView,
        YourWatchListView,
    },
    props: {
  
    },
    data() {
        return {
            profile: [],
            //img_url : `https://avatars.dicebear.com/api/identicon/${this.profile?.username}.svg`,
            profileList: this.$store.state.profile_list,

            userId: Number(this.$route.params.userId),
        }
    },
    computed: {
        imgUrl() {
            return `https://avatars.dicebear.com/api/identicon/${this.profile?.username}.svg`
        },
        refreshProfileCnt() {
            return this.$store.state.refresh_profile
        }

      
        
    },
    methods: {
        nowProfile() {
            this.profileList = this.$store.state.profile_list
            const id = this.userId
                // console.log(typeof(id), id)
                // console.log(typeof(this.$route.params.userId))
                for (let profile of this.profileList) {
                    if (id === profile.id) {
                        this.profile = profile
                        // console.log(this.profile)
                        
                    }
                
            }
        },
        
    },
    created() {
        this.nowProfile()
        //this.profile = this.$store.state.profile
        //this.$router.go(this.$router.currentRoute)

    },
    mounted() {
        this.nowProfile()
        //this.profile = this.$store.state.profile
        //this.$router.go(this.$router.currentRoute)
    },
    watch: {
        // userName: function() {
        //     this.getProfile()
        //     this.profile = this.$store.state.profile
            
        // },

        refreshProfileCnt() {
            this.nowProfile()
            //this.$router.go(this.$router.currentRoute)
        }
    }
}
</script>

<style>
    #Allprofile {
        color: white;
    }
</style>