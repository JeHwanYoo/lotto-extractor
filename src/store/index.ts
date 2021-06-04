import Vue from 'vue'
import Vuex from 'vuex'
import lottos from '@/store/lotto-crawler/results/lottos-1-965.json'

Vue.use(Vuex)

export interface LottoData {
  no: number
  numbers: number[]
}

export interface LottoOption {
  include: number[]
  exclude: number[]
  count: number
  unique: boolean
  history: boolean
}

const option: LottoOption = {
  include: [],
  exclude: [],
  count: 5,
  unique: false,
  history: false,
}

export default new Vuex.Store({
  state: {
    lottos,
    option,
    extracted: [] as number[][],
  },
  getters: {
    lottos(state): LottoData[] {
      return state.lottos
    },
    option(state): LottoOption {
      return state.option
    },
    extracted(state): number[][] {
      return state.extracted
    },
  },
  mutations: {
    changeInclude(state, payload: number[]) {
      state.option.include = payload
    },
    changeExclude(state, payload: number[]) {
      state.option.exclude = payload
    },
    changeCount(state, payload: number) {
      if (payload > 100) payload = 100
      else if (payload <= 0) payload = 1
      state.option.count = payload
    },
    changeUnique(state, payload: boolean) {
      state.option.unique = payload
    },
    changeHistory(state, payload: boolean) {
      state.option.history = payload
    },
    clearExtacted(state) {
      state.extracted = []
    },
    pushExtracted(state, payload: number[]) {
      state.extracted.push(payload)
    },
  },
})
