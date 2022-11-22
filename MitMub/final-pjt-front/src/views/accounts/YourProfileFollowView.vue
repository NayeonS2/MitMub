<template>
  <div>
     
        <span v-if="isFollow" @click="follow"><i class="bi bi-person-hearts" style="color: red;"></i></span>
        <span v-else @click="follow"><i  class="bi bi-person-plus" style="color: red;"></i></span>

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
            isFollow: false,
            followers_len: 0,
            followings_len: 0,
        }
    },
    props: {
        profile: {},
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
                //this.$store.commit('ADD_REFRESH_PROFILE')
                if (res.data.detail !== '본인을 팔로우 할 수 없습니다.'){
                    this.isFollow = !this.isFollow
                    if (this.isFollow) {
                    this.followers_len += 1
                    } else {
                    this.followers_len -= 1
                    }
            
                }
                else {
                    alert('본인을 팔로우 할 수 없습니다.')
                }
            })
            .catch((err) => { 
                console.log(err)
            })
        },
    }

}
</script>

<style>

</style>