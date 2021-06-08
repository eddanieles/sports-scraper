<template>
  <div>
      <team-card v-for="team in getByTeam(_self.$route.params.league)" :key="team.teamName" :team="team"/>
  </div>
</template>

<script>
import TeamCard from '../components/TeamCard.vue'
import { mapGetters } from 'vuex'

export default {
    components: { TeamCard },
    computed: {
        ...mapGetters(['getByTeam'])
    }
}
</script>

<style>

</style>