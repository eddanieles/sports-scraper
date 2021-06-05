<template>
  <div>
    <b-tabs vertical>
      <b-tab title="List">
        <div v-for="year in this.nflMvps" :key="year.year + year.player">
          <p>{{year.year}} | {{year.player}} | {{year.position}} | {{year.team}}</p>
          <hr>
        </div>
      </b-tab>
      <b-tab title="Team">
        <div v-for="team in getByTeam('nfl')" :key="team.teamName">
          <p>{{team.teamName}}</p>
          <h3>Count: {{team.count}}</h3>
          <ul>
            <li v-for="player in team.players" :key="player.year">
              {{player.year}}: {{player.player}} - {{player.position}}
            </li>
          </ul>
          <hr>
        </div>
      </b-tab>
      <b-tab title="Player" @click="getByPlayer()">
        <div v-for="player in this.players" :key="player.player">
          <p>{{player.player}} | {{player.position}}</p>
          <h3>Count: {{player.count}}</h3>
          <ul>
            <li v-for="year in player.years" :key="year.year">
              {{year.year}}: {{year.team}}
            </li>
          </ul>
          <hr>
        </div>
      </b-tab>
      <b-tab title="Position" @click="getByPosition()">
        <div v-for="position in this.positions" :key="position.position">
          <p>{{position.position}}</p>
          <h3>Count: {{position.count}}</h3>
          <p>{{position.players}}</p>
          <hr>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import _ from 'underscore'
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      players: [],
      positions: []
    }
  },
  computed: {
    ...mapGetters(['getByTeam']),
    ...mapState({
      nflMvps: state => state.nflMvps
    })
  },
  methods: {
    getByPosition() {
      this.positions = [];
      let that = this;
      let justPositions = [];
      this.nflMvps.forEach(obj => {
        if (_.indexOf(justPositions, obj.position) === -1) {
          justPositions.push(obj.position);
          that.positions.push({
            position: obj.position, 
            count: 1, 
            players: [{year: obj.year, player: obj.player, team: obj.team}]
          });
        } else {
          let index = _.findIndex(that.positions, function(o) {
            return o.position === obj.position
          })
          that.positions[index].count++;
          that.positions[index].players.push({year: obj.year, player: obj.player, team: obj.team})
        }
      })

      that.positions = _.sortBy(that.positions, ['count']).reverse();
    },
    getByPlayer() {
      this.players = [];
      let that = this;
      let justPlayerNames = [];
      this.nflMvps.forEach(obj => {
        if (_.indexOf(justPlayerNames, obj.player) === -1) {
          justPlayerNames.push(obj.player);
          that.players.push({
            player: obj.player,
            position: obj.position,
            count: 1, 
            years: [{year: obj.year, team: obj.team}]
          });
        } 
        else {
          let index = _.findIndex(that.players, function(o) {
            return o.player === obj.player
          })
          that.players[index].count++;
          that.players[index].years.push({year: obj.year, team: obj.team})
        }
      })

      that.players = _.sortBy(that.players, ['count']).reverse();
    }
  },
  beforeCreate() {
    this.$store.dispatch('getNflMvps');
  },
  created() {
    
  }
}
</script>

<style>
li {
  list-style-type: none;
}
</style>
