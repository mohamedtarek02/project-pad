<template>
  <v-col md="2" cols="0" class="d-flex justify-center d-none">
    <div class="d-none d-md-block">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" route :to="`task-details/${id}`"
            ><v-icon color="grey">mdi-dots-horizontal-circle</v-icon></v-btn
          >
        </template>
        <span>Details</span>
      </v-tooltip>

      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon route :to="`edit-task/${id}`" v-bind="attrs" v-on="on"
            ><v-icon color="primary">mdi-fountain-pen-tip</v-icon></v-btn
          >
        </template>
        <span>Edit</span>
      </v-tooltip>

      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on"
            ><v-icon color="error" @click="deleteTask(id)"
              >mdi-delete</v-icon
            ></v-btn
          >
        </template>
        <span>Delete</span>
      </v-tooltip>
    </div>
  </v-col>
</template>

<script>
export default {
  props: ["id"],
  methods: {
    deleteTask(id) {
      this.$store.dispatch("tasks/deleteTask", id);
    },
  },
};
</script>
