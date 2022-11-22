<template>
    <div id="intro">
        <router-link :to="{name: 'HomeView'}">홈</router-link>

    </div>
</template>

<script>
export default {
    name: 'IntroView',
    methods: {
        getMovies() {
              this.$store.dispatch('getMovies')
        },
        highRateMovies() {
            this.$store.dispatch('highRateMovies')
        },
        newMovies() {
            this.$store.dispatch('newMovies')
        },
        upcomingMovies() {
            this.$store.dispatch('upcomingMovies')
        },
        longMovies() {
            this.$store.dispatch('longMovies')
        },
    },
    computed: {
        popularLen() {
      return this.$store.getters.movies.length
        },
        highRateLen() {
        return this.$store.getters.highRateMovies.length
        },
        newLen() {
        return this.$store.getters.newMovies.length
        },
        upcomingLen() {
        return this.$store.getters.upcomingMovies.length
        },
        longLen() {
        return this.$store.getters.longMovies.length
        },
    },
    created() {
        //this.getUserName()

        // this.getUser()
        // this.getProfile()

        // if (this.popularLen === 0) {
        //     this.getMovies()
        // }
        // if (this.highRateLen === 0) {
        //     this.highRateMovies()
        // }
        // if (this.newLen === 0) {
        //     this.newMovies()
        // }
        // if (this.upcomingLen === 0) {
        //     this.upcomingMovies()
        // }
        // if (this.longLen === 0) {
        //     this.longMovies()
        // }
    }
}
</script>

<style>

    #intro {
        background: url('/src/assets/images/wallpaperuse.com-space-wallpaper-1920x1080-980282.jpg')
    }

</style>