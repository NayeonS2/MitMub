<template>
  <div id="app">
    <nav class="navbar bg-light">
      <div class="container-fluid">
        <router-link :to="{ name: 'HomeView' }"><img id="logo-image" src="@/assets/images/RowLogo.png" style="width:120px; height:80px;"/>Home</router-link> |
        <router-link :to="{ name: 'SignUpView' }">SignUp</router-link> |
        <router-link :to="{ name: 'LogInView' }">LogIn</router-link>
         
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
