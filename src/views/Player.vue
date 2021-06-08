<template>
  <div>
      <player-card v-for="player in getByPlayer(_self.$route.params.league)" :key="player.player" :player="player" />
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import PlayerCard from '../components/PlayerCard.vue'

export default {
  components: { PlayerCard },
    computed: {
        ...mapGetters(['getByPlayer'])
    }
}
</script>

<style>

</style>