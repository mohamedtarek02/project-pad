<template>
  <div>
    <h2 class="my-5">My Tasks</h2>
    <v-row no-gutters flex-wrap>
      <v-col md="2"> </v-col>
      <v-col cols="12" md="8">
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <v-card
          v-else
          class="pa-5 mt-5"
          elevation="5"
          v-for="task in tasks"
          :key="task.id"
        >
          <h3 class="mt-5 primary--text">{{ task.title }}</h3>
          <v-chip class="error caption">
            <span class="mr-2">Expiration Date: </span>
            <strong>{{ task.due }}</strong>
          </v-chip>
          <v-chip class="ml-2 white--text caption" :class="task.status">
            <span class="mr-2">status </span>
            <strong>{{ task.status }}</strong>
          </v-chip>
          <v-expansion-panels class="mt-6 mb-6">
            <v-expansion-panel>
              <v-expansion-panel-header class="font-weight-bold">
                Task Details
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                {{ task.description }}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <div class="d-flex justify-end mb-1 mt-8"></div>

          <div v-if="task.status === 'ongoing'">
            <v-btn class="primary mt-5" @click="completed(task.id)">
              <v-icon left class="mr-2">mdi-check-circle</v-icon>
              <span>Mark as Completed</span>
            </v-btn>
          </div>
          <div v-if="task.status === 'completed'">
            <v-btn class="error mt-5" @click="undoCompletion(task.id)">
              <v-icon left class="mr-2">mdi-arrow-u-left-top-bold </v-icon>
              <span>Undo completion</span>
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
      tasks: [],
    };
  },
  methods: {
    async fetchTasks() {
      await this.$store.dispatch("tasks/fetchTask");
      await this.$store.dispatch("team/fetchMembers");
      const tasks = this.$store.getters["tasks/tasks"];
      const user = this.$store.getters["team/user"];
      const allTasks = tasks.filter((task) => task.person === user.name);
      this.tasks = allTasks;
      this.isLoading = false;
    },
    completed(id) {
      const targetedTask = this.tasks.find((task) => task.id === id);
      targetedTask.status = "completed";
    },
    undoCompletion(id) {
      const targetedTask = this.tasks.find((task) => task.id === id);
      targetedTask.status = "ongoing";
    },
  },
  created() {
    this.fetchTasks();
  },
};
</script>

<style scoped>
.ongoing {
  border-left: 4px solid #ff8a26;
}
.task.completed {
  border-left: 4px solid #16a946;
}
.task.overdue {
  border-left: 4px solid #ff1043;
}
</style>
