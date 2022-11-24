<template>
  <div class="row">
    <div class="col-1">
        <button v-if="isPick" class="btn btn-link" style="color: blue;" @click="pickMovie" >
          <i class="bi bi-bookmark-check-fill" style="font-size: 2rem; color: blue;"></i>
        </button>
        <button v-else class="btn btn-link" style="color: gray;" @click="pickMovie" >
          <i class="bi bi-bookmark-plus-fill" style="font-size: 2rem; color: white;"></i>
        </button>
    </div>
    <div id="pick-div" class="col" style="font-family: 'Abel', sans-serif;"> {{ pick_movie_num }} Users Pick this movie!</div>
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
    name: 'PickMovieView',
    data() {
        return {
            pick_movie: null,
            pick_movie_num: 0,
            isPick: false,

            movies: [],

            nowMovie: null,
        }
    },
    computed: {
        // UsersWatchList() {
        //     return this.movie.users_playlist
        // },
        // movies() {
        //     return this.$store.state.movies
        // }
    },
    props: {
        movie: Object,
    },
    methods: {
        pickMovie () {
          
            axios({
                method: 'post',
                url: `${API_URL}/api/v1/movies/pick_movie/${this.movie.id}/`,
    
                headers: {
                    Authorization: `Token ${this.$store.state.token}`
                }
            })
            .then((res) => {
                this.$store.commit('REFRESH_MOVIE', res.data)
                this.$emit('refreshMovie', res.data)
                this.nowMovie = res.data
                
                // console.log(this.$store.state.movies)

                // console.log(res.data)
                // console.log(this.nowMovie, this.isPick)
                
            })
            .catch((err) => { 
                console.log(err)
            })
            },


        
        // updatePick () {
        //     for (var i in this.pick_movie) {
        //         for (var user of this.$store.state.users) {
        //         if (this.pick_movie[i] == user.id){
        //             this.pick_movie[i] = user.username
        //         }
        //         }
        //     }
        //     for (var j in this.pick_movie) {
        //         if (this.pick_movie[j] == this.$store.state.username) {
        //         return this.isPick = true
        //         }
        //     }
        //     this.isPick = false
        //     }
        },
    created: function () {
        this.nowMovie = this.movie
        this.movies = this.$store.state.movies
        this.pick_movie = this.nowMovie.users_playlist,
        this.pick_movie_num = this.nowMovie.users_playlist.length


        if (this.nowMovie.users_playlist.includes(Number(this.$store.state.profile.id))) {
            this.isPick = true
        } else {
            this.isPick = false
        }
        //this.updatePick()
    },
    mounted() {
        this.movies = this.$store.state.movies

        this.pick_movie = this.nowMovie.users_playlist,
        this.pick_movie_num = this.nowMovie.users_playlist.length

        if (this.nowMovie.users_playlist.includes(Number(this.$store.state.profile.id))) {
            this.isPick = true
        } else {
            this.isPick = false
        }
    },
    watch: {
        
        // UsersWatchList: {
        //         handler: function () {
                    
        //             this.pick_movie = this.movie.users_playlist,
        //             this.pick_movie_num = this.movie.users_playlist.length
        //             //this.update_select()
        
        //         },
        //         deep:true,
        //     },
},


}
</script>

<style>
#pick-div {
    margin: 18px 0px 0px 0px;
}

</style>