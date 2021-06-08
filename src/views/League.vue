<template>
  <div>
      <b-container>
            <b-row no-gutters>
                <b-col no-gutters><side-menu /></b-col>
                <b-col cols="9"><router-view :key="$route.fullPath"/></b-col>
            </b-row>
        </b-container>
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