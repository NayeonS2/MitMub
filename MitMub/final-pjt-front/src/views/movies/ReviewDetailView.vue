<template>
  <div>
    <div class="container">
      <div class="row mt-5">
        <div class="col-2"></div>
        <div class="col-3 ms-4">
          <img :src="imgSrc" alt="포스터 없음" class="img-fluid rounded" style="width: 318px; height: 450px;" />
        </div>
        <div class="col-4">
          <div class="card-body">
            <h5 class="card-title">영화 : {{ movie?.title }}</h5><br>
            <h5 class="card-title">리뷰제목 : {{ review?.title }}</h5>
            <p class="card-text"><p>평점 : {{ review?.rank }}</p>
            <p class="card-text">내용 : {{ review?.content }}</p>
            <p class="card-text"><small class="text-muted">Created at {{created_at}}</small></p>
            <p class="card-text"><small class="text-muted">Last updated at {{updated_at}}</small></p>

            <span class="row ms-4"><CommentListView :review="review"/></span>
            <span class="row ms-4"><CreateCommentView :review="review"/></span>
          </div>

          
        </div>
        <div class="col-2 position-relative">
            <div class="position-absolute bottom-0 end-5">
                
                    <div class="row">
                        <router-link v-if="review.user === this.nowUser" :to="{ name: 'UpdateReviewView', params: { reviewId: review.id } }">수정하기</router-link>
                    </div>
                    <div class="row">
                        <a href="#" v-if="review.user === this.nowUser" @click.prevent="deleteReview">삭제하기</a>
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

const API_URL = 'http://127.0.0.1:8000'
export default {
    name: 'ReviewDetailView',
    components: {
        CreateCommentView,
        CommentListView,
    },
    data() {
        return {
            movie: null,
            review: null,

            // user: this.review.user,
            // rank: this.review.rank,
            // title: this.review.title,
            // content: this.review.content,
            poster: null,
          
            created_at: null,
            updated_at: null,
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
                    console.log(res)
                    //this.$emit('refresh_emit')
                    window.alert("리뷰 삭제가 완료되었습니다.")
                    // this.title = ''
                    // this.content = ''
                    // this.rank = []
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
      
    }
    
}
</script>

<style>

</style>