<template>
  <div>
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <v-row no-gutters class="" v-else>
      <v-col class="ml-1" md="3">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <button
              class="mb-4"
              @click="sort('title')"
              v-bind="attrs"
              v-on="on"
            >
              <span class="font-weight-bold">Task title</span>
              <v-icon class="grey--text ml-1" small v-if="titleSort"
                >mdi-arrow-down-drop-circle</v-icon
              >
            </button>
          </template>
          <span>{{ titleMessage }}</span>
        </v-tooltip>
      </v-col>

      <v-col class="ml-1" md="3">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <button
              class="mb-4"
              @click="sort('person')"
              v-bind="attrs"
              v-on="on"
            >
              <span class="font-weight-bold">Person</span>
              <v-icon class="grey--text ml-1" small v-if="personSort"
                >mdi-arrow-down-drop-circle</v-icon
              >
            </button>
          </template>
          <span>{{ personMessage }}</span>
        </v-tooltip>
      </v-col>
      <v-col class="ml-1" md="2">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <button class="mb-4" @click="sortNumers()" v-bind="attrs" v-on="on">
              <span class="font-weight-bold">Due By</span>
              <v-icon class="grey--text ml-1" small v-if="dueSort"
                >mdi-arrow-down-drop-circle</v-icon
              >
            </button>
          </template>
          <span>{{ dueMessage }}</span>
        </v-tooltip>
      </v-col>
      <v-col class="ml-1" md="">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <button
              class="mb-4"
              @click="sort('status')"
              v-bind="attrs"
              v-on="on"
            >
              <span class="font-weight-bold">status</span>
              <v-icon class="grey--text ml-1" small v-if="statusSort"
                >mdi-arrow-down-drop-circle</v-icon
              >
            </button>
          </template>
          <span>{{ statusMessage }}</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
      titleSort: false,
      personSort: false,
      dueSort: false,
      statusSort: false,
      titleMessage: "Click to sort by project",
      personMessage: "Click to sort by person",
      dueMessage: "Click to sort by due date",
      statusMessage: "Click to sort by status",
    };
  },
  computed: {
    projects() {
      return this.$store.getters["tasks/tasks"];
    },
  },
  methods: {
    reset() {
      this.titleSort = false;
      this.personSort = false;
      this.dueSort = false;
      this.statusSort = false;
      this.titleMessage = "Click to sort by task";
      this.personMessage = "Click to sort by person";
      this.dueMessage = "Click to sort by due date";
      this.statusMessage = "Click to sort by status";
    },
    sortByStatus() {
      this.projects.sort(function (a, b) {
        if (a.status === "ongoing" && b.status !== "ongoing") {
          return -1;
        } else {
          return 1;
        }
      });
    },
    sortUserTasks() {
      const user = this.$store.getters["team/user"];
      const username = user.name;
      this.projects.sort(function (a, b) {
        if (a.person === username && b.person === username) {
          if (a.status === "completed" && b.status === "ongoing") {
            return 1;
          }
        } else if (a.person === username && b.person) {
          return -1;
        } else if (a.person !== username && b.person) {
          return 1;
        }
      });
    },
    sort(type) {
      this.reset();
      this.projects.sort((a, b) => (a[type] < b[type] ? -1 : 1));
      if (type === "title") {
        this.titleSort = true;
        this.titleMessage = `Data is sorted by project `;
      } else if (type === "person") {
        this.personSort = true;
        this.personMessage = `Data is sorted by person `;
      } else if (type === "status") {
        this.statusSort = true;
        this.statusMessage = "Data is sorted by status";
      }
    },
    sortNumers() {
      this.reset();
      this.projects.sort((a, b) => new Date(a.due) - new Date(b.due));
      this.dueSort = true;
      this.dueMessage = "Data is sorted by due date";
    },
  },
  async created() {
    await this.sortUserTasks();
    this.isLoading = false;
  },
};
</script>
