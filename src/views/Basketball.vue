<template>
  <div>
      <h1>Basketball</h1>
      <div>
          {{this.nbaMvps}}
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: mapState({
        nbaMvps: state => state.nbaMvps
    }),
    created() {
        this.$store.dispatch('getNbaMvps')
    }
}
</script>

<style>

</style>