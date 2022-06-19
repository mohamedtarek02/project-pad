<template>
  <v-row no-gutters flex-wrap>
    <v-col sm="1" md="2" lg="3"> </v-col>
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card class="pa-2 mt-2" elevation="0">
        <v-btn color="primary" route to="/dashboard">
          <v-icon class="mr-2">mdi-arrow-left-circle</v-icon>
          <span>back to dashboard</span>
        </v-btn>
      </v-card>
      <v-card class="pa-5 mt-4" elevation="3">
        <h3 class="primary--text">Task title</h3>
        {{ targetedTask.title }}
      </v-card>
      <v-card class="pa-5 mt-5" elevation="3">
        <h3 class="primary--text">Task Details</h3>
        {{ targetedTask.description }}
      </v-card>
      <v-card class="pa-5 mt-5" elevation="3">
        <v-row no-gutters wrap :class="`py-2 task`">
          <v-col cols="4">
            <h4 class="primary--text">Assigned to</h4>
            <p class="">
              {{ targetedTask.person }}
            </p>
          </v-col>
          <v-col cols="4" class="d-flex justify-center">
            <div class="ml-4">
              <h4 class="primary--text">Due date</h4>
              <p class="">
                {{ targetedTask.due }}
              </p>
            </div>
          </v-col>
          <v-col cols="4" class="d-flex justify-end">
            <div>
              <h4 class="primary--text">status</h4>
              <p class="">
                {{ targetedTask.status }}
              </p>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {};
  },
  computed: {
    targetedTask() {
      const tasks = this.$store.getters["tasks/tasks"];
      return tasks.find((task) => task.id === this.id);
    },
  },
};
</script>
