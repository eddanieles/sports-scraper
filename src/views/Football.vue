<template>
  <div class="about">
    <!-- <p>{{this.mvpArr}}</p> -->
    <div v-for="team in this.teams" :key="team.teamName">
      <p>{{team.teamName}}</p>
      <h3>Count: {{team.count}}</h3>
      <p>{{team.players}}</p>
      <hr>
    </div>
  </div>
</template>

<script>
import request from 'request'
import cheerio from 'cheerio'
import _ from 'lodash'

export default {
  data() {
    return {
      mvpArr: [],
      teams: []
    }
  },
  beforeCreate() {
    let that = this;
    request('https://cors.bridged.cc/https://www.pro-football-reference.com/awards/ap-nfl-mvp-award.htm', (error, response, html) => {
        if(!error && response.statusCode === 200) {
            const $ = cheerio.load(html);

            let column = $('#awards > tbody > tr');

            for (let i=0; i < column.length; i++) {
              that.mvpArr.push({
                year: column[i].children[0].children[0].children[0].data,
                player: column[i].children[3].children[0].children[0].data,
                team: column[i].children[4].children[0].children[0].data
              })
            }

            let justTeamNames = []
            that.mvpArr.forEach(obj => {
              if (_.indexOf(justTeamNames, obj.team) === -1) {
                justTeamNames.push(obj.team);
                that.teams.push({
                  teamName: obj.team, 
                  count: 1, 
                  players: [{year: obj.year, player: obj.player}]
                });
              } else {
                // count: count++,
                // players: players.push({year: obj.year, player: obj.player})
                let index = _.findIndex(that.teams, function(o) {
                  return o.teamName === obj.team
                })
                // console.log("index", index)
                that.teams[index].count++;
                that.teams[index].players.push({year: obj.year, player: obj.player})
              }
            })

            that.teams = _.sortBy(that.teams, ['count', 'year']).reverse()
        }
    })
  }
}
</script>

<style>

</style>
