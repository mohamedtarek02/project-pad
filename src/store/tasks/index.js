import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

export default {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
      tasks: [
        {
          title: "Design video thumbnails",
          person: "Ryu Krikor",
          due: "20, Dec 2021",
          status: "completed",
          icon: "mdi-check-circle",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!",
        },
        {
          title: "Create a community forum",
          person: "Gouken Siranush",
          due: " 20, oct 2021",
          status: "overdue",
          icon: "mdi-clock-time-two",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!",
        },
        {
          title: "Update the land page",
          person: "Gouken Siranush",
          due: " 13, oct 2022",
          status: "ongoing",
          icon: "mdi-access-point",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!",
        },
        {
          title: "Attending the outdoor meeting",
          person: "Yoshi Don",
          due: " 13, JUL 2022",
          status: "ongoing",
          icon: "mdi-access-point",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!",
        },
      ],
      lables: [
        { title: "Project Title", keys: "title" },
        { person: "Person", keys: "person" },
        { due: "Due by", keys: "due" },
        { status: "Status", keys: "status" },
      ],
    };
  },
  getters,
  actions,
  mutations,
};
