import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store/index";
import BaseSpinner from "./components/UI/BaseSpinner.vue";
import BaseDialog from "./components/UI/BaseDialog.vue";


Vue.config.productionTip = false;


Vue.component("base-spinner", BaseSpinner);
Vue.component("base-dialog", BaseDialog);

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

// new Vue({
//   el: "#app",
//   store: store,
// });
