import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user_token: "",
  },
  mutations: {
    setUserToken(state, token) {
      state.user_token = token;
    },
  },
});
