<template>
  <div>
    <div class="row">
        <div class="col-6" >
            
            <span v-if="isLike" @click="[likeReview(),checkLike()]">💗</span>
            <span v-else @click="likeReview">🤍</span>
            <span>LIKE {{like_review_len}}</span>
        </div>
      

    </div>
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'
export default {
    name: 'ReviewLikeView',
    data() {
        return {
            like_review: null,
            like_review_len: 0,
            isLike: false
        }
    },
    props: {
        review: Object,
    },
    computed: {
        reviewCnt() {
            return this.review.like_users.length
        },
        likeUsers() {
          return this.review.like_users
        }
    },
    methods: {
      likeReview: function () {
     
      axios({
            method: 'post',
            url: `${API_URL}/api/v1/movies/like_review/${this.review.id}/`,
   
            headers: {
                Authorization: `Token ${this.$store.state.token}`
            }
            })
            .then((res) => {
                console.log(res)
                //this.isLike = !this.isLike
                // if (this.isLike) {
                //     this.like_review_len += 1
                // } else {
                //     this.like_review_len -= 1
                // }
                // //this.$router.go()

                //this.$store.commit('REFRESH_REVIEW', res.data)
           
                this.like_review = res.data.like_users
                this.like_review_len = res.data.like_users.length
                this.$emit('refreshReview', res.data)
                this.$store.dispatch('getReviews')
                this.$store.commit('REFRESH_REVIEW' , res.data)
                })
                .catch((err) => { 
                console.log(err)
                })
    },

    checkLike: function () {
     
      axios({
            method: 'get',
            url: `${API_URL}/api/v1/movies/check_like/${this.review.id}/`,
   
            headers: {
                Authorization: `Token ${this.$store.state.token}`
            }
            })
            .then((res) => {
                console.log(res)
                // this.isLike = !this.isLike
                // if (this.isLike) {
                //     this.like_review_len += 1
                // } else {
                //     this.like_review_len -= 1
                // }
                // //this.$router.go()
                if (res.data.isLike === true) {
                  this.isLike = true
                } else {
                  this.isLike = false
                }
                })
                .catch((err) => { 
                console.log(err)
                })
    },




    // update_like: function () {
    //   for (var i in this.like_review) {
    //     for (var user of this.$store.state.users) {
    //       if (this.like_review[i] == user.id){
    //         this.like_review[i] = user.username
    //       }
    //     }
    //   }
    //   for (var j in this.like_review) {
    //     if (this.like_review[j] == this.$store.state.username) {
    //       return this.isLike = true
    //     }
    //   }
    //   this.isLike = false
    // }
  },
  created: function () {
      this.checkLike()
      //this.like_review= this.review.like_users
      //this.like_review_len= this.review.like_users.length
      //this.update_like()
      

  },


  mounted() {
        //this.checkLike()
        this.like_review= this.review.like_users
        this.like_review_len= this.review.like_users.length

 

        
  },

  watch: {
    likeUsers: {
       
      handler: function (val) {
        console.log("val", val); // {title: '', contens: '변경'}
        //this.$router.push({name:'HomeView'})
        //this.update_like()
        this.like_review = this.review.like_users,
        this.like_review_len = this.review.like_users.length

      },
      deep: true,
  
        
    
    },

    
  },

    
}
</script>

<style>

</style>