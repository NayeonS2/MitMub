<template>
  <div id="home-view">
    <header class="d-flex justify-content-center row">
      <h2 class="mt-5 pt-5">
        <b>WATCHME.md</b>
        &nbsp; <!--공백 삽입-->
        <span>👾</span>
      </h2>
      <p class="col-12 pb-5 mb-5" id="nav-div-a" style="width:500px;">
        <input id="search-input" class="form-control nav-item" type="text" @keyup.enter="searchMovie(searchText)" v-on:input="voninput"
          placeholder="Search movie ...                                                                       🎬" />
      </p>
    </header>
    <h5 class="text-start px-3 m-3"> 👍 현재 가장 인기있는 영화</h5>
    <div class="d-flex justify-content-center">
      <carousel
      :autoplay="true" :nav="false" :mouseDrag="true" :margin="1"
      :touchDrag="true" class="col-12" :autoplayHoverPause="true" :items="9"
      style="max-width: 1860px;"
      >
        <MovieCard
          v-for="(movie, idx) in nowMovies.slice(0,27)"
          :key="idx"
          :movie="movie"
          :idx="idx"
        />
      </carousel>
    </div>
    <h5 class="text-start px-3 m-3"> 🤞 평점순으로 모아보기</h5>
    <div class="d-flex justify-content-center">
      <carousel
      :autoplay="true" :nav="false" :mouseDrag="true" :margin="1"
      :touchDrag="true" class="col-12" :autoplayHoverPause="true" :items="9"
      style="max-width: 1860px;"
      >
        <MovieCard
          v-for="(movie, idx) in highRateList.slice(0,27)"
          :key="idx"
          :movie="movie"
          :idx="idx"
        />
      </carousel>
    </div>
    <h5 class="text-start px-3 m-3"> 😆 최신 영화 모아보기 </h5>
    <div class="d-flex justify-content-center">
      <carousel
      :autoplay="true" :nav="false" :mouseDrag="true" :margin="1"
      :touchDrag="true" class="col-12" :autoplayHoverPause="true" :items="9"
      style="max-width: 1860px;"
      >
        <MovieCard
          v-for="(movie, idx) in newList.slice(0,27)"
          :key="idx"
          :movie="movie"
          :idx="idx"
        />
      </carousel>
    </div>
    <h5 class="text-start px-3 m-3"> 👀 상영 예정작 맛보기</h5>
    <div class="d-flex justify-content-center">
      <carousel
      :autoplay="true" :nav="false" :mouseDrag="true" :margin="1"
      :touchDrag="true" class="col-12" :autoplayHoverPause="true" :items="9"
      style="max-width: 1860px;"
      >
        <MovieCard
          v-for="(movie, idx) in upcomingList.slice(0,27)"
          :key="idx"
          :movie="movie"
          :idx="idx"
        />
      </carousel>
    </div>
    <h5 class="text-start px-3 m-3"> ⭐ MitMub's 추천 킬링타임용 영화 ⭐</h5>
    <div class="d-flex justify-content-center">
      <carousel
      :autoplay="true" :nav="false" :mouseDrag="true" :margin="1"
      :touchDrag="true" class="col-12" :autoplayHoverPause="true" :items="9"
      style="max-width: 1860px;"
      >
        <MovieCard
          v-for="(movie, idx) in longList.slice(0,27)"
          :key="idx"
          :movie="movie"
          :idx="idx"
        />
      </carousel>
    </div>
    <div class="p-0 col">
      <div class="popular-list row d-flex justify-content-center" style="right:10px;">
        <MovieCard2

          v-for="(movie, idx) in nowMovies.slice(0,180)"

          :key="idx"
          :movie="movie"
          class="col-1"
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
      nowMoviesLength: 0,
      popularList: [],
      highRateList: [],
      newList: [],
      upcomingList: [],
      longList: [],
      searchText: null,
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
  },
  refreshHomeCnt() {
            return this.$store.state.refresh_home
        },
    
  nowMoviesLen() {
    return this.nowMovies.length
  }
  },
  created() {
    // 기본값 === popularMovies
    if (this.isLogin === true) {
     
      this.login = true
      this.popularMovies()
      this.highRateMovies()
      this.newMovies()
      this.upcomingMovies()
      this.longMovies()
    } else {
      this.login = false
      this.$router.push({ name: 'LogInView'})
      
    }
    this.token = this.$store.state.token

  },
  mounted() {

    var myTimer = setTimeout( function() {

    location.reload();

    }, 9000);

    //this.popularMovies()
    if (this.nowMovies.length != 0) {
      clearTimeout(myTimer);
    }

  },


  methods: {
    // 각각 추천 알고리즘에 따라 getters 통해서 받아옴.
    popularMovies() {
      this.nowMovies = this.$store.getters.movies
      this.popularList = this.$store.getters.movies
      // data 980개 정상적으로 넘어오는거 확인.
      // console.log(this.$store.getters.movies)
    },
    highRateMovies() {
      // this.nowMovies = this.$store.getters.highRateMovies
      this.highRateList = this.$store.getters.highRateMovies
    },
    newMovies() {
      const newMoviesList = this.$store.getters.newMovies
      const newDesc = newMoviesList.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
      // this.nowMovies = newDesc
      this.newList = newDesc

    },
    upcomingMovies() {
      // this.nowMovies = this.$store.getters.upcomingMovies
      this.upcomingList = this.$store.getters.upcomingMovies
    },
    longMovies() {
      // this.nowMovies = this.$store.getters.longMovies
      this.longList = this.$store.getters.longMovies
    },
    searchMovie(text) { 
      this.$router.push({ name: 'SearchView', params: {text} })
    },
    voninput(e) { 
      this.searchText = e.target.value
    }
  },
}
</script>

<style>

#home-view {
  padding-bottom: 70px;
}
h2 {
  height: 100px;
}

h2 span {
  position: relative;
  top: 5px;
  display: inline-block;
  animation: bounce .5s ease infinite alternate;
  font-size: 35px;

}

h2 span:nth-child(8) {
  animation-delay: .3s;
}
h2 span:nth-child(9) {
  animation-delay: .1s;
}
h2 span:nth-child(10) {
  animation-delay: .1s;
}
h2 span:nth-child(11) {
  animation-delay: .3s;
}

@keyframes bounce {
  100% {
    top: -5px;
  }
}


.popular-list {
  padding: auto;
}

</style>