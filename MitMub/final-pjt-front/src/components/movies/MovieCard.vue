<template>
  <div class="col-mb-6 movie-item">
    
     
    <div class="movie-detail-card">
      <div class="movie-detail-toolbar">
       
        
      </div>
      <div class="movie-detail-body">
        <div class="movie-detail-poster">
          <img :src="imgSrc" alt="포스터 없음" style="width:500px; height:1000px;">
        </div>
        <div class="movie-detail-info">
          <!-- info header -->
          <div class="movie-detail-upper">
            <div class="movie-detail-info-header">
              <div class="movie-detail-info-header-left">
                <div class="movie-detail-title">
                  {{ movie.title }}
                </div>
                <div
                v-if="movie.release_date"
                class="movie-release-date">
                  개봉  :  {{ movie.release_date }}
                </div>
                <div
                v-if="movie.genres">
                  <!-- {{ movie.genre_ids }} -->
                </div>
              </div>
              <div class="movie-detail-info-header-right">
                <div class="movie-vote">
                  {{ movie.vote_average }}
                </div>
                
              </div>
            </div>
            <!-- info overview -->
            <div class="movie-detail-overview-header">
              줄거리
            </div>
            <hr>
            <div
              v-if="movie.overview"
              class="movie-detail-overview-body">
              {{ movie.overview }}
            </div>
            <div v-else
              class="movie-detail-overview-body">
              해당 영화는 줄거리가 제공되지 않습니다.
            </div>
          </div>
          <div class="movie-detail-lower">
            <!-- youtube -->
          
          </div>
        </div>
      </div>
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
    imgSrc: function () {
      return "https://image.tmdb.org/t/p/original" + this.movie.poster_path
    },
  },
}
</script>

<style>

</style>
