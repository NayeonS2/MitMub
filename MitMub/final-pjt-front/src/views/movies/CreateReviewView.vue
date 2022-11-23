<template>
  <div class="container">
    <h2>리뷰 작성✍</h2>
    <div class="row mt-5">
        <div class="col-4">
            <p>영화 제목 : {{ movie.title }}</p>
            <img :src="imgSrc" alt="포스터 없음" class="img-fluid rounded" style="width: 318px; height: 450px;" />
        </div>
        
        <div class="col-8">
            <form @submit.prevent="createReview">
                <label for="title">제목 : </label>
                <input type="text" id="title" class="form-control" v-model.trim="title"><br>

                <label for="rank" placeholder="1 ~ 10까지의 숫자를 입력해주세요.">평점 : </label>
                <!-- <select v-model="rank" multiple>
                        <option :value="{rank: 1}">1</option>
                        <option :value="{rank: 2}">2</option>
                        <option :value="{rank: 3}">3</option>
                        <option :value="{rank: 4}">4</option>
                        <option :value="{rank: 5}">5</option>
                </select> -->
                <input type="text" id="rank" class="form-control" v-model.trim="rank"><br>
                <div class="input-group">
                    <span class="input-group-text">리뷰 :</span>
                    <textarea id="content" cols="30" rows="10" v-model="content" class="form-control" aria-label="With textarea" @keypress.enter="createReview"></textarea>
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
    name: 'CreateReviewView',
    data() {
        return {
            movie: null,
            rank: '',
            title: '',
            content: '',

  

        }
    },
    computed: {
        imgSrc () {
            return "https://image.tmdb.org/t/p/original" + this.movie.poster_path
         },
         movies(){
            return this.$store.state.movies
        },
        nowUser() {
            return this.$store.state.profile.username
        }
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
            const id = this.$route.params.movieId
            console.log(id)
            for(const movie of this.movies) {
                if(movie.id === Number(id)){
                this.movie = movie
                break
                }
                }
            if (this.movie === null){
                this.$router.push({name: 'NotFound404'})
            }
        },
        createReview() {
            const MovieReview = {
                movie: this.movie.id,
                like_users: this.movie.like_users,
                title: this.title,
                content: this.content,
                rank: this.rank,
                poster: this.movie.poster_path,
                
            }

            if (MovieReview.title && MovieReview.content) {

                axios({
                    method: 'post',
                    url: `${API_URL}/api/v1/movies/create_review/${this.movie.id}/`,
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
                    this.$store.commit('ADD_REFRESH_CR')
                    //this.$store.state.refresh ++
                    console.log(res)
                    //this.$emit('refresh_emit')
                    window.alert("글작성이 완료되었습니다.")
                    this.title = ''
                    this.content = ''
                    this.rank = ''
                    
                    this.$store.dispatch('getReviews')
                    this.$router.push({name:'ReviewView'})
                    

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
        this.getMovieById()
    },
    mounted() {
        
    },
    
  

}
</script>

<style>

</style>