<template>
  <div id="reviewDetail">
    <div class="container">
      <div class="row mt-5">
        <div class="col-2"></div>
        <div class="col-3 ms-4">
          <img :src="imgSrc" alt="포스터 없음" class="img-fluid rounded" style="width: 318px; height: 450px;" />
        </div>
        <div class="col-4">
          <div class="card-body">
            <h5 class="card-title">영화 : {{ movie?.title }}</h5><br>
            <h5 class="card-title">리뷰제목 : {{ nowReview?.title }}</h5>
            <p class="card-text">작성자 : {{ nowReview?.user }}</p>
            <p class="card-text"><p>평점 : {{ nowReview?.rank }}</p>
            <p class="card-text">내용 : {{ nowReview?.content }}</p>
            <p class="card-text"><small class="text-muted">Created at {{created_at}}</small></p>
            <p class="card-text"><small class="text-muted">Last updated at {{updated_at}}</small></p>

            <span class="row ms-4"><CommentListView :review="review"/></span>
            <span class="row ms-4"><ReviewLikeView :review="review"/></span>
            
            <span class="row ms-4"><CreateCommentView :review="review"/></span>
          </div>

          
        </div>
        <div class="col-2 position-relative">
            <div class="position-absolute bottom-0 end-5">
                
                    <div class="row">
                        <router-link v-if="this.review.user === this.$store.state.profile.id" :to="{ name: 'UpdateReviewView', params: { reviewId: review.id } }">수정하기</router-link>
                    </div>
                    <div class="row">
                        <a href="#" v-if="this.review.user === this.$store.state.profile.id" @click.prevent="deleteReview">삭제하기</a>
                    </div>
            
            </div>

            
                    
        </div>
                
            </div>
            
        </div>
      
  </div>
</template>

<script>
import axios from 'axios'

import CreateCommentView from '@/views/movies/CreateCommentView'
import CommentListView from '@/views/movies/CommentListView'
import ReviewLikeView from '@/views/movies/ReviewLikeView'

const API_URL = 'http://127.0.0.1:8000'
export default {
    name: 'ReviewDetailView',
    components: {
        CreateCommentView,
        CommentListView,
        ReviewLikeView,
    },
    data() {
        return {
            movie: null,
            review: null,
            user: null,

            userId: null,

            profile: [],

            // user: this.review.user,
            // rank: this.review.rank,
            // title: this.review.title,
            // content: this.review.content,
            poster: null,
          
            created_at: null,
            updated_at: null,

            config: {
                nowTitle: '',
                nowRank: '',
                nowContent: '', 
            },
            
            profileList: []


        }
    },
    computed: {
        imgSrc () {
            return "https://image.tmdb.org/t/p/original" + this.poster
         },
        movies(){
            return this.$store.state.movies
        },
        reviews(){
            return this.$store.state.reviews
        },
        nowUser() {
            return this.$store.state.profile.username
        },
        nowReview() {
            return this.review
        },
        reviewNum() {
            return this.$store.state.reviews.length
        },
        refreshCreateCommentCnt() {
            return this.$store.state.refresh_create_com
        },
        refreshDeleteCommentCnt() {
            return this.$store.state.refresh_delete_com
        },

        reviewLike() {
            return this.review.like_users.length
        },

        refreshDetailCnt() {
            return this.$store.state.refresh_detail
        }

    },
    methods: {
      getMovieById(){
            const id = this.review.movie
            //console.log(id)
            for(const movie of this.movies) {
                if(movie.id === Number(id)){
                this.movie = movie
                this.poster = this.movie.poster_path
                break
                }
                }

            
        },

        getReviewById(){
            const id = this.$route.params.reviewId
            console.log(id)
            for(const review of this.reviews) {
                if(review.id === Number(id)){
                this.review = review
                this.created_at = review.created_at.substring(0, 10) + ' ' + review.created_at.substring(11, 19)
                this.updated_at = review.updated_at.substring(0, 10) + ' ' + review.updated_at.substring(11, 19)
                break
                }
                }

        },

        nowProfile() {
            this.profileList = this.$store.state.profile_list
            
        
                for (var profile of this.profileList) {
                    if (this.review.user=== profile.username) {
                        this.userId = profile.id
                        break
                    }
                
            }
        },

        moveProfile(userId) {
            this.$router.push({name: 'YourProfileView', params: {userId}})
        },


        deleteReview() {
            alert("정말 삭제하시겠습니까?")
            axios({
                    method: 'delete',
                    url: `${API_URL}/api/v1/movies/update_review/${this.review.id}`,
                    
                    headers: {
                        Authorization: `Token ${this.$store.state.token}`
                    }
                })
                .then((res) => {
                    this.$store.commit('ADD_REFRESH_DR')
                    //this.$store.state.refresh ++
                    console.log(res)
                    //this.$emit('refresh_emit')
                    window.alert("리뷰 삭제가 완료되었습니다.")
                    // this.title = ''
                    // this.content = ''
                    // this.rank = []
                    this.$store.dispatch('getReviews')
                    this.$router.push({ name: 'ReviewView' })
                })
                .catch((err) => {
                console.log(err)
                })
                
        }
    },
    created() {
      this.getReviewById()
      this.getMovieById()
      this.nowProfile()
 
      
    },
    mounted() {
    this.getReviewById()
    this.getMovieById()
    //this.nowProfile()

    this.user = this.review.user

    console.log(this.user, this.review.user)

    this.config.nowTitle = this.review.title
    this.config.nowRank  = this.review.rank
    this.config.nowContent = this.review.content
    //this.$router.go(this.$router.currentRoute)
    },
    updated() {
        
    },

    watch: {
        reviewNum: function(new_val,old_val) {
            console.log(new_val,old_val)

            this.$router.go(this.$router.currentRoute)
        },
        refreshCreateCommentCnt: function(new_val,old_val) {
            console.log(new_val,old_val)

            this.$router.go(this.$router.currentRoute)
        },
        refreshDeleteCommentCnt: function(new_val,old_val) {
            console.log(new_val,old_val)

            this.$router.go(this.$router.currentRoute)
        },
         config: function (val, oldVal) {
            this.$router.push({name:'ReviewDetailView'})
            console.log(val, oldVal)
            
            
         },



         refreshReviewLikeCnt: function(new_val,old_val) {
            console.log(new_val,old_val)

            this.getReviewById()
        },


        refreshDetailCnt: function(new_val,old_val) {
            console.log(new_val,old_val)
            //this.getReviewById()
            //this.user = this.review.user
            this.$router.go(this.$router.currentRoute)
        },
    }
    
}
</script>

<style>
    #reviewDetail *{
        color: white;
        font-family: 'Nanum Gothic', sans-serif;
    }
</style>