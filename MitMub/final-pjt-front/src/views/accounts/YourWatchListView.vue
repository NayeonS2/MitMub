<template>
  <div>
    <ul>
      <li v-for="(movie, idx) in watchList" :key="idx">
        {{ movie.title }}  
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    name: 'YourWatchListView',
    data() {
        return {
            movies: this.$store.state.movies,
            watchList: []
        }
    },
    props: {
        profile: {}
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
    profile: {
        handler: function (val) {
            console.log("val", val)
            //this.watchList = []
            //this.getWatchlist()
        },
        deep: true,
    },
    

  }
}
</script>

<style>

</style>