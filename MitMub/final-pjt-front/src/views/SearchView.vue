<template>
  <div>
    <h3>π '{{text}}'μ λν κ²μ κ²°κ³Όμλλ€.</h3>
    <div v-if="searchMovies.length !== 0" class="popular-list row d-flex justify-content-center">
      <MovieCard4
          v-for="(movie, idx) in searchMovies"
          :key="idx"
          :movie="movie"
          class="col-1"
        />
    </div>
    <p v-if="searchMovies.length === 0">
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      '{{text}}'μ λν κ²μ κ²°κ³Όκ° μμ΅λλ€.
    </p>
  </div>
</template>

<script>
import MovieCard4 from '@/components/movies/MovieCard4'
export default {
  name: 'SearchView',
  components: {
    MovieCard4
  },
  props: {
    text: String,
  },
  data() { 
    return {
      searchMovies: [],
    }
  },
  methods: {
    searchList() {
      this.searchMovies = this.$store.getters.searchMovies
    }
  },
  created() { 
    this.$store.dispatch('searchList', this.text)
    this.searchList()
  },
  mounted() {
    this.$store.commit('DELETE_SEARCH')
  }
}
</script>

<style>

</style>