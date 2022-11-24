<template>
  <div class="p-0 col">
      <div class="popular-list row d-flex justify-content-center">
        
        <MovieCard3 v-for="(movie, idx) in watchList" :key="idx" :movie="movie" class="col-2"/>
      </div>
        
        <!-- {{ movie.title }}   -->

  </div>
</template>

<script>
import MovieCard3 from '@/components/movies/MovieCard3'
export default {
    name: 'YourWatchListView',
    data() {
        return {
            movies: this.$store.state.movies,
            watchList: [],
            
        }
    },
    props: {
        profile: {}
    },
    components: {
      MovieCard3
    },
    methods: {
        getWatchList () {
            for (const movie of this.movies) {
                for (const user of movie.users_playlist) {
                    if (this.profile.id === user) {
                        this.watchList.push(movie)
                        break
                }
                }
            }
        },
  },
  mounted () {
    //this.watchList = []
    this.getWatchList()
  },
  watch: {
    // profile: {
    //     handler: function (val) {
    //         //console.log("val", val)
    //         //this.watchList = []
    //         //this.getWatchlist()
    //     },
    //     deep: true,
    // },
    

  }
}
</script>

<style>

</style>