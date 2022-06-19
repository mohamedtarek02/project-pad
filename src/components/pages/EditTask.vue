<template>
  <v-row no-gutters flex-wrap>
    <v-col sm="1" md="2" lg="3"> </v-col>
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card class="pa-5 mt-5" elevation="6">
        <h3 class="text-center">Edit Task</h3>
        <form>
          <v-text-field
            class="my-3"
            v-model="form.title"
            :error-messages="titleError"
            :counter="30"
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
          ></v-select>
          <p class="mb-6 font-weight-medium">Due By:</p>
          <v-row justify="center">
            <v-date-picker
              :min="new Date().toISOString().substr(0, 10)"
              v-model="form.picker"
              color="primary"
              width="350"
              height="20"
              :error-messages="pickerErrors"
              @change="$v.form.picker.$touch()"
              @blur="$v.form.picker.$touch()"
            ></v-date-picker>
          </v-row>
          <div class="action mt-7">
            <v-btn class="mr-2 primary" :loading="loading" @click="submit">
              confirm edits
            </v-btn>
            <v-btn class="mr-4 error" @click="discard"> Discard changes </v-btn>
          </div>
        </form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import TaskForm from "../../mixins/TaskForm.js";
export default {
  mixins: [TaskForm],
  methods: {
    async preDefineTaskInfo() {
      // predefine the task title , description and date.
      await this.$store.dispatch("tasks/fetchTask");
      const tasks = await this.$store.getters["tasks/tasks"];
      const selectedTask = tasks.find((task) => task.id == this.id);
      this.form.title = selectedTask.title;
      this.form.description = selectedTask.description;
      this.form.picker = selectedTask.due;

      // predefine the selected person and its role.
      await this.$store.dispatch("team/fetchMembers");
      const teamMembers = await this.$store.getters["team/team"];
      const targetedMember = teamMembers.find(
        (member) => member.name === selectedTask.person
      );
      this.form.select.name = targetedMember.name;
      this.form.select.position = targetedMember.role;

      // predefine the all members and push it inside items to make it available for selection.
      const team = [];
      for (const member in teamMembers) {
        team.push({
          name: teamMembers[member].name,
          position: teamMembers[member].role,
        });
      }
      this.items = team;
    },

    async submit() {
      if (this.$v.form.$invalid) {
        return;
      }
      this.loading = true;

      const newTaskData = {
        id: this.id,
        title: this.titleCappitalLetter,
        person: this.form.select.name,
        description: this.form.description,
        due: this.form.picker,
      };
      await this.$store.dispatch("tasks/editTask", newTaskData);
      // await this.$store.dispatch("tasks/fetchTask");
      this.$router.replace("/dashboard");
    },
    discard() {
      this.$router.replace("/dashboard");
    },
  },
  created() {
    this.preDefineTaskInfo();
  },
};
</script>

<style>
input[type="text"] {
  border: 0px !important ;
  background-color: transparent;
  outline: 0px !important;
}
label {
  color: inherit !important;
}
.v-label--active {
  font-weight: 500 !important;
  font-size: 18px !important;
  letter-spacing: 2px !important;
}

.action {
  margin-bottom: -20px;
}
.invalid {
  color: red;
}
.v-menu__content {
  margin-top: -15px !important;
}
</style>
