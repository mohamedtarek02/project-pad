import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

export default {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
      team: [],
    };
  },
  getters,
  mutations,
  actions,
};
