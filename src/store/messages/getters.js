export default {
  receivedMessages(state, _, _2, rootGetters) {
    const userId = rootGetters.userId;
    return state.messages.filter((message) => message.receiverId === userId);
  },
  hasReceivedMessages(_, getters) {
    return getters.receivedMessages && getters.receivedMessages.length > 0;
  },
  messagesNumber(_, getters) {
    return getters.receivedMessages.length;
  },
  sentMessages(state, _, _2, rootGetters) {
    const userId = rootGetters.userId;
    return state.messages.filter((message) => message.senderId === userId);
  },
  hasSentMessages(_, getters) {
    return getters.sentMessages && getters.sentMessages.length > 0;
  },

  
};
