import Vue from 'vue'
import Vuex from 'vuex'
import lottos from '@/store/lotto-crawler/results/lottos-1-965.json'

Vue.use(Vuex)

interface LottoData {
  no: number
  numbers: number[]
}

export default new Vuex.Store({
  state: {
    lottos,
  },
  getters: {
    lottos(state): LottoData[] {
      return state.lottos
    },
  },
  mutations: {},
  actions: {},
})
