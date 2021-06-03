<template>
  <div class="about">
    <div v-for="team in this.teams" :key="team.teamName">
      <p>{{team.teamName}}</p>
      <h3>Count: {{team.count}}</h3>
      <ul>
        <li v-for="player in team.players" :key="player.year">
          {{player.year}}: {{player.player}} - {{player.position}}
        </li>
      </ul>
      <hr>
    </div>
  </div>
</template>

<script>
import _ from 'underscore'

export default {
  data() {
    return {
      teams: []
    }
  },
  beforeCreate() {
    this.$store.dispatch('getNflMvps');
  },
  created() {
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
  }
}
</script>

<style>
li {
  list-style-type: none;
}
</style>
