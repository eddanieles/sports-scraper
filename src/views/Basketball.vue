<template>
  <div>
      <b-container>
            <b-row no-gutters>
                <b-col no-gutters><side-menu /></b-col>
                <b-col cols="9"><router-view /></b-col>
            </b-row>
      </b-container>
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