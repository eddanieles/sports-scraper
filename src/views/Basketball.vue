<template>
  <div>
      <h1>Basketball</h1>
      <div>
          {{centers}}
      </div>
      <div>
          {{nbaMvps}}
      </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    computed: {
        ...mapState({
            nbaMvps: state => state.nbaMvps
        }),
        ...mapGetters(['centers'])
    },
    created() {
        this.$store.dispatch('getNbaMvps')
    }
}
</script>

<style>

</style>