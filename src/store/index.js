import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import weather from "./modules/weather";
import station from "./modules/station";

export default new Vuex.Store({
  state: {
    widthUpdater: null,
    width: null
  },
  mutations: {
    setWidthUpdater: (state, upd) => {
      state.widthUpdater = setInterval(() => {
        upd();
      }, 1000);
    }
  },
  actions: {
    updateWidth(width) {
      this.width = width;
    }
  },
  modules: {
    weather,
    station
  }
});
