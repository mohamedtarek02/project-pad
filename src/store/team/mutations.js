export default {
  addMember(state, data) {
    state.team.push(data);
  },
  setTeam(state, payload) {
    state.team = payload;
  },
  setLastFetch(state) {
    state.lastFetch = new Date().getTime();
  },
  editMember(state, payload) {
    const selectedMember = state.team.find(
      (member) => member.id === payload.id
    );

    selectedMember.name = payload.name;
    selectedMember.image = payload.image;
    selectedMember.role = payload.role;
  },
};
