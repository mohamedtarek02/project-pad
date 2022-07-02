import getters from "./getters.js";
import mutations from "./mutations.js";
import actions from "./actions.js";

export default {
  namespaced: true,
  state() {
    return {
      messages: [
        {
          content:
            "There was no way at all of indicating to the messengers that it was an urgent message.",
          messageId: "m1",
          receiverId: "t1",
          receiverName: "Mike Vazgen",
          senderId: "t2",
          senderName: "Ryu Krikor",
          urgent: false,
        },
        {
          content:
            "Hi there! We just wanted to let you know we received your message and will be in touch before our offices close",
          messageId: "m2",
          receiverId: "t1",
          receiverName: "Mike Vazgen",
          senderId: "t3",
          senderName: "Chun Rouben",
          urgent: false,
        },
        {
          content:
            "Since this is typically the first message a customer will receive from you, include your business name, hours of operation and a link to your website for more information.",
          messageId: "m3",
          receiverId: "t1",
          receiverName: "Mike Vazgen",
          senderId: "t4",
          senderName: "Gouken Siranushn",
          urgent: false,
        },
        {
          content:
            "The inevitable repetition of material that arises from the multilayered publishing approach is undoubtedly worth the resultant gain in accessibility to the increasingly urgent message of global change.",
          messageId: "m4",
          receiverId: "t1",
          receiverName: "Mike Vazgen",
          senderId: "t5",
          senderName: "Yoshi Don",
          urgent: true,
        },
        {
          content:
            "You probably have an after-hours voicemail and out-of-office message email set up for your business already. But auto-reply messages can save time by providing an even faster ",
          messageId: "m5",
          receiverId: "t2",
          receiverName: "Ryu Krikor",
          senderId: "t4",
          senderName: "Gouken Siranushn",
          urgent: true,
        },
        {
          content: "I was detained by what appeared to be an urgent message.",
          messageId: "m6",
          receiverId: "t2",
          receiverName: "Ryu Krikor",
          senderId: "t1",
          senderName: "Mike Vazgen",
          urgent: false,
        },
      ],
    };
  },
  getters,
  mutations,
  actions,
};
