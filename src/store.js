import Vue from "vue";
import Vuex from "vuex";
import api from "@/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    session: localStorage.getItem("session"),
    worlds: [],
    world: null
  },
  getters: {
    session(state) {
      return state.session;
    },
    getWorlds(state) {
      return state.worlds;
    },
    getWorld(state) {
      return state.world;
    }
  },
  mutations: {
    session(state, id) {
      state.session = id;
    },
    deleteSession(state) {
      state.session = null;
    },
    getWorldList(state, data) {
      state.worlds = data;
    },
    getWorld(state, data) {
      state.world = data;
    },
    createWorld(state, world) {
      state.worlds.push(world);
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
    },
    getWorldList(context) {
      return api.getWorldList(context);
    },
    getWorld(context, data) {
      return api.getWorld(context, data);
    },
    createWorld(context, data) {
      return api.createWorld(context, data);
    },
    getPlayer(context, data) {
      return api.getPlayer(context, data);
    },
    joinWorld(context, data) {
      return api.joinWorld(context, data);
    },
    upgradeBuilding(context, data) {
      return api.upgradeBuilding(context, data);
    },
    attack(context, data) {
      return api.attack(context, data);
    },
    getRaport(context, data) {
      return api.raport(context, data);
    }
  }
});
