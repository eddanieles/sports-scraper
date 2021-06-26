<template>
  <div>
        <v-container>
          <v-row>
            <side-menu />
          </v-row>
          <v-row><router-view :key="$route.fullPath"/></v-row>
        </v-container>
  </div>
</template>

<script>
import SideMenu from '../components/SideMenu.vue'

export default {
  components: { SideMenu },
  created() {
    this.$store.dispatch('getNbaMvps');
    this.$store.dispatch('getNflMvps');
    this.$store.dispatch('getNhlMvps');
  }
}
</script>

<style>

</style>