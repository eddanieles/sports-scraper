<template>
  <div id="app">
    <v-app>
    <app-bar />
    <v-main>
    <router-view/>
    </v-main>
    </v-app>
  </div>
</template>

<script>
import AppBar from './components/AppBar.vue'
export default {
  components: { AppBar },

}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a {
  text-decoration: none;
}

li {
  list-style-type: none;
}
</style>
