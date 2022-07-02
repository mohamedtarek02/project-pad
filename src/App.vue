<template>
  <v-app>
    <nav-bar></nav-bar>
    <v-main class="mx-5 mb-5">
      <transition name="route" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "./components/layout/Navbar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    loadMessages() {
      this.$store.dispatch("messages/fetchMessages");
    },
  },
  created() {
    this.loadMessages();
  },
};
</script>

<style>
textarea:focus {
  box-shadow: none !important;
}
.route-enter-from,
.route-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
