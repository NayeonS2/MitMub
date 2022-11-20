<template>
  <div>
    <header>
      <h2><b>WATCHME.md 👾</b></h2>
      <div class="d-grid gap-2 d-md-flex justify-content-md-center mb-4 mt-5">

        <input type="radio" class="btn-check mx-1 p-1" name="options" id="option1" autocomplete="off" checked @click="popularMovies">
        <label class="btn btn-outline-secondary" for="option1">인기순</label>

        <input type="radio" class="btn-check mx-1 p-1" name="options" id="option2" autocomplete="off" @click="highRateMovies">
        <label class="btn btn-outline-secondary" for="option2">평점순</label>

        <input type="radio" class="btn-check mx-1 p-1" name="options" id="option3" autocomplete="off" @click="newMovies">
        <label class="btn btn-outline-secondary" for="option3">최신순</label>

        <input type="radio" class="btn-check mx-1 p-1" name="options" id="option4" autocomplete="off" @click="upcomingMovies">
        <label class="btn btn-outline-secondary" for="option4">상영예정작</label>

        <input type="radio" class="btn-check mx-1 p-1" name="options" id="option5" autocomplete="off" @click="longMovies">
        <label class="btn btn-outline-secondary" for="option5">킬링타임용</label>

      </div>
    </header>
    <div class="d-flex justify-content-center">
      <carousel 
      :autoplay="true" :nav="false" :mouseDrag="true" 
      :touchDrag="true" class="col-10" :autoplayHoverPause="true" :items="4"
      >
        <MovieCard
          v-for="(movie, idx) in nowMovies.slice(0,10)"
          :key="idx"
          :movie="movie"
          :idx="idx"
        />
      </carousel>
    </div>
    <div class="card p-0 m-0 bg-dark text-white">
      <div class="popular-list card-body row row-cols-5 gy-3">
        <MovieCard2
          v-for="(movie, idx) in nowMovies.slice(0,50)"
          :key="idx"
          :movie="movie"
          class="p-2"
        />
      </div>
    </div>
    
  </div>
</template>

<script>
import MovieCard from '@/components/movies/MovieCard'
import MovieCard2 from '@/components/movies/MovieCard2'
import carousel from 'vue-owl-carousel'

export default {
  name: 'HomeView',
  data() {
    return {
      nowMovies: [],
      token: '',
 
    }
  },
  components: {
    MovieCard,
    MovieCard2,
    carousel
  },
  computed: {
   
  isLogin() {
    return this.$store.getters.isLogin
  }
  },
  created() {
    // 기본값 === popularMovies
    if (this.isLogin === true) {
     
      this.login = true
      this.popularMovies()
    } else {
      this.login = false
      this.$router.push({ name: 'LogInView'})
      
    }
    this.token = this.$store.state.token

      
  },
  methods: {
    // 각각 추천 알고리즘에 따라 getters 통해서 받아옴.
    popularMovies() {
      this.nowMovies = this.$store.getters.movies
      // data 980개 정상적으로 넘어오는거 확인.
      // console.log(this.$store.getters.movies)
    },
    highRateMovies() {
      this.nowMovies = this.$store.getters.highRateMovies
    },
    newMovies() {
      const newMoviesList = this.$store.getters.newMovies
      const newDesc = newMoviesList.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
      this.nowMovies = newDesc

    },
    upcomingMovies() {
      this.nowMovies = this.$store.getters.upcomingMovies
    },
    longMovies() {
      this.nowMovies = this.$store.getters.longMovies
    },
  },
  watch: {
    isLogin() {
      this.$router.push({name:'HomeView'})
    }
  }




   
}
</script>

<style>

</style>