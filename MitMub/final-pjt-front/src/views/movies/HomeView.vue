<template>
    <div>
        <header>
            <h2>Hot Movies🔥</h2>
        </header>
        <div class="popular-list row row-cols-1 row-cols-md-5 gy-3">
        <MovieCard
            v-for="(movie, idx) in movies"
            :key="idx"
            :movie="movie"/>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MovieCard from '@/components/movies/MovieCard'

export default {
    name: 'HomeView',
    components: {
        MovieCard,
    },
    computed: {
        ...mapGetters([
      'movies',
    ]),
    isLogin() {
        return this.$store.getters.isLogin
    }
    },
    created() {
        this.getMovies()
    },
    methods: {
        getMovies() {
           
                this.$store.dispatch('getMovies')
           
        }
    }
}
</script>

<style>

</style>