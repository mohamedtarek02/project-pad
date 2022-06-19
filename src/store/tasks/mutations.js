export default {
  addTask(state, payload) {
    state.tasks.push(payload);
  },
  setTasks(state, payload) {
    state.tasks = payload;
  },
  editTask(state, payload) {
    const selectedTask = state.tasks.find((task) => task.id === payload.id);
    selectedTask.title = payload.title;
    selectedTask.person = payload.person;
    selectedTask.description = payload.description;
    selectedTask.due = payload.due;
  },
  deleteTask(state, payload) {
    state.tasks = state.tasks.filter((task) => task.id != payload);
  },
  setLastFetch(state) {
    state.lastFetch = new Date().getTime();
  },
};
