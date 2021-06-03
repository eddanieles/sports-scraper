import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import request from 'request'
import cheerio from 'cheerio'

Vue.use(Vuex)

const corsBridge = 'https://cors.bridged.cc/'
const nflMvpsUrl = 'https://www.pro-football-reference.com/awards/ap-nfl-mvp-award.htm'

export default new Vuex.Store({
  state: {
    nflMvps: []
  },
  plugins: [createPersistedState()],
  mutations: {
    setNflMvps(state, val) {
      state.nflMvps = val
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
    }
  },
  modules: {
  }
})
