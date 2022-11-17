<template>
    <div>
        <header>
            <div class="d-grid gap-2 d-md-flex justify-content-md-center mb-4 mt-5">
                <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off" checked @click="popularMovies">
                <label class="btn btn-outline-secondary me-md-1" for="option1">인기순</label>

                <input type="radio" class="btn-check" name="options" id="option2" autocomplete="off" @click="highRateMovies">
                <label class="btn btn-outline-secondary me-md-1" for="option2">평점순</label>

                <input type="radio" class="btn-check" name="options" id="option3" autocomplete="off" @click="newMovies">
                <label class="btn btn-outline-secondary me-md-1" for="option3">최신순</label>

                <input type="radio" class="btn-check" name="options" id="option4" autocomplete="off">
                <label class="btn btn-outline-secondary me-md-1" for="option4">상영예정작</label>

                <input type="radio" class="btn-check" name="options" id="option5" autocomplete="off">
                <label class="btn btn-outline-secondary me-md-1" for="option5">킬링타임용</label>


            </div>
         
        </header>
        <div class="popular-list row row-cols-1 row-cols-md-5 gy-3">
        <MovieCard
            v-for="(movie, idx) in nowMovies"
            :key="idx"
            :movie="movie"/>
        </div>
    </div>
</template>

<script>

import MovieCard from '@/components/movies/MovieCard'

export default {
    name: 'HomeView',
    data() {
        return {
            nowMovies: [],
        }
    },
    components: {
        MovieCard,
    },
    computed: {
        
    isLogin() {
        return this.$store.getters.isLogin
    }
    },
    created() {
        if (this.isLogin === true) {
            this.popularMovies()
        } else {
            this.$router.push({ name: 'LogInView'})
        }
        
    },
    methods: {
        popularMovies() {
            this.nowMovies = this.$store.getters.movies
            console.log(this.$store.getters.movies)
        },
        highRateMovies() {
             this.nowMovies = this.$store.getters.highRateMovies
        },
        newMovies() {
             this.nowMovies = this.$store.getters.newMovies
        },
        
    }
}
</script>

<style>

</style>