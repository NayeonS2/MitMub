<template>
  <div class="movie-item p-0 m-0 d-flex justify-content-center">
    <div class="movie-poster d-flex justify-content-center row" style="width: 200px;">
      <img id="movie-id" :src="imgSrc" alt="포스터 없음" class="img-fluid rounded" style="width: 200px; height: 290px;"
        @click="toDetail(movie.id)" />
      <h1 id="fingerP" @click="toDetail(movie.id)">$ mit status</h1>
      <!-- <p class="d-flex justify-content-start">평점 : {{this.movie.vote_average}}</p> -->
      <p id="card-p" class="detail fs-1 text-white text-start"
        style="text-shadow: -1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;">{{ idSrc }}</p>
    </div>
  </div>
</template>

<script>
//import YoutubeList from '@/components/movies/YoutubeList'

export default {
  name: 'MovieCard',
  components: {
 
  },
  props: {
    movie: {
      type: Object,
      required: true
    },
    idx: {
      type: Number,
    }
  },
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
    }
  },
  computed: {
    imgSrc () {
      return "https://image.tmdb.org/t/p/original" + this.movie.poster_path
    },
    idSrc() {
      const idx = this.idx + 1
      return idx
    }
  },
  methods: {
    toDetail(id){
      this.$router.push({name:'DetailView', params: {id}})
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap');
#card-p {
  font-family: 'Black Ops One', cursive;
}

.detail {
  position: absolute;
  z-index: auto;
  left: 15px;
  top: 10px;
  transition: all 0.5s;
  opacity: 1;
  padding: 0;
  }
.movie-poster:hover #movie-id{
  filter: brightness(0.5);
  transform: scale(1.1);
}

#fingerP {
  position: absolute;
  left: 10px;
  bottom: 17%;
  transition: all 0.5s;
  opacity: 0;
  padding: 0px 20px 0px 0px;
}

.movie-poster:hover #fingerP{
  transition: all 0.5s;
  opacity: 1;
}

#movie-id {
  padding: 0;
  margin: 12px;
}

#movie-item {
  position: relative;
  left: 32px;
}

.movie-poster {
  filter: brightness(1);
  position: relative;
  left: 32px;
}
</style>