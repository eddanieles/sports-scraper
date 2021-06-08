import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import request from 'request'
import cheerio from 'cheerio'
import _ from 'underscore'

Vue.use(Vuex)

const corsBridge = 'https://cors.bridged.cc/';
const nflMvpsUrl = 'https://www.pro-football-reference.com/awards/ap-nfl-mvp-award.htm';
const nbaMvpsUrl = 'http://www.espn.com/nba/history/awards/_/id/33';
const nhlMvpsUrl = 'https://www.nhl.com/news/nhl-hart-memorial-trophy-winners-complete-list/c-287743272';

export default new Vuex.Store({
  state: {
    nflMvps: [],
    nbaMvps: [],
    nhlMvps: []
  },
  plugins: [createPersistedState()],
  mutations: {
    setNflMvps(state, val) {
      state.nflMvps = val
    },
    setNbaMvps(state, val) {
      state.nbaMvps = val
    },
    setNhlMvps(state, val) {
      state.nhlMvps = val
    }
  },
  actions: {
    getNflMvps({commit}) {
      let mvpArr = [];
      request(`${corsBridge}${nflMvpsUrl}`, (error, response, html) => {
          if(!error && response.statusCode === 200) {
              const $ = cheerio.load(html);

              let column = $('#awards > tbody > tr');

              for (let i=0; i < column.length; i++) {
                mvpArr.push({
                  year: column[i].children[0].children[0].children[0].data,
                  position: column[i].children[2].children[0].data,
                  player: column[i].children[3].children[0].children[0].data,
                  team: column[i].children[4].children[0].children[0].data
                })
              }

              commit('setNflMvps', mvpArr);
          }
      })
    },
    getNhlMvps({commit}) {
      let mvpArr = [];

      request(`${corsBridge}${nhlMvpsUrl}`, (error, response, html) => {
        if(!error && response.statusCode === 200) {
          const $ = cheerio.load(html);

          let column = $('#content-wrap > div.template.template--fluid.section-news > div.template__container > div > article.article-item.article-item--expanded.article-item--active > div.article-item__bottom > div.article-item__body > ul')[0].children;

          for (let i=0; i < column.length; i++) {
            if (i%2 === 1) {
              mvpArr.push({
                year: column[i].children[0].children[0].data.match(/^[0-9]*/)[0].trim(),
                // position: "in progress",
                player: column[i].children[0].children.length > 2 ? column[i].children[0].children[1].children[0].data : column[i].children[0].children[0].data.match(/(?<=:)(.*?)(?=,)/)[0].trim(),
                team: column[i].children[1].data
              })
            }
          }

          commit('setNhlMvps', mvpArr)
        }
      })
    },
    getNbaMvps({commit}) {
      let mvpArr = [];

      request(`${corsBridge}${nbaMvpsUrl}`, (error, response, html) => {
        if(!error && response.statusCode === 200) {
            const $ = cheerio.load(html);

            let column = $('#my-players-table > div.mod-container.mod-table.mod-no-header-footer > div > table > tbody > tr');
            
            for (let i=2; i < column.length; i++) {
              mvpArr.push({
                year: column[i].children[0].children[0].data,
                position: column[i].children[2].children[0] ? column[i].children[2].children[0].data : column[i].children[2].children[0],
                player: column[i].children[1].children[0].children ? column[i].children[1].children[0].children[0].data : column[i].children[1].children[0].data,
                team: column[i].children[3].children[0].children ? column[i].children[3].children[0].children[0].data : column[i].children[3].children[0].data
              })
            }
            
            let centers = ['Bill Walton', 'Kareem Abdul-Jabbar', 'Wilt Chamberlain', 'Bill Russell'];
            let forwards = ['Julius Erving', 'Larry Bird',  'Bob McAdoo', 'David Cowens', 'Willis Reed', 'Bob Pettit'];
            let guards = ['Westley Unseld', 'Oscar Robertson', 'Bob Cousy'];

            mvpArr.forEach(year => {
              if (centers.includes(year.player)) {
                year.position = "C"
              }
              else if (forwards.includes(year.player)) {
                year.position = "F"
              }
              else if (guards.includes(year.player)) {
                year.position = "G"
              }
            })
            commit('setNbaMvps', mvpArr);
          }
      })
    }
  },
  modules: {
  },
  getters: {
    centers: state => {
      return state.nbaMvps.filter(mvp => mvp.position === "C")
    },
    getByTeam:  state => league => {
      var mvps;
      let teams = [];
      let justTeamNames = [];

      if (league === "nfl") {
        mvps = state.nflMvps;
      } else if (league === "nba") {
        mvps = state.nbaMvps;
      } else if (league === "nhl") {
        mvps = state.nhlMvps;
      }

      mvps.forEach(obj => {
        if (_.indexOf(justTeamNames, obj.team) === -1) {
          justTeamNames.push(obj.team);
          teams.push({
            teamName: obj.team, 
            count: 1, 
            players: [{year: obj.year, player: obj.player, position: obj.position}]
          });
        } else {
          let index = _.findIndex(teams, function(o) {
            return o.teamName === obj.team
          })
          teams[index].count++;
          teams[index].players.push({year: obj.year, player: obj.player, position: obj.position})
        }
      })

      teams = _.sortBy(teams, ['count']).reverse();
      return teams;
    },
    getByPosition:  state => league => {
      var mvps;
      let positions = [];
      let justPositions = [];

      if (league === "nfl") {
        mvps = state.nflMvps;
      } else if (league === "nba") {
        mvps = state.nbaMvps;
      } else if (league === "nhl") {
        mvps = state.nhlMvps;
      }

      mvps.forEach(obj => {
        if (_.indexOf(justPositions, obj.position) === -1) {
          justPositions.push(obj.position);
          positions.push({
            position: obj.position, 
            count: 1, 
            players: [{year: obj.year, player: obj.player, team: obj.team}]
          });
        } else {
          let index = _.findIndex(positions, function(o) {
            return o.position === obj.position
          })
          positions[index].count++;
          positions[index].players.push({year: obj.year, player: obj.player, team: obj.team})
        }
      })

      return positions = _.sortBy(positions, ['count']).reverse();
    },
    getByPlayer: state => league => {
      var mvps;
      let players = [];
      let justPlayerNames = [];

      if (league === "nfl") {
        mvps = state.nflMvps;
      } else if (league === "nba") {
        mvps = state.nbaMvps;
      } else if (league === "nhl") {
        mvps = state.nhlMvps;
      }

      mvps.forEach(obj => {
        if (_.indexOf(justPlayerNames, obj.player) === -1) {
          justPlayerNames.push(obj.player);
          players.push({
            player: obj.player,
            position: obj.position,
            count: 1, 
            years: [{year: obj.year, team: obj.team}]
          });
        } 
        else {
          let index = _.findIndex(players, function(o) {
            return o.player === obj.player
          })
          players[index].count++;
          players[index].years.push({year: obj.year, team: obj.team})
        }
      })

      return players = _.sortBy(players, ['count']).reverse();
    } 
  }
})
