<template>
  <div>

    
    <h3><b>All Reviews 📝</b></h3><br>

    <div v-for="(review, idx) in movie_reviews" :key="idx" style="margin: 2% 20%;">
        <div class="ms-5">
            <ReviewListView :review="review"/>
        
        </div>
      
    </div>
    <div v-if="movie_reviews.length === 0" style="height: 200px;" class="d-flex justify-content-center align-items-center">
      <h3>작성된 리뷰가 없습니다.</h3>
    </div>
  </div>
</template>
    
<script>

import ReviewListView from '@/views/movies/ReviewListView'
//import axios from'axios'

//const API_URL = 'http://127.0.0.1:8000'

export default {
    name: 'ReviewView',
    components: {
        ReviewListView
    },
    data() {
        return {
            movie_reviews: [],
        }
    },
    methods: {
        getReviews() {

            this.movie_reviews = this.$store.state.reviews

       
            for (var review of this.movie_reviews) {
                for (var user of this.$store.state.users) {
                if (review.user == user.id){
                    review.user = user.username
                        }
                    }
                }
        
        },

    },
    created() {
        this.getReviews()
        
    },
}
</script>

<style>

</style>