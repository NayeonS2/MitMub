<template>
  <div>
        
        <ProfileView :user="userProfile.username"/>

        <YourProfileView v-for="(following,idx) in this.followings" :key="idx"
        :following="following"
        :idx="idx"
        />
 


  </div>
</template>

<script>
import YourProfileView from '@/views/accounts/YourProfileView'
import ProfileView from '@/views/accounts/ProfileView'
export default {
    name: 'CommunityView',
    components: {
        YourProfileView,
        ProfileView
    },
    data() {
        return {
            userProfile: this.$store.state.profile
            
        }
    },
    computed: {
        users() {
            return this.$store.state.users
        },

        profileList() {
            return this.$store.state.profile_list
        },

        followings() {
            return this.userProfile.followings
        }
    }
}
</script>

<style>

</style>