import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    form: {
      title: { required, maxLength: maxLength(30) },
      description: {
        required,
        maxLength: maxLength(250),
        // minLength: minLength(20),
      },
      select: { required },
      picker: { required },
    },
  },
  props: ["id"],
  data() {
    return {
      form: {
        title: "",
        description: "",
        select: { name: "", position: "" },
        picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
      },
      loading: false,

      items: [],
    };
  },
  methods: {
    async fetchTeamNames() {
      await this.$store.dispatch("team/fetchMembers");
      const teamMembers = await this.$store.getters["team/team"];
      const team = [];
      for (const member in teamMembers) {
        team.push({
          name: teamMembers[member].name,
          position: teamMembers[member].role,
        });
      }
      this.items = team;
    },
  },

  computed: {
    titleCappitalLetter() {
      const title = this.form.title;
      return title.charAt(0).toUpperCase() + title.slice(1);
    },
    titleError() {
      const errors = [];
      if (!this.$v.form.title.$dirty) return errors;
      !this.$v.form.title.maxLength &&
        errors.push("Title must be at most 30 characters long");
      !this.$v.form.title.required && errors.push("Task title is required.");
      return errors;
    },
    descriptionError() {
      const errors = [];
      if (!this.$v.form.description.$dirty) return errors;
      // !this.$v.form.description.minLength &&
      //   errors.push("Description must be at least 20 characters long");
      !this.$v.form.description.maxLength &&
        errors.push("Description must be at most 250 characters long");
      !this.$v.form.description.required &&
        errors.push("Description is required.");
      return errors;
    },

    selectErrors() {
      const errors = [];
      if (!this.$v.form.select.$dirty) return errors;
      !this.$v.form.select.required && errors.push("Item is required");
      return errors;
    },
    pickerErrors() {
      const errors = [];
      if (!this.$v.form.select.$dirty) return errors;
      !this.$v.form.select.required && errors.push("Date is required");
      return errors;
    },
  },
  created() {
    this.fetchTeamNames();
  },
};
