import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: "#00695c",
        secondary: "#ebebeb",
        accent: "#c8c2c2",
        error: "#ff1c1c",
        info: "#5d5b5b",
      },
      dark: {
        primary: "#038c7b",
        secondary: "#303030",
        accent: "#000000",
        error: "#ff1c1c",
        info: "#9e9e9e",
      },
    },
  },
});
