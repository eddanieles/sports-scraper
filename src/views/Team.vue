<template>
  <div>
      <team-card v-for="team in getByTeam('nba', 'butt')" :key="team.teamName" :team="team"/>
  </div>
</template>

<script>
import TeamCard from '../components/TeamCard.vue'
import { mapGetters } from 'vuex'

export default {
    components: { TeamCard },
    computed: {
        ...mapGetters(['getByTeam'])
    },
    beforeCreate() {
        console.log(this.$route.params.league)
    }
}
</script>

<style>

</style>