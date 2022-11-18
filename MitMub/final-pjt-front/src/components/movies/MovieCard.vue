<template>
  <div class="movie-item p-0 d-flex justify-content-center">
    <div class="movie-poster d-flex justify-content-center row" style="width: 212px;">
      <img :src="imgSrc" alt="포스터 없음" class="img-fluid rounded" style="width: 212px; height: 300px;"/>
      <!-- <p class="d-flex justify-content-start">평점 : {{this.movie.vote_average}}</p> -->
    </div>
    <p class="detail fs-1 text-white" style="text-shadow: -1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;">{{idSrc}}</p>
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
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap');
p {
  font-family: 'Black Ops One', cursive;
}
.detail {
  position: absolute;
  z-index: auto;
  left: 20%;
  top: 1%;
  transition: all 0.5s;
  opacity: 1;
  }

.movie-poster {
  position: relative;
}
</style>