<template>
  <div>
    <ul style="list-style:none;" class="p-0">

      <div @click="toggleOnOff"><h5 style="color: #FFEBF0; font-family: 'Abel', sans-serif;" class="ms-3"><b>My WatchList 🎬</b><hr></h5></div>
      <div v-if="isStatusOn">
        <li v-for="(movie, idx) in watchList" :key="idx" id="watch">
          
          <p id="myWatch" @click="toDetail(movie.id)">{{ movie.title }} </p> 
        </li>
      </div>
      
      
    </ul>
    
  </div>
</template>

<script>
export default {
    name: 'MyWatchListView',
    data() {
        return {
            movies: this.$store.state.movies,
            watchList: [],
             isStatusOn: false,
        }
    },
    props: {
        profile: {}
    },
    methods: {
      toDetail(id){
      this.$router.push({name:'DetailView', params: {id}})
      },
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

        toggleOnOff: function() {
          this.isStatusOn = !this.isStatusOn;
        }
  },
  mounted () {
    //this.watchList = []
    this.getWatchList()
  },
  watch: {
    profile: {
        handler: function (val) {
            //console.log("val", val)
            //this.watchList = []
            this.getWatchlist()
        },
        deep: true,
    },
    

  }
}
</script>

<style>
  #watch {
    color: white;
  }

  #myWatch {
    font-family: 'Nanum Gothic', sans-serif;
  }
</style>