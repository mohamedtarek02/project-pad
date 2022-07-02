<template>
  <div>
    <v-row no-gutters flex-wrap>
      <v-col sm="1" md="2" lg="3"> </v-col>
      <v-col cols="12" sm="10" md="8" lg="6">
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <v-card class="pa-5 mt-5" elevation="6" v-else>
          <h4 class="text-center">
            Assign Task to:
            <strong class="primary--text ml-1">{{ name }}</strong>
          </h4>
          <form>
            <v-text-field
              class="my-3"
              v-model="form.title"
              :error-messages="titleError"
              :counter="25"
              label="Task Title"
              required
              @input="$v.form.title.$touch()"
              @blur="$v.form.title.$touch()"
            ></v-text-field>
            <v-textarea
              label="Description"
              v-model.trim="form.description"
              :error-messages="descriptionError"
              :counter="250"
              @input="$v.form.description.$touch()"
              @blur="$v.form.description.$touch()"
            ></v-textarea>
            <v-select
              class="my-3"
              v-model="form.select"
              :hint="`${form.select.name}, ${form.select.position}`"
              :items="items"
              item-text="name"
              item-value="position"
              label="Select"
              persistent-hint
              return-object
              single-line
              :error-messages="selectErrors"
              :menu-props="{ top: true, offsetY: true }"
              @change="$v.form.select.$touch()"
              @blur="$v.form.select.$touch()"
              disabled
            ></v-select>
            <p class="mb-6 mt-2 font-weight-medium">Due By:</p>
            <v-row justify="center">
              <v-date-picker
                :min="new Date().toISOString().substr(0, 10)"
                v-model="form.picker"
                color="primary"
                width="350"
                height="20"
              ></v-date-picker>
            </v-row>
            <div class="action mt-8">
              <v-btn class="mr-4 primary" @click="submit">add task </v-btn>
              <v-btn class="mr-4 error" @click="cancel">Cancel </v-btn>
            </div>
          </form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TaskForm from "../../mixins/TaskForm.js";

export default {
  mixins: [TaskForm],
  props: ["id"],
  data() {
    return {
      isLoading: false,
      name: "",
    };
  },
  methods: {
    async predefineTaskMember() {
      this.isLoading = true;
      await this.$store.dispatch("team/fetchMembers");
      const teamMembers = await this.$store.getters["team/team"];
      const targetedMember = teamMembers.find(
        (member) => member.id === this.id
      );
      console.log(this.id, targetedMember.name);
      this.form.select.name = targetedMember.name;
      this.form.select.position = targetedMember.role;

      const team = [];
      for (const member in teamMembers) {
        team.push({
          name: teamMembers[member].name,
          position: teamMembers[member].role,
        });
      }
      this.items = team;
      this.name = targetedMember.name;
      this.isLoading = false;
    },
    async submit() {
      if (this.$v.form.$invalid) {
        return;
      }

      await this.assignedName();

      const taskData = {
        title: this.titleCappitalLetter,
        person: this.name,
        description: this.form.description,
        due: this.form.picker,
        status: "ongoing",
        icon: "mdi-access-point",
      };
      this.$store.dispatch("tasks/addTask", taskData);
      this.$router.replace("/dashboard");
    },
    cancel() {
      this.$router.replace("/team");
    },
  },
  created() {
    this.predefineTaskMember();
  },
};
</script>
