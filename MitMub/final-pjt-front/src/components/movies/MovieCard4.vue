<template>

  <div class="movie-item p-1 m-1">

    <div id="movie-poster" style="width: 148px; height: 210px;">
      <img id="movie-id" :src="imgSrc" alt="포스터 없음" class="img-fluid rounded my-1" style="width: 148px; height: 210px;" @click="toDetail(movie.id)"/>
      <h5 id="fingerPoint" class="text-light" @click="toDetail(movie.id)">$ mit status</h5>
      </div>
  </div>
</template>

<script>
export default {
  name: 'MovieCard2',
  components: {
 
  },
  props: {
    movie: {
      type: Object,
      required: true
    },
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
    id () {
      return `detailModal${this.movie.id}`
    }
    ,
    id2() {
      return `#detailModal${this.movie.id}`
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

.movie-item{
  position: relative;
  right: 30px;

}

#movie-poster {
  filter: brightness(1);
  position: relative;
}

#movie-poster:hover #movie-id{
  filter: brightness(0.5);
  transform: scale(1.1);
  }

#fingerPoint {
  position: absolute;
  width: 100px;
  height: 35px;
  z-index: auto;
  left: calc(60% - 50px);
  bottom: 37%;
  transition: all 0.5s;
  opacity: 0;
}

#movie-poster:hover #fingerPoint{
  transition: all 0.5s;
  opacity: 1;
  }

</style>