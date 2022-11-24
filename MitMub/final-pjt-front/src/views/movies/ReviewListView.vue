<template>
  <div id="reviewList">
    <div class="card text-bg-dark border-light border border-3 mb-3 ms-5" style="width: 700px; height: 355px;">
      <div class="row g-0">
        <div class="col-md-4">
          <img :src="imgSrc" alt="포스터 없음" class="img-fluid rounded" style="width: 318px; height: 349px;" />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <div class="row mt-4 me-1">
              <div class="col text-center">
                <h5 class="card-title"><b>영화 제목</b></h5>
                <h5 class="card-title"><b>리뷰 제목</b></h5>
                <p class="card-text m-0"><b>리뷰 작성자</b></p>
                <p class="card-text mb-1"><b>작성자 평점</b></p>
              </div>
              <div class="col text-start">
                <h5 class="card-title">{{ movie.title }}</h5>
                <h5 class="card-title">{{ title }}</h5>
                <p class="card-text m-0">{{ this.review.user }}</p>
                <p class="card-text mb-1">{{ rank }}</p>
              </div>
            </div>
            <div class="mt-5">
              <p class="card-text mb-1"><small class="text-muted">Created at {{created_at}}</small></p>
              <p class="card-text mb-1"><small class="text-muted">Last updated at {{updated_at}}</small></p>
              <button type="button" class="btn btn-warning btn-sm mt-2" style="height:36px;"><router-link :to="{ name: 'ReviewDetailView', params: { reviewId: review.id } }" style="color:black; text-decoration:none;"><b><p @click="refreshDetail" style="color:black;">DETAIL</p></b></router-link></button>
              
            </div>
            
          </div>
        </div>
      </div>
    </div>
  


  </div>
</template>

<script>
export default {
    name: 'ReviewListView',
    props: {
    review: Object,
    },
    data() {
        return {
            movie: null,

            user: this.review.user,
            rank: this.review.rank,
            title: this.review.title,
            content: this.review.content,
            poster: null,
          
            created_at: this.review.created_at.substring(0, 10) + ' ' + this.review.created_at.substring(11, 19),
            updated_at: this.review.updated_at.substring(0, 10) + ' ' + this.review.updated_at.substring(11, 19),
        }
    },
    computed: {
        imgSrc () {
            return "https://image.tmdb.org/t/p/original" + this.poster
         },
         movies(){
            return this.$store.state.movies
        },
        refreshCnt() {
          return this.$store.state.refresh
        }
    },
    methods: {
      getMovieById(){
            const id = this.review.movie
            console.log(id)
            for(const movie of this.movies) {
                if(movie.id === Number(id)){
                this.movie = movie
                break
                }
                }

            this.poster = this.movie.poster_path
        },

        refreshDetail() {
          this.$store.commit('ADD_REFRESH_DETAIL')
        }
    },
    created() {
      this.getMovieById()
    },
    
    watch: {
      review: function() {
        this.$store.dispatch('getReviews')
        
      },
      refreshCnt: function(new_val,old_val) {
            console.log(new_val,old_val)

            this.$router.go(this.$router.currentRoute)
        },

  }
    
}
</script>

<style>
  #reviewList *{
    color: #eeeeee;
    font-family: 'Nanum Gothic', sans-serif;
  }
</style>