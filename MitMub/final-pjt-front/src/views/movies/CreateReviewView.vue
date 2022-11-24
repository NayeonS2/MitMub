<template>
  <div id="create-review" class="container">

    <!-- SVG 불러오는 부분 -->
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
      <symbol id="check-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
      </symbol>
      <symbol id="info-fill" viewBox="0 0 16 16">
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
      </symbol>
      <symbol id="exclamation-triangle-fill" viewBox="0 0 16 16">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      </symbol>
    </svg>

    <h2>리뷰 작성✍</h2>
    <div class="row mt-5">
      <div class="col-4">
        <h5>{{ movie.title }}</h5>
        <img :src="imgSrc" alt="포스터 없음" class="img-fluid rounded" style="width: 318px; height: 450px;" />
      </div>
      
      <div class="col-8">
        <br>
        <br>
        <form @submit.prevent="createReview">
          <div class="row" >
            <p for="title" class="col-2 p-1 m-1" style="width: 70px;">제목 </p>
            <input type="text" id="title" class="form-control col-10 px-0" v-model.trim="title" style="width:790px;" placeholder="    제목을 입력해주세요.">
          </div>
          <br>
          <div class="row" >
            <p for="rank" class="col-2 p-1 m-1" style="width: 70px">평점 </p>
            <input type="text" id="rank" class="form-control col-10 px-0" v-model.trim="rank" placeholder="    1 ~ 10까지의 숫자를 입력해주세요." style="width:790px;">
          </div>
          <br>
          <div class="row">
            <p for="review-textarea" class="col-2 p-1 m-1" style="width: 70px">리뷰 </p>
            <textarea class="form-control col-10 px-0" cols="30" rows="10" aria-label="With textarea" style="width:790px;" placeholder="    내용을 입력해주세요." v-model.trim="content"></textarea>
            <!-- <span class="input-group-text">리뷰 :</span>
            <textarea id="content" cols="30" rows="10" v-model="content" class="form-control" aria-label="With textarea" @keypress.enter="createReview"></textarea> -->
          </div>
          <!-- <label for="content">리뷰 : </label>
          <textarea id="content" cols="30" rows="10" v-model="content"></textarea><br> -->
          <!-- <input type="submit" id="submit" class="form-control"> -->
          <br>
          <div class="d-flex row justify-content-between" style="width: 800px; margin:0px 0px 0px 56px;">
            <div class="d-flex justify-content-start" style="width: 600px; padding: 0px 0px 0px 9px;">
              <button class="col-1 btn btn-outline-danger form-control" style="width: 100px; justify-content: end;" @click="backDetail">뒤로가기</button>
              <button class="col-1 btn btn-outline-warning form-control" type="reset" style="width: 100px; margin-left: 8px;">초기화</button>
            </div>
            <button class="col-1 btn btn-outline-primary form-control" type="submit" style="width: 100px; margin-left: 100px;" @click="createReview">제출</button>
          </div>
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
            return this.$store.getters.movies
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
            // console.log(id)
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
                .then(() => {
                    this.$store.commit('ADD_REFRESH_CR')
                    //this.$store.state.refresh ++
                    // console.log(res)
                    //this.$emit('refresh_emit')
                    // window.alert("글작성이 완료되었습니다.")
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

        },
        backDetail() {
          const id = this.movie.id
          this.$router.push({name:'DetailView', params: {id}})
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
div p {
  font-family: 'Nanum Gothic', sans-serif;
}
#create-review {
  min-width: 1320px;
}
</style>