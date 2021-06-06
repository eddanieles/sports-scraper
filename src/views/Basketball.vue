<template>
  <div>
      <b-container>
            <b-row no-gutters>
                <b-col no-gutters><side-menu /></b-col>
                <b-col cols="9"><router-view /></b-col>
            </b-row>
      </b-container>
      
    <b-tabs vertical>
        <b-tab title="Year">
            <div v-for="year in nbaMvps" :key="year.year + year.player">
            <p>{{year.year}} | {{year.player}} | {{year.position}} | {{year.team}}</p>
            <hr>
            </div>
        </b-tab>
        <b-tab title="Team">
            <team-card v-for="team in getByTeam('nba', 'butt')" :key="team.teamName" :team="team"/>
        </b-tab>
        <b-tab title="Player">
            
        </b-tab>
        <b-tab title="Position">
            
        </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import SideMenu from '../components/SideMenu.vue'
import TeamCard from '../components/TeamCard.vue'

export default {
    components: { TeamCard, SideMenu },
    computed: {
        ...mapState({
            nbaMvps: state => state.nbaMvps
        }),
        ...mapGetters(['getByTeam'])
    },
    created() {
        this.$store.dispatch('getNbaMvps')
    }
}
</script>

<style>

</style>