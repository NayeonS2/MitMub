<template>
  <div>
    <div class="mb-4">   
        <img :src=this.imgUrl alt="" style="width:200px; height:20  0px;" class="rounded-circle"><br>
        <router-link :to="{ name: 'YourProfileView', params: {userId: Number(profile.id)} }"><span>{{profile.username}}</span></router-link>
        <hr>
    </div>

  </div>
</template>

<script>
export default {
    name: 'UserInfoView',
    data() {
        return {
            profile: [],
        }
    },
    props: {
        other: Object,
        
        
    },

    computed: {
        imgUrl() {
            return `https://avatars.dicebear.com/api/identicon/${this.profile?.username}.svg`
        },
        
    },
    methods: {
        nowProfile() {
            this.profileList = this.$store.state.profile_list
            const id = this.other.id
 
                for (let profile of this.profileList) {
                    if (id === profile.id) {
                        this.profile = profile
                        break
                    }
                
            }
        },

        moveToProfile(userId) {
            this.$router.push({name: 'YourProfileView', params: {userId: userId}})
        }
        
    },
    created() {
        this.nowProfile()
        //this.profile = this.$store.state.profile
        //this.$router.go(this.$router.currentRoute)

    },
    mounted() {
        //this.nowProfile()
        //this.profile = this.$store.state.profile
        //this.$router.go(this.$router.currentRoute)
    },

}
</script>

<style>

</style>