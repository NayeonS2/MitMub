<template>
  <div class="container">
    <h2>리뷰 수정✍</h2>
    <div class="row mt-5">
        <div class="col-4">
            <p>영화 제목 : {{ movie?.title }}</p>
            <img :src="imgSrc" alt="포스터 없음" class="img-fluid rounded" style="width: 318px; height: 450px;" />
        </div>
        
        <div class="col-8">
            <form @submit.prevent="updateReview">
                <label for="title">제목 : </label>
                <input type="text" :value="title" id="title" class="form-control" @input="title=$event.target.value"><br>

                <label for="rank">평점 : </label>
                <!-- <select v-model="rank" multiple>
                        <option :value="{rank: 1}">1</option>
                        <option :value="{rank: 2}">2</option>
                        <option :value="{rank: 3}">3</option>
                        <option :value="{rank: 4}">4</option>
                        <option :value="{rank: 5}">5</option>
                </select> -->
                <input type="text" :value="rank" id="rank" class="form-control" @input="rank=$event.target.value"><br>
                <div class="input-group">
                    <span class="input-group-text">리뷰 :</span>
                    <textarea id="content" :value="content" cols="30" rows="10" class="form-control" aria-label="With textarea" @input="content=$event.target.value"></textarea>
                </div>
                <!-- <label for="content">리뷰 : </label>
                <textarea id="content" cols="30" rows="10" v-model="content"></textarea><br> -->
                <!-- <input type="submit" id="submit" class="form-control"> -->
                <button class="btn btn-primary form-control mt-4" type="submit">제출</button>
            </form>

        </div>
    </div>
    
    
  </div>
</template>

<script>

import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
    name: 'UpdateReviewView',
    data() {
        return {
            movie: null,
            review: null,
            rank: '',
            title: '',
            content: '',

            

            // user: this.review.user,
            // rank: this.review.rank,
            // title: this.review.title,
            // content: this.review.content,
            poster: null,
          
        }
    },
    computed: {
        imgSrc () {
            return "https://image.tmdb.org/t/p/original" + this.movie.poster_path
         },
        movies(){
            return this.$store.state.movies
        },
        reviews(){
            return this.$store.state.reviews
        },
        now_review() {
            return this.review
        },
        
    },
    methods: {
        // movieInfo() {
        //     axios({
        //         method: 'get',
        //         url: `${API_URL}/api/v1/movies/${this.$route.params.movieId}/`
        //     })
        //         .then((res) => {
        //         console.log(res)
        //         this.movie = res.data
        //         })
        //         .catch((err) => {
        //         console.log(err)
        //         })
        // },
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
                console.log(review)

                this.rank = review.rank
                this.title = review.title
                this.content = review.content
                break
                }
                }

        },
        updateReview() {
            const MovieReview = {
                movie: this.movie.id,
                like_users: this.movie.like_users,
                title: this.title,
                content: this.content,
                rank: this.rank,
                poster: this.review.movie.poster_path,
                
            }

            if (MovieReview.title && MovieReview.content) {

                axios({
                    method: 'put',
                    url: `${API_URL}/api/v1/movies/update_review/${this.review.id}/`,
                    data: {
                        movie: MovieReview.movie,
                        like_users: this.movie.like_users,
                        title: MovieReview.title,
                        content: MovieReview.content,
                        rank: MovieReview.rank,
                    },
                    headers: {
                        Authorization: `Token ${this.$store.state.token}`
                    }
                })
                .then((res) => {
                    this.$store.commit('ADD_REFRESH_UR')
                    //this.$store.state.refresh ++ 
                    console.log(res)
                    //this.$emit('refresh_emit')
                    window.alert("리뷰 수정이 완료되었습니다.")
                    // this.title = ''
                    // this.content = ''
                    // this.rank = []
                    this.$store.dispatch('getReviews')
                    this.$router.go(this.$router.currentRoute)
                    
                })
                .catch((err) => {
                console.log(err)
                })
                }
            else {
                window.alert("내용을 입력해주세요.")
            }

        }
    },

    created() {
        this.getReviewById()
        this.getMovieById()
        
        
    },
    updated() {
        
    }

}
</script>

<style>

</style>