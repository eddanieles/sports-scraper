<template>
  <div class="about">
    <div>
      <ul>
        <li>As List</li>
        <li @click="getByTeam()">By Team</li>
        <li @click="getByPlayer()">By Player</li>
        <li @click="getByPosition()">By Position</li>
      </ul>
    </div>
    <div v-for="player in this.players" :key="player.player">
      <p>{{player.player}} | {{player.position}}</p>
      <h3>Count: {{player.count}}</h3>
      <p>{{player.years}}</p>
      <hr>
    </div>
    <!-- <div v-for="team in this.teams" :key="team.teamName">
      <p>{{team.teamName}}</p>
      <h3>Count: {{team.count}}</h3>
      <ul>
        <li v-for="player in team.players" :key="player.year">
          {{player.year}}: {{player.player}} - {{player.position}}
        </li>
      </ul>
      <hr>
    </div> -->
  </div>
</template>

<script>
import _ from 'underscore'

export default {
  data() {
    return {
      teams: [],
      players: []
    }
  },
  methods: {
    getByTeam() {
      let that = this;
      let justTeamNames = []
      this.$store.state.nflMvps.forEach(obj => {
        if (_.indexOf(justTeamNames, obj.team) === -1) {
          justTeamNames.push(obj.team);
          that.teams.push({
            teamName: obj.team, 
            count: 1, 
            players: [{year: obj.year, player: obj.player, position: obj.position}]
          });
        } else {
          let index = _.findIndex(that.teams, function(o) {
            return o.teamName === obj.team
          })
          that.teams[index].count++;
          that.teams[index].players.push({year: obj.year, player: obj.player, position: obj.position})
        }
      })

      that.teams = _.sortBy(that.teams, ['count']).reverse();
    },
    getByPlayer() {
      let that = this;
      let justPlayerNames = []
      this.$store.state.nflMvps.forEach(obj => {
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
