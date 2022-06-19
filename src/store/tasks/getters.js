export default {
  tasks(state) {
    return state.tasks;
  },
  hasTasks(state) {
    return state.tasks && state.tasks.length > 0;
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTime = new Date().getTime();
    (currentTime - lastFetch) / 1000;
    if ((currentTime - lastFetch) / 1000 > 20) {
      return true;
    } else {
      return false;
    }
  },
};
