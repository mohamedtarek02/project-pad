export default {
  team(state) {
    return state.team;
  },
  user(state, _, _2, rootGetters) {
    const teamMembers = state.team;
    const userId = rootGetters.userId;
    teamMembers, userId;
    const filteredMember = teamMembers.find((member) => member.id === userId);
    return filteredMember;
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
