<template>
  <div>
    <div tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="movie-detail-info">
        <!-- info header -->
        <div>
          <div class="container">
            <h1 class="m-2 p-2">
              On branch movie
            </h1>
          </div>
          <div>
            <div class="container-fluid">
              <div class="row">
                <div class="col-4 p-0">
                  <img :src="imgSrc" alt="포스터 없음" class="img-fluid rounded" style="width: 318px; height: 450px;" />
                </div>
                <div class="col-8">
                  <h4 class="movie-detail-title">
                    Title : {{ movie?.title }}
                  </h4>
                  <div v-if="movie?.release_date">
                    개봉 : {{ movie?.release_date }}
                  </div>
                  <div v-if="movie?.genres">
                    <!-- {{ movie.genre_ids }} -->
                  </div>
                  <div class="movie-vote">
                    평점 : {{ movie?.vote_average }}
                  </div>
                  <div class="movie-vote">
                    <!-- 인기지수 : {{ movie?.popularity }} -->
                  </div>
                  <hr>
                  <!-- info over view -->
                  <div class="movie-detail-overview-header">
                    줄거리
                  </div>
                  <hr>
                  <div v-if="movie?.overview" class="movie-detail-overview-body">
                    {{ movie?.overview }}
                  </div>
                  <div v-else class="movie-detail-overview-body">
                    해당 영화는 줄거리가 제공되지 않습니다.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>유튜브 영상 넣을 곳</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailView',
  data() {
    return {
      movie: null,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
    }
  },
  computed: {
    movies(){
      return this.$store.state.movies
    },
    imgSrc () {
      // console.log(this.movie)
      return "https://image.tmdb.org/t/p/original" + this.movie.poster_path
    },
    idSrc() {
      const idx = this.idx + 1
      return idx
    }
  },
  methods: {
    getMovieById(){
      const id = this.$route.params.id
      for(const movie of this.movies) {
        if(movie.id === Number(id)){
          this.movie = movie
          break
        }
      }
      if (this.movie === null){
        this.$router.push({name: 'NotFound404'})
      }
    }
  },
  created() {
    // console.log(this.$route.params.id) 여기까지 id 잘 들어옴.
    this.getMovieById(this.$route.params.id)
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Abel&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap');

h1 {
  font-family: 'Abel', sans-serif;
}

div {
  font-family: 'Nanum Gothic', sans-serif;
}
</style>