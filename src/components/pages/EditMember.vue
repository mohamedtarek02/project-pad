<template>
  <v-row no-gutters flex-wrap>
    <v-col sm="1" md="2" lg="3"> </v-col>
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card class="pa-5 mt-5" elevation="6">
        <h3 class="text-center">Edit member information</h3>
        <form>
          <v-text-field
            class="my-3"
            v-model="form.firstname"
            :error-messages="firstnameError"
            :counter="10"
            label="Firstname"
            required
            @input="$v.form.firstname.$touch()"
            @blur="$v.form.firstname.$touch()"
          ></v-text-field>
          <v-text-field
            class="my-3"
            v-model="form.lastname"
            :error-messages="lastnameError"
            :counter="10"
            label="Lastname"
            required
            @input="$v.form.lastname.$touch()"
            @blur="$v.form.lastname.$touch()"
          ></v-text-field>
          <v-text-field
            class="my-3"
            v-model="form.image"
            :error-messages="imageErrors"
            label="Image URL"
            required
            @input="$v.form.image.$touch()"
            @blur="$v.form.image.$touch()"
          ></v-text-field>
          <v-select
            class="my-3"
            v-model="form.select"
            :items="items"
            label="position"
            :error-messages="selectErrors"
            required
            :menu-props="{ top: true, offsetY: true }"
            @change="$v.form.select.$touch()"
            @blur="$v.form.select.$touch()"
          ></v-select>

          <div class="action mt-4">
            <v-btn class="mr-4 primary" @click="submit" :loading="loading">
              submit
            </v-btn>
            <v-btn class="red darken-4 white--text" @click="discard">
              Discard changes
            </v-btn>
          </div>
        </form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import TeamForm from "../../mixins/TeamForm.js";

export default {
  mixins: [TeamForm],
  props: ["id"],
  methods: {
    preDefineMemberInfo() {
      const team = this.$store.getters["team/team"];
      const member = team.find((member) => member.id === this.id);
      const firstname = member.name.substring(0, member.name.indexOf(" "));
      const lastname = member.name.substring(member.name.indexOf(" "));
      this.form.firstname = firstname;
      this.form.lastname = lastname.trim();
      this.form.image = member.image;
      this.form.select = member.role;
    },
    async submit() {
      if (this.$v.form.$invalid) {
        return;
      }

      this.loading = true;
      const memberData = {
        id: this.id,
        name: this.fullName,
        role: this.form.select,
        image: this.form.image,
      };
      await this.$store.dispatch("team/editMember", memberData);
      this.$router.replace("/team");
    },
    discard() {
      this.$router.replace("/team");
    },
  },
  created() {
    this.preDefineMemberInfo();
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
