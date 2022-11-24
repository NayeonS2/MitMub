<template>
    <div id="intro">
        <div class="rocket">
            <img src="@/assets/images/rocket-158.gif" alt="" class="rocketImg" style="width:400px; height:400px; background:none; margin-top:50px;">
        </div>
        <!-- <router-link :to="{name: 'HomeView'}">홈</router-link> -->

        <v-typical
        class="blink"
        :steps="[1900,'Welcome', 500,'Welcome to MitMub !', 1000]"
        :wrapper="'h2'"
        @animationend="event"
    ></v-typical>

    </div>
</template>

<script>
import VTypical from 'vue-typical';
export default {
    name: 'IntroView',
    components : {
        VTypical,
        
    },
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
        event() {

        }
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
    .rocket {text-align: center; margin-top: 20px;}
    .rocketImg{animation: motion 2.8s linear 0s alternate forwards; margin-top: 0;}

    @keyframes motion {
        0% {margin-top: 500px;}
        100% {margin-top: -1000px;}
    }
    

    
</style>