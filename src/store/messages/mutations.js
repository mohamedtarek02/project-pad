export default {
  addMessage(state, payload) {
    state.messages.push(payload);
  },
  setMessages(state, payload) {
    state.messages = payload;
    payload;
  },

  deleteMessage(state, payload) {
    state.messages = state.messages.filter(
      (message) => message.messageId !== payload
    );
  },
};
