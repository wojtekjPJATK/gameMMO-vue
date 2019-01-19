import Vue from "vue";
import Vuex from "vuex";
import api from "@/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    session: localStorage.getItem("session")
  },
  getters: {
    session(state) {
      return state.session;
    }
  },
  mutations: {
    session(state, id) {
      state.session = id;
    },
    deleteSession(state) {
      state.session = null;
    }
  },
  actions: {
    logout(context) {
      return api.logout(context);
    },
    join(context, data) {
      return api.join(context, data);
    },
    signin(context, data) {
      return api.signin(context, data);
    }
  }
});
