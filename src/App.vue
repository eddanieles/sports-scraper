<template>
  <div id="app">
    <v-app>
    <app-bar />
    <v-content>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> | 
      <router-link to="/nfl/year">NFL</router-link> | 
      <router-link to="/nba/year">NBA</router-link> |
      <router-link to="/nhl/year">NHL</router-link> 
    </div>
    <router-view/>
    </v-content>
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

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

li {
  list-style-type: none;
}
</style>
