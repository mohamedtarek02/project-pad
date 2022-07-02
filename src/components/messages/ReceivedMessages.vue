<template>
  <div>
    <div class="messageContainer" v-if="hasReceivedMessages">
      <transition-group tag="ul" name="messages">
        <li v-for="message in messages" :key="message.content">
          <v-card class="mx-auto mt-3 pa-2" width="90%" elevation="1" outlined>
            <div class="messageFrom accent">
              <span>
                From:
                <v-btn
                  class="primary--text"
                  style="curosr: pointer"
                  text
                  route
                  x-small
                  :to="`/team/${message.senderId}`"
                >
                  <span class="senderName">{{ message.senderName }}</span>
                </v-btn></span
              >
            </div>
            <div class="urgentMessage ml-2" v-if="message.urgent">
              <span>
                <strong class="white--text"> urgent </strong>
                <v-icon small class="white--text">mdi-alarm-light</v-icon></span
              >
            </div>
            <p class="messageContent" :class="{ urgent: message.urgent }">
              {{ message.content }}
            </p>
            <v-container class="d-flex justify-end buttonCon">
              <v-btn
                small
                class="primary mr-2"
                route
                :to="`/team/${message.senderId}`"
              >
                <v-icon right>mdi-reply</v-icon>
                <span class="ml-1">Replay</span>
              </v-btn>
              <v-btn
                small
                class="error"
                @click="deleteMessage(message.messageId)"
              >
                <v-icon right>mdi-delete</v-icon>
                <span>Delete</span>
              </v-btn>
            </v-container>
          </v-card>
        </li>
      </transition-group>
    </div>
    <div class="noMessageContainer d-flex justify-center mt-5" v-else>
      <v-icon class="text-center mr-3 mt-3 dense" large>
        mdi-message-bulleted-off</v-icon
      >
      <h4 class="text-center mt-5">You received no messages yet.</h4>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    messages() {
      const messages = this.$store.getters["messages/receivedMessages"];
      return messages.sort((a, b) => (a.urgent && !b.urgent ? -1 : 1));
    },
    hasReceivedMessages() {
      return this.$store.getters["messages/hasReceivedMessages"];
    },
  },
  methods: {
    deleteMessage(id) {
      this.$store.dispatch("messages/deleteMessage", id);
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
  font-weight: bolder !important;
}
.senderName {
  font-weight: bolder;
  margin-left: -6px;
  font-size: 12px;
  letter-spacing: 0px;
  text-transform: capitalize;
}
.buttonCon {
  margin-bottom: -8px !important;
}
.messages-enter-from,
.messages-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.messages-enter-active {
  transition: all 0.3s ease-out;
}

.messages-leave-active {
  transition: all 0.3s ease-in;
  position: absolute;
}

.messages-enter-to,
.messages-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.messages-move {
  transition: transform 0.5s ease;
}
</style>
