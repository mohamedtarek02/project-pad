<template>
  <div>
    <v-app-bar class="primary" dense dark shaped flat app>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title
        class="text-uppercase title"
        @click="$router.push('/dashboard')"
      >
        <span class="font-weight-light logo">Project</span>
        <span class="font-weight-medium logo">Pad</span>
      </v-toolbar-title>

      <div class="links d-none d-md-flex">
        <v-btn
          text
          router
          to="/dashboard"
          :class="{ addBorder: addBorder('DashBoard') }"
        >
          <span class="caption">Dashboard</span>
        </v-btn>

        <v-btn
          text
          router
          to="/projects"
          :class="{ addBorder: addBorder('TeamProjects') }"
        >
          <span class="caption">My Tasks</span>
        </v-btn>

        <v-btn
          text
          router
          to="/team"
          min-width="110px"
          :class="{ addBorder: addBorder('TeamMembers') }"
        >
          <span class="caption">Team</span>
        </v-btn>
      </div>

      <v-spacer></v-spacer>
      <div class="icons d-none d-md-flex">
        <v-btn
          class="mt-2"
          text
          router
          to="/inbox/received-messages"
          @click="addBorder"
        >
          <v-icon>mdi-email</v-icon>
          <div class="messageContainer" v-if="messagesNumber > 0">
            <v-avatar color="red" size="17" class="avatarMessage">
              <p class="messageNumber">
                {{ messagesNumber }}
              </p>
            </v-avatar>
          </div>
        </v-btn>

        <v-btn icon class="mr-4">
          <v-icon @click="toggleTheme">{{ themeIcon }}</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <!-- the drawer content -->
    <v-navigation-drawer v-model="drawer" app temporary class="secondary">
      <div class="d-flex justify-center">
        <v-avatar color="grey lighten-2" size="100" class="mt-5">
          <v-img :src="imageData" class="image"></v-img>
        </v-avatar>
      </div>
      <div class="d-flex justify-center mt-1">
        <h4 class="subheading">{{ usernameData }}</h4>
      </div>
      <h4 class="ml-3">Main</h4>
      <v-list nav dense>
        <v-list-item-group v-model="group">
          <v-list-item
            class="ml-2"
            v-for="link in links"
            :key="link.text"
            router
            :to="link.route"
            @click="addBorder"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <hr class="grey lighten-1" width="90%" height="2px" />
      <h4 class="ml-3">Add</h4>
      <v-list nav dense>
        <v-list-item-group v-model="group">
          <v-list-item
            class="ml-2"
            v-for="add in adds"
            :key="add.text"
            router
            :to="add.route"
            @click="addBorder"
          >
            <v-list-item-icon>
              <v-icon>{{ add.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ add.text }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <hr class="grey lighten-1" width="90%" />
      <h4 class="ml-3">Settings</h4>
      <v-list nav dense>
        <v-list-item-group v-model="group">
          <v-list-item class="ml-2" @click="toggleTheme">
            <v-list-item-icon>
              <v-icon>{{ themeIcon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ themeText }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      group: null,
      displayInput: false,
      usernameData: "",
      imageData: "",
      themeIcon: "mdi-weather-night",
      themeText: "Dark Theme",
      links: [
        {
          icon: "mdi-view-dashboard-outline",
          text: "Dashboard",
          route: "/dashboard",
        },
        { icon: "mdi-folder", text: "My projects", route: "/projects" },
        { icon: "mdi-account-group", text: "Team", route: "/team" },
        {
          icon: "mdi-email",
          text: "Inbox",
          route: "/inbox/received-messages",
        },
      ],
      adds: [
        {
          icon: "mdi-folder-plus-outline",
          text: "Task",
          route: "/add-task",
        },
        {
          icon: "mdi-account-plus",
          text: "Team Member",
          route: "/add-member",
        },
      ],
    };
  },
  watch: {
    $route(val) {
      this.addBorder(val.name);
    },
  },
  methods: {
    addBorder(routeName) {
      return this.$route.name === routeName;
    },
    toggleInput() {
      this.displayInput = !this.displayInput;
      if (this.displayInput === true) {
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
      }
    },
    toggleTheme() {
      if (this.themeIcon === "mdi-weather-night") {
        this.$vuetify.theme.dark = true;
        this.themeIcon = "mdi-white-balance-sunny";
        this.themeText = "White Theme";
      } else {
        this.$vuetify.theme.dark = false;
        this.themeIcon = "mdi-weather-night";
        this.themeText = "Dark Theme";
      }
    },
    async username() {
      await this.$store.dispatch("team/fetchMembers");
      const responseData = this.$store.getters["team/user"];

      this.usernameData = responseData.name;
      return responseData.name;
    },
    async userImage() {
      await this.$store.dispatch("team/fetchMembers");
      const responseData = this.$store.getters["team/user"];
      this.imageData = responseData.image;
      return responseData.image;
    },
    test() {
      return "workiiiiiiiing";
    },
  },
  computed: {
    path() {
      return location.pathname;
    },

    messagesNumber() {
      return this.$store.getters["messages/messagesNumber"];
    },
    userInfo() {
      console.log(this.$store.getters["team/user"]);
      return this.$store.getters["team/user"];
    },
  },
  mounted() {
    this.addBorder(this.$route.name);
    this.$store.dispatch("team/fetchMembers");
  },
  created() {
    this.$store.dispatch("team/fetchMembers");
    this.userImage();
    this.username();
  },
};
</script>

<style>
.logo {
  cursor: pointer;
}
a,
a:hover {
  text-decoration: none;
}
.title span:last-child {
  font-size: 25px !important;
}
.title span {
  color: #96ffee !important;
}
.title span:last-child {
  font-size: 30px !important ;
}
.links {
  margin-left: 40px !important;
  margin-top: 10px;
}
.bottomBorder {
  border-bottom: solid 4px white;
  margin-top: 0.2px;
}
.links span {
  font-size: 11px !important;
  margin-top: 8px;
}
.links span:active {
  font-weight: bold;
}
.image {
  border: 3px solid #69696978;
}
input {
  padding: 12px !important;
  margin-top: 10px;
  margin-right: -5px;
}
input:focus {
  border: none !important;
  box-shadow: none !important;
  outline: none;
}
.theme--dark.v-btn--active:hover::before,
.theme--dark.v-btn--active::before {
  opacity: 0 !important;
}
.addBorder {
  border-bottom: 4px solid white;
}
.v-btn--active span {
  font-weight: bold !important;
}
i {
  padding: 0px !important;
  margin: 0px !important;
}
.messageNumber {
  margin-top: 17px;
  font-weight: 500;
  z-index: 9000;
  font-size: 16px;
}
.avatarMessage {
  margin-top: -20px;
  margin-left: -7px;
}
</style>
