<template>
  <div id="intro">
    <br>
    <br>
    <br>
    <br>
    <br>
    <v-typical class="blink" :steps="[2400, 'Welcome', 500, 'Welcome to MitMub !', 1000]" :wrapper="'h2'" style="height: 50px;"></v-typical>


    <h2 style="margin: 0px 20px 20px;"><b><v-typical style="color:#42b983;" class="blink" :steps="[4200, 'Let\'s begin', 500, 'Let\'s begin the adventure !', 1000]" :wrapper="'h2'"></v-typical></b></h2>
    <router-link :to="{name: 'HomeView'}"><button v-if="isBtnToggle === true" class="btn btn-outline-light">Join to MitMub</button></router-link>
    
    
    
    <div class="rocket">
      <img src="@/assets/images/rocket-158.gif" alt="" class="rocketImg"
        style="width:400px; height:400px; background:none; margin-top:50px;">
    </div>
    <!-- <router-link :to="{name: 'HomeView'}">홈</router-link> -->
    <div>


    </div>
  </div>
</template>

<script>
import VTypical from 'vue-typical';
export default {
  name: 'IntroView',
  components: {
      VTypical,
  },
  data() { 
    return {
      isBtnToggle: false,
    }
  },
  methods: {
    clickBtn() { 
      this.isBtnToggle = !this.isBtnToggle
    }
  },
  created() { 
    setTimeout(() => { 
      this.clickBtn()
    }, 6700)
  }
}
</script>

<style>

    .rocket {text-align: center; margin-top: 20px;}
    .rocketImg{animation: motion 2.8s linear 0s alternate forwards; margin-top: 0;}




    @keyframes motion {
        0% {margin-top: 300px;}
        100% {margin-top: -1400px;}
    }
</style>