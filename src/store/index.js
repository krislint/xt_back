import Vue from "vue"
import Vuex from "vuex"

import app from "@/store/module/app"
import getters from "./getters"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app
  },
  state: {
    islogin: false,
    userinfo: {}
  },
  mutations: {
    login(state, data) {
      state.userinfo = data
      state.islogin = true
    },
    logout(state) {
      state.userinfo = {}
      state.islogin = false
    }
  },
  actions: {},
  getters
})
