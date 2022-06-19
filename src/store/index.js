import Vue from "vue";
import Vuex from "vuex";
import tasksModules from "./tasks/index.js";
import teamModules from "./team/index.js";
import messageModules from "./messages/index.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    tasks: tasksModules,
    team: teamModules,
    messages: messageModules,
  },
  state() {
    return { userId: "-N431Ef4Q1FLtxJ8Xt6Z", messageId: "m1" };
    //user1: -N431Ef4Q1FLtxJ8Xt6Z
    //user2: -N4322sH6nL6TlF5rwBJ
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    messageId(state) {
      return state.messageId;
    },
  },
});

export default store;
