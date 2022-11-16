<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg bg-white container-fluid justify-content-between m-0 px-3">
      <router-link :to="{ name: 'HomeView' }">
        <img src="./assets/img/RowLogo.png" style="width: 130px; height: 60px;">
      </router-link>
      <div class="m-1 mx-3">
        <router-link class="px-2 text-decoration-none" :to="{ name: 'SignUpView' }">SignUp</router-link>
        <router-link class="px-2 text-decoration-none" :to="{ name: 'LoginView'}">Login</router-link>
      </div>
    </nav>
      
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
