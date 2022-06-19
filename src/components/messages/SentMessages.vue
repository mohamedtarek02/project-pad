<template>
  <div class="messageContainer" v-if="hasSentMessages">
    <v-card
      v-for="message in messages"
      :key="message.content"
      class="mx-auto mt-3 pa-2"
      width="90%"
      elevation="1"
      outlined
    >
      <div class="messageFrom accent">
        <span>
          sent to:
          <strong class="primary--text">
            {{ message.receiverName }}
          </strong></span
        >
      </div>
      <div class="urgentMessage ml-2" v-if="message.urgent">
        <span>
          <strong class="white--text"> Sent as urgent </strong>
          <v-icon small class="white--text">mdi-alarm-light</v-icon></span
        >
      </div>
      <p class="messageContent" :class="{ urgent: message.urgent }">
        {{ message.content }}
      </p>
    </v-card>
  </div>
  <div class="noMessageContainer d-flex justify-center mt-5" v-else>
    <v-icon class="text-center mr-3 mt-3 dense" large>
      mdi-message-bulleted-off</v-icon
    >
    <h4 class="text-center mt-5">You sent no message!</h4>
  </div>
</template>

<script>
export default {
  computed: {
    messages() {
      const messages = this.$store.getters["messages/sentMessages"];
      return messages.sort((a, b) => (a.urgent && !b.urgent ? -1 : 1));
    },
    hasSentMessages() {
      return this.$store.getters["messages/hasSentMessages"];
    },
  },
};
</script>

<style scoped>
.messageFrom,
.urgentMessage {
  display: inline-block;
  padding: 2px 7px;
  border-radius: 6px;
  margin-top: -10px;
  margin-bottom: 22px;
  border-radius: 15px !important;
}
.urgentMessage {
  background-color: red;
  margin-left: 3px;
}
span {
  display: inline-block;
  font-size: 12px;
}
.messageContent {
  text-indent: 40px !important;
  font-weight: bold !important;
}
.urgent {
  color: red !important;
  font-weight: bolder;
}
</style>
