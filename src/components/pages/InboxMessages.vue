<template>
  <div>
    <base-dialog :show="!!error" @close="handleError" title="An Error occurs">
      <p>{{ error }}</p>
    </base-dialog>
    <v-row no-gutters flex-wrap>
      <v-col sm="1" md="2" lg="3"> </v-col>
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card min-height="450px" class="mt-3 secondary py-5">
          <div class="d-flex justify-end mr-2">
            <v-btn color="primary" @click="loadMessages" small outlined>
              <v-icon class="text-end mr-1" dense>mdi-reload</v-icon>
              <span>Refresh</span>
            </v-btn>
          </div>

          <h3 class="text-center">Your Inbox</h3>
          <div class="action d-flex justify-center">
            <v-btn router to="/inbox/sent-messages"> Sent Messages</v-btn>
            <v-btn router to="/inbox/received-messages" medium>
              Received Messages</v-btn
            >
          </div>
          <v-card width="400px" d-flex justify-end> </v-card>
          <div v-if="isLoading">
            <base-spinner></base-spinner>
          </div>
          <div v-else>
            <router-view></router-view>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BaseDialog from "../UI/BaseDialog.vue";
export default {
  components: { BaseDialog },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async loadMessages() {
      this.isLoading = true;
      this.error = null;
      try {
        await this.$store.dispatch("messages/fetchMessages");
      } catch (error) {
        this.error = error.name || "technical error";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  mounted() {
    this.loadMessages();
  },
};
</script>

<style scoped>
.v-btn--active {
  background-color: #00695c !important;
  color: white;
}
.action {
  display: block !important;
  margin: 2px auto !important;
  margin-left: 25% !important;
  margin-bottom: 30px !important;
}
</style>
