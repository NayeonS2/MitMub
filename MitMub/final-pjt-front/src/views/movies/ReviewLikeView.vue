<template>
  <div>
    <div class="row">
        <div class="col-6" >
            
            <span v-if="isLike" @click="likeReview">💗</span>
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
            like_review: this.review.like_users,
            like_review_len: this.review.like_users.length,
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
                this.isLike = !this.isLike
                if (this.isLike) {
                    this.like_review_len += 1
                } else {
                    this.like_review_len -= 1
                }
                //this.$router.go()
                this.$store.dispatch('getReviews')
                this.$store.commit('ADD_REFRESH_REVIEW_LIKE')
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
      //this.update_like()
  },


  mounted() {
        this.like_review= this.review.like_users
        this.like_review_len= this.review.like_users.length

        if (this.like_review.includes(this.$store.state.profile.id)) {
            this.isLike= true
        } else {
          this.isLike= false
        }

        
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