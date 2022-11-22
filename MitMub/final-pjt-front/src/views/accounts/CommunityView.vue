<template>
  <div>
        
       <div>
        <UserInfoView v-for="(other,idx) in others" :key="idx"
        :other="other"
        :idx="idx"
        />
       </div>
        
 


  </div>
</template>

<script>
import UserInfoView from '@/views/accounts/UserInfoView'

export default {
    name: 'CommunityView',
    components: {
        UserInfoView,

    },
    data() {
        return {
            others: [],
        }
    },
    computed: {
        users() {
            return this.$store.state.users
        },

        profileList() {
            return this.$store.state.profile_list
        },

    
    },
    methods: {
        getOthers() {
            for (let user of this.users) {
                if (user.id != this.$store.state.profile.id) {
                    this.others.push(user)
                }
            }
        }
    },
    created() {
        this.getOthers()
    }
}
</script>

<style>

</style>