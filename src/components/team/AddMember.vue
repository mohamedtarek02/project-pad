<template>
  <v-col cols="12" sm="6" md="4" lg="3">
    <v-card
      class="ma-3 d-flex align-center flex-wrap"
      max-width="344"
      min-height="400px"
    >
      <div class="mx-auto addMember" @click="addMember">
        <v-avatar color="grey lighten-2" size="180" class="mt-4 mx-a">
          <v-icon class="icon primary--text">mdi-account-plus</v-icon>
        </v-avatar>
      </div>
    </v-card>
  </v-col>
</template>

<script>
export default {
  methods: {
    addMember() {
      this.$router.push("/add-member");
    },
  },
};
</script>
<style scoped>
.addMember {
  cursor: pointer;
}
.icon {
  color: #00695c;
  font-size: 105px;
}
</style>
