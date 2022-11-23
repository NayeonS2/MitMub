<template>
  <div>
    '{{text}}'에 대한 검색 결과입니다.
    <ul v-if="searchMovies.length !== 0">
      <li v-for="(movie, index) in searchMovies" :key="index">{{movie.title}}</li>
    </ul>
    <p v-if="searchMovies.length === 0">'{{text}}'에 대한 검색 결과가 없습니다.</p>
  </div>
</template>

<script>
export default {
  name: 'SearchView',
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