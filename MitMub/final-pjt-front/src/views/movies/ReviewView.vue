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
// import _ from "lodash"
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
            oldReviews: [],
            reviews: this.$store.state.reviews
        }
    },
    computed: {
        reviewNum() {
            return this.$store.state.reviews.length
        },
        // reviews() {
        //     return this.$store.state.reviews
        // }
        refreshCreateRevCnt() {
            return this.$store.state.refresh_create_rev
        },
        refreshUpdateRevCnt() {
            return this.$store.state.refresh_update_rev
        },
        refreshDeleteRevCnt() {
            return this.$store.state.refresh_delete_rev
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

        handleChange (newVal) {
            // Handle changes here!
            console.log(newVal);
            this.$router.go(this.$router.currentRoute)
        },

    },
    created() {
        this.getReviews()

        this.reviews.forEach((val) => {
        this.$watch(() => val, this.handleChange, {deep: true});
        });
        
    },
    mounted() {
        
    },

    watch: {
        reviewNum: function(new_val,old_val) {
            console.log(new_val,old_val)

            this.$router.push({name:'ReviewView'})
        },
        refreshCreateRevCnt: function(new_val,old_val) {
            console.log(new_val,old_val)

            this.$router.go(this.$router.currentRoute)
        },
        refreshUpdateRevCnt: function(new_val,old_val) {
            console.log(new_val,old_val)

            this.$router.go(this.$router.currentRoute)
        },
        refreshDeleteRevCnt: function(new_val,old_val) {
            console.log(new_val,old_val)

            this.$router.go(this.$router.currentRoute)
        },


        // reviews: {
        //     handler: function (after, before) {
        //         // Return the object that changed
            
        //         let changed = after.filter( function( p, idx ) {
        //         return Object.keys(p).some( function( prop ) {
        //             return p[prop] !== this.oldReviews[idx][prop];
        //         })
        //         })
        //         // Log it
        //         this.setValue();
        //         console.log(changed, before)
        //         this.$router.push({name:'ReviewView'})
        //     },
        //         deep: true,
        //     }

        // reviews: {
            
        //     handler(new_v, old_v) {
        //         //this.$router.push({name:'ReviewView'})
        //         console.log(new_v,old_v)
                
        //     },
        //     deep: true,
        // }


        
    },

}
</script>

<style>

</style>