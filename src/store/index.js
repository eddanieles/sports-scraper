import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import request from 'request'
import cheerio from 'cheerio'

Vue.use(Vuex)

const corsBridge = 'https://cors.bridged.cc/';
const nflMvpsUrl = 'https://www.pro-football-reference.com/awards/ap-nfl-mvp-award.htm';
const nbaMvpsUrl = 'http://www.espn.com/nba/history/awards/_/id/33';

export default new Vuex.Store({
  state: {
    nflMvps: [],
    nbaMvps: []
  },
  plugins: [createPersistedState()],
  mutations: {
    setNflMvps(state, val) {
      state.nflMvps = val
    },
    setNbaMvps(state, val) {
      state.nbaMvps = val
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
  }
})

//*[@id="my-players-table"]/div[1]/div/table/tbody/tr[3]