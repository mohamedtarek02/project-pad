import Vue from "vue";
import router from "vue-router";
import DashBoard from "./components/pages/DashBoard.vue";
import TeamProjects from "./components/pages/TeamProjects.vue";
import TeamMembers from "./components/pages/TeamMembers.vue";
import AddMember from "./components/pages/AddMember.vue";
import EditMember from "./components/pages/EditMember.vue";
import SendMessage from "./components/pages/SendMessage.vue";
import InboxMessages from "./components/pages/InboxMessages.vue";
import SentMessages from "./components/messages/SentMessages.vue";
import ReceivedMessages from "./components/messages/ReceivedMessages.vue";
import AddTask from "./components/pages/AddTask.vue";
import EditTask from "./components/pages/EditTask.vue";
import AssignTask from "./components/pages/AssignTask.vue";

import TaskDetails from "./components/pages/TaskDetails.vue";

Vue.use(router);

export default new router({
  mode: "history",
  base: process.env.Base_URL,
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      name: "DashBoard",
      path: "/dashboard",
      component: DashBoard,
    },
    {
      name: "TeamProjects",
      path: "/projects",
      component: TeamProjects,
    },
    {
      name: "TeamMembers",
      path: "/team",
      component: TeamMembers,
    },
    {
      name: "addMember",
      path: "/add-member",
      component: AddMember,
    },
    {
      name: "editMember",
      path: "/edit-member/:id",
      component: EditMember,
      props: true,
    },
    {
      name: "sendMessage",
      path: "/team/:id",
      component: SendMessage,
      props: true,
    },
    {
      name: "inbox",
      path: "/inbox",
      component: InboxMessages,
      children: [
        {
          name: "sentMessage",
          path: "/inbox/sent-messages",
          component: SentMessages,
        },
        {
          name: "ReceivedMessage",
          path: "/inbox/Received-messages",
          component: ReceivedMessages,
        },
      ],
    },
    {
      name: "AddTask",
      path: "/add-task",
      component: AddTask,
    },
    {
      name: "editTask",
      path: "/edit-task/:id",
      component: EditTask,
      props: true,
    },
    {
      name: "assignTask",
      path: "/assign-task/:id",
      component: AssignTask,
      props: true,
    },
    {
      name: "taskDetails",
      path: "/Task-details/:id",
      component: TaskDetails,
      props: true,
    },
  ],
});
