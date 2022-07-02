<template>
  <div class="team">
    <h2 class="my-5">Team</h2>
    <v-container class="secondary">
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <v-row no-gutters flex-wrap v-else>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="person in team"
          :key="person.name"
        >
          <v-card class="ma-3" max-width="344" min-height="400px">
            <!-- image or the avatar of team member -->
            <!-- this div for justification -->
            <div class="d-flex justify-end">
              <v-btn class="ma-1" icon route :to="`edit-member/${person.id}`"
                ><v-icon color="primary">mdi-pencil</v-icon>
              </v-btn>
            </div>
            <div class="d-flex justify-center align-start">
              <v-avatar color="grey lighten-2" size="150" class="mt-2">
                <v-img :src="person.image" class="image"></v-img>
              </v-avatar>
            </div>

            <!-- team member name -->
            <div class="d-flex justify-center">
              <h3>
                {{ person.name }}
              </h3>
            </div>

            <!-- team member name role -->
            <div class="d-flex justify-center">
              <h5>{{ person.role }}</h5>
            </div>

            <div class="d-flex justify-center">
              <v-btn
                text
                class="primary subheading mt-3"
                min-width="250px"
                router
                :to="`team/${person.id}`"
                v-if="person.id !== userId"
              >
                <v-icon left class="mr-3"> mdi-message</v-icon>
                <span class="font-weight-bold">Send Message</span>
              </v-btn>
            </div>
            <div v-if="person.id === userId" class="mt-12"></div>
            <div class="d-flex justify-center">
              <v-btn
                text
                class="info subheading mt-2"
                min-width="250px"
                router
                :to="`assign-task/${person.id}`"
              >
                <v-icon left class="mr-3"> mdi-calendar-check </v-icon>
                <span class="font-weight-bold mr-3">Assign task</span>
              </v-btn>
            </div>
          </v-card>
        </v-col>
        <!-- start of add team member card -->
        <Add-member></Add-member>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AddMember from "../team/AddMember.vue";
export default {
  components: {
    AddMember,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    team() {
      return this.$store.getters["team/team"];
    },
    userId() {
      const member = this.$store.getters["team/user"];
      return member.id;
    },
  },
  methods: {
    async fetchTeam() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("team/fetchMembers");
      } catch (error) {
        this.error = error.name || "technical error";
      }
      this.isLoading = false;
    },
  },
  created() {
    this.fetchTeam();
  },
};
</script>

<style scoped>
.v-card__title {
  margin-bottom: 0px !important;
}
.image {
  border: 3px solid #00695c;
}
</style>
