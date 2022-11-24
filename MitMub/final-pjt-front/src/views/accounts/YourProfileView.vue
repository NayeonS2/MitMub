<template>
  <div id="Allprofile" :style="style"  @click="moveDetail">
    
     <h3>🛸</h3>
    <div class="mb-1">
            
        <img :src=this.imgUrl alt="" style="width:90px; height:20  0px; background-color: #ffffff; border-style: solid;" class="rounded-circle"><br>
    </div>
    
    
    <div><p style="color: #FFEBF0;"><b><p><b style="color: #7ee787; font-family: 'Abel', sans-serif;">{{ profile?.username }}</b></p></b></p></div>
    <!-- <div v-if="isStatusOn">
        <YourProfileFollowView :profile="profile" @refreshProfile="refreshProfile"/><br>
        <h5><b>[WatchList]</b></h5>
        <YourWatchListView :profile="profile"/>
    </div> -->

    

  </div>
</template>

<script>
//import axios from 'axios'

//const API_URL = 'http://127.0.0.1:8000'
import _ from 'lodash'
// import YourProfileFollowView from '@/views/accounts/YourProfileFollowView'
// import YourWatchListView from '@/views/accounts/YourWatchListView'

export default {
    name: 'YourProfileView',
    components: {
        // YourProfileFollowView,
        // YourWatchListView,
    },
    props: {
        other: Object,
  
    },
    data() {
        return {
            style: {
            position:'absolute',
            top : `${_.sample([100,220,370,600])}px`,
            left: `${_.sample([100,250,350,450,550,650,750,850,950,1050,1150,1250,1350,1450,1550,1650,1750])}px`,
            animation:'ani 1s infinite alternate',
            width: '230px'
            },  
            
            profile: [],
            //img_url : `https://avatars.dicebear.com/api/identicon/${this.profile?.username}.svg`,
            profileList: [],
            isStatusOn: false,

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

        moveDetail() {
            this.$router.push({name: 'YourDetailProfileView', params: {'userId':Number(this.other.id)}})
        },


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
            //console.log(33333333333,profile)
            this.profile = profile
            //console.log(33333333333,this.profile)

        },

        toggleOnOff: function() {
          this.isStatusOn = !this.isStatusOn;
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
            //console.log(this.profile)
            
        }
    }
}
</script>

<style>
    #Allprofile {
        color: white;
    }
</style>