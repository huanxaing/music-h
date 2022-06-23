import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    songurl: "",
    songdetail: "",
  },
  mutations: {
    geturl(state, url) {
      state.songurl = url;
    },
    getdetail(state, detail) {
      state.songdetail = detail;
    },
  },
  actions: {},
  modules: {},
});
