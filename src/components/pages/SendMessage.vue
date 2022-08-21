<template>
  <v-row no-gutters flex-wrap>
    <v-col sm="1" md="2" lg="3"> </v-col>
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card class="mt-5 pa-5" height="330px" elevation="6">
        <h4 class="text-center send-message-par">
          send message to:
          <strong class="primary--text"> {{ member.name }} </strong>
        </h4>
        <v-textarea
          filled
          label="Your Message"
          v-model.trim="message"
          :error-messages="messageError"
          :counter="250"
          @input="$v.message.$touch()"
          @blur="$v.message.$touch()"
        ></v-textarea>
        <div class="action mt-4">
          <v-btn class="mr-4 primary" @click="send"> Send </v-btn>
          <v-btn class="error white--text" @click="urgent">
            Send as Urgent
          </v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    message: { required, maxLength: maxLength(250) },
  },
  props: ["id"],
  data() {
    return {
      message: "",
      isUrgent: false,
    };
  },
  computed: {
    member() {
      const members = this.$store.getters["team/team"];
      return members.find((member) => member.id === this.id);
    },
    senderId() {
      const user = this.$store.getters["team/user"];
      return user.id;
    },

    senderName() {
      const user = this.$store.getters["team/user"];
      return user.name;
    },

    messageError() {
      const errors = [];
      if (!this.$v.message.$dirty) return errors;
      !this.$v.message.maxLength &&
        errors.push("message must be at most 150 characters long");
      !this.$v.message.required && errors.push("Message is required.");
      return errors;
    },
  },
  methods: {
    send() {
      if (this.$v.message.$invalid) {
        return;
      }
      this.$store.dispatch("messages/addMessage", {
        content: this.message,
        receiverId: this.id,
        receiverName: this.member.name,
        senderName: this.senderName,
        senderId: this.senderId,
        urgent: this.isUrgent,
      });
      this.$router.replace("/team");
    },
    urgent() {
      this.isUrgent = !this.isUrgent;
      this.send();
    },
  },
};
</script>

<style scoped>
.send-message-par {
  font-size: 18px;
}
.v-btn {
  border-radius: 0 !important;
}
</style>
