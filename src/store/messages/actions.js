export default {
  async addMessage(context, payload) {
    const respone = await fetch(
      `https://project-pad-9d0c4-default-rtdb.firebaseio.com/messages.json`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );

    const responseData = await respone.json();

    if (!respone.ok) {
      const error = new Error(
        responseData.message || "failed to send message an error occurs"
      );
      throw error;
    }

    context.commit("addMessage", {
      ...payload,
    });
  },

  // start of getting messages function.
  async fetchMessages(context) {
    const respone = await fetch(
      `https://project-pad-9d0c4-default-rtdb.firebaseio.com/messages.json`
    );

    const responseData = await respone.json();

    if (!respone.ok) {
      const error = new Error(
        responseData.message || "failed to fetch none technical error"
      );
      throw error;
    }

    const messages = [];
    for (const id in responseData) {
      const messagesDetails = {
        messageId: id,
        content: responseData[id].content,
        receiverId: responseData[id].receiverId,
        receiverName: responseData[id].receiverName,
        senderId: responseData[id].senderId,
        senderName: responseData[id].senderName,
        urgent: responseData[id].urgent,
      };
      messages.push(messagesDetails);
    }

    context.commit("setMessages", messages);
  },

  // function to delete messages
  deleteMessage(context, payload) {
    context.commit("deleteMessage", payload);
  },
};
