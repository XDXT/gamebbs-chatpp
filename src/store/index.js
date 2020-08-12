import Vue from 'vue'
import Vuex from 'vuex'
import chat from './chatMoudle'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    me: null,
    socket: null
  },
  mutations: {
    setMe(state, user) {
      state.me = user;
    }
  },
  actions: {},
  modules: {
    chat
  }
})
