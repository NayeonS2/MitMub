<template>
        

        
       <div>
        <YourProfileView v-for="(other,idx) in others" :key="idx"
        :other="other"
        :idx="idx"
        @refreshProfile="refreshProfile"
        />
       </div>
        
 



</template>

<script>
import YourProfileView from '@/views/accounts/YourProfileView'

export default {
    name: 'CommunityView',
    components: {
        YourProfileView,

    },
    data() {
        return {
           
            others: [],
            profileList: [],
            users: [],
        }
    },
    computed: {
        refreshProfileCnt() {
            return this.$store.state.refresh_profile
        }
        // users() {
        //     return this.$store.state.users
        // },

        // profileList() {
        //     return this.$store.state.profile_list
        // },

    
    },
    methods: {
        getOthers() {
            this.profileList = this.$store.state.profile_list
            for (let profile of this.profileList) {
                if (profile.id != this.$store.state.profile.id) {
                    this.others.push(profile)
                }
            }
        },
        refreshProfile(newProfile) {
            //this.$store.dispatch('refreshProfile', profile)
            //this.nowProfile()
            this.profileList = this.$store.state.profile_list
            for (let profile of this.profileList) {
                if (profile.id === newProfile.id) {
                    this.profile = newProfile
            
            this.getOthers()

            


        }
        setTimeout(function() {
        location.reload()
        }, 200);
        
            }
    }
    },

    created() {
        this.profileList = this.$store.state.profile_list
        //this.profileList = this.$store.state.profile_list
        //this.users = this.$store.state.users
        this.getOthers()
    },
    mounted() {
        //this.refreshProfile()
        //this.profileList = this.$store.state.profile_list
        //this.getOthers()
     
 

        // var myTimer = setTimeout( function() {
            
        //     //location.reload()
            
        // }, 1000)
      
        
        // //this.popularMovies()
        // if (success == 2) {clearTimeout(myTimer)}

        // },

        //this.users = this.$store.state.users
        //this.getOthers()
        //console.log(this.profileList)
    },
    watch: {
        // userName: function() {
        //     this.getProfile()
        //     this.profile = this.$store.state.profile
            
        // },

        refreshProfileCnt() {
            
            location.reload()
            //console.log(this.profile)
            
        }
    }
}
</script>

<style>

</style>