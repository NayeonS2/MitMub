<template>
  <div>
    <div class="card mb-3 ms-5" style="max-width: 540px;">
      <div class="row g-0">
        <div class="col-md-4">
          <img :src="imgSrc" alt="포스터 없음" class="img-fluid rounded" style="width: 318px; height: 450px;" />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">영화 : {{ movie.title }}</h5><br>
            <h5 class="card-title">리뷰제목 : {{ title }}</h5>
            <p class="card-text"><p>평점 : {{ rank }}</p>
            <p class="card-text">내용 : {{ content }}</p>
            <p class="card-text"><small class="text-muted">Created at {{created_at}}</small></p>
            <p class="card-text"><small class="text-muted">Last updated at {{updated_at}}</small></p>
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
    },
    created() {
      this.getMovieById()
    }
    
}
</script>

<style>

</style>