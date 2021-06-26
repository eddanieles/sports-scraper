<template>
    <div>
        <!-- <div v-for="year in this.mvps" :key="year.year + year.player">
            <p>{{year.year}} | {{year.player}} | {{year.position}} | {{year.team}}</p>
            <hr>
        </div> -->

        <v-simple-table>
            <template>
            <thead>
                <tr>
                <th class="text-left">
                    Year
                </th>
                <th class="text-center">
                    Player
                </th>
                <th class="text-center">
                    Position
                </th>
                <th class="text-right">
                    Team
                </th>
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="year in this.mvps"
                :key="year.year + year.player"
                >
                <td class="text-left">{{ year.year }}</td>
                <td>{{ year.player }}</td>
                <td>{{ year.position }}</td>
                <td class="text-right">{{ year.team }}</td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
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
        ...mapState(['nbaMvps', 'nflMvps', 'nhlMvps'])
    },
    beforeMount() {
        let that = this;
        if (this.$route.params.league === 'nfl') {
            this.$store.state.nflMvps.map(mvp => that.mvps.push(mvp));
        } else if (this.$route.params.league === 'nba') {
            this.mvps = this.nbaMvps;
        } else if (this.$route.params.league === 'nhl') {
            this.mvps = this.nhlMvps;
        }
    }
}
</script>

<style>

</style>