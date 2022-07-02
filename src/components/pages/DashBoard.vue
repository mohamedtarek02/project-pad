<template>
  <div>
    <h2 class="my-5">Dashboard</h2>
    <v-btn color="primary" class="mt-4 ml-5" outlined router to="add-task">
      <v-icon left class="mr-3" dense> mdi-folder-plus-outline</v-icon>
      <span class="font-weight-bold">Add Task</span>
    </v-btn>
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <v-container class="secondary dashboard" v-else>
      <div color="grey lighten-4" v-if="hasTasks">
        <Data-Sort></Data-Sort>
        <transition-group tag="ul" name="list">
          <li v-for="task in tasks" :key="task.title">
            <v-card class="">
              <v-row no-gutters wrap :class="`py-2 task ${task.status}`">
                <v-col md="3">
                  <p
                    :class="[
                      ['grey--text', 'text--darken-2', 'ml-2'],
                      { highlight: highlightUserTasks(task.person) },
                      { 'primary--text': highlightUserTasks(task.person) },
                    ]"
                  >
                    {{ task.title }}
                  </p>
                </v-col>
                <v-col md="3">
                  <p
                    :class="[
                      ['grey--text', 'text--darken-2'],
                      { highlight: highlightUserTasks(task.person) },
                      { 'primary--text': highlightUserTasks(task.person) },
                    ]"
                  >
                    {{ task.person }}
                  </p>
                </v-col>
                <v-col md="2">
                  <p
                    :class="[
                      ['grey--text', 'text--darken-2', 'ml-2'],
                      { highlight: highlightUserTasks(task.person) },
                      { 'primary--text': highlightUserTasks(task.person) },
                    ]"
                  >
                    {{ task.due }}
                  </p>
                </v-col>
                <v-col md="2">
                  <!-- right class in not working!!!!! -->
                  <div class="right">
                    <v-chip :class="` white--text ${task.status} `">
                      <v-icon class="white--text mr-1" small>
                        {{
                          task.status === "completed"
                            ? "mdi-check-circle"
                            : task.status === "ongoing"
                            ? "mdi-access-point"
                            : "mdi-clock-time-two"
                        }}</v-icon
                      >
                      {{ task.status }}</v-chip
                    >
                  </div>
                </v-col>
                <dashboard-actions :id="task.id"></dashboard-actions>
              </v-row>
              <v-divider></v-divider>
            </v-card>
          </li>
        </transition-group>
      </div>
      <h3 v-else>We have no task yet, staty tuned.</h3>
    </v-container>
  </div>
</template>

<script>
import DataSort from "../dashboard/DataSort.vue";
import DashboardActions from "../dashboard/DashboardActions.vue";

export default {
  components: {
    DataSort,
    DashboardActions,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    async fetchTasks() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("tasks/fetchTask");
      } catch (error) {
        this.error = error.name || "technical error";
      }
      this.highlightUserTasks();
      this.isLoading = false;
    },
    highlightUserTasks(person) {
      const user = this.$store.getters["team/user"];
      const username = user.name;
      if (person === username) {
        return true;
      } else {
        return false;
      }
    },
  },
  computed: {
    tasks() {
      return this.$store.getters["tasks/tasks"];
    },
    hasTasks() {
      return this.$store.getters["tasks/hasTasks"];
    },
  },
  created() {
    this.fetchTasks();
  },
};
</script>

<style>
.dashboard {
  margin-top: 10px !important;
}
.task.ongoing {
  border-left: 4px solid #ff8a26;
}
.task.completed {
  border-left: 4px solid #16a946;
}
.task.overdue {
  border-left: 4px solid #ff1043;
}

.v-chip.ongoing {
  background: #ff8a26 !important;
}
.v-chip.completed {
  background: #16a946 !important;
}
.v-chip.overdue {
  background: #ff1043 !important;
}

hr {
  margin: 0px;
}
.highlight {
  font-weight: bolder;
}
ul {
  margin: 0px !important;
  padding: 0px !important;
}
li {
  list-style: none;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-enter-active {
  transition: all 0.3s ease-out;
}

.list-leave-active {
  transition: all 0.3s ease-in;
  position: absolute;
}

.list-enter-to,
.list-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.list-move {
  transition: transform 0.5s ease;
}
</style>
