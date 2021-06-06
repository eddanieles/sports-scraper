<template>
    <div>
        <div v-for="year in this.mvps" :key="year.year + year.player">
            <p>{{year.year}} | {{year.player}} | {{year.position}} | {{year.team}}</p>
            <hr>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            mvps: []
        }
    },
    computed: {
        ...mapState(['nbaMvps', 'nflMvps'])
    },
    beforeMount() {
        let that = this;
        if (this.$route.params.league === 'nfl') {
            this.$store.state.nflMvps.map(mvp => that.mvps.push(mvp));
        } else if (this.$route.params.league === 'nba') {
            this.mvps = this.nbaMvps;
        }
    }
}
</script>

<style>

</style>