<template>
  <div id="Allprofile">
    <div class="mb-4">   
        <img :src=this.imgUrl alt="" style="width:200px; height:20  0px;" class="rounded-circle"><br>
    </div>
    
    <h5><b style="color: #7ee787;">{{ profile?.username }}</b>님의 프로필</h5>
    <YourProfileFollowView :profile="profile" @refreshProfile="refreshProfile"/><br>
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
        other: Object,
  
    },
    data() {
        return {
            profile: [],
            //img_url : `https://avatars.dicebear.com/api/identicon/${this.profile?.username}.svg`,
            profileList: [],

            //userId: Number(this.$route.params.userId),
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
            const id = this.other.id
                //console.log(typeof(id), id)
                //console.log(typeof(this.$route.params.userId))
                for (let profile of this.profileList) {
                    if (id === profile.id) {
                        this.profile = profile
                        //console.log(this.profile)

                    }
                
            }
        },

        refreshProfile(profile) {
            //this.$store.dispatch('refreshProfile', profile)
            //this.nowProfile()
            this.$emit('refreshProfile', profile)
            console.log(33333333333,profile)
            this.profile = profile
            console.log(33333333333,this.profile)

        }
        
    },
    created() {
        //this.profileList = this.$store.state.profile_list
        this.nowProfile()
        //this.$store.dispatch('refreshProfile', this.profile)
        //this.profile = this.$store.state.profile
        //this.$router.go(this.$router.currentRoute)

    },
    mounted() {
        //this.profileList = this.$store.state.profile_list
        this.nowProfile()
        //this.$store.dispatch('refreshProfile', this.profile)

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
            this.$router.push({name:'CommunityView'})
            console.log(this.profile)
            
        }
    }
}
</script>

<style>
    #Allprofile {
        color: white;
    }
</style>