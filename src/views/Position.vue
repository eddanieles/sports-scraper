<template>
  <div>
      <position-card v-for="position in getByPosition(this.$route.params.league)" :key="position.position" :position="position" />
  </div>
</template>

<script>
import PositionCard from '../components/PositionCard.vue'
import { mapGetters } from 'vuex'

export default {
  components: { PositionCard },
    computed: {
        ...mapGetters(['getByPosition'])
    }
}
</script>

<style>

</style>