import { validationMixin } from "vuelidate";
import { required, maxLength, url } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    form: {
      firstname: { required, maxLength: maxLength(10) },
      lastname: { required, maxLength: maxLength(10) },
      image: { required, url },
      select: { required },
    },
  },
  props: ["id"],
  data: () => ({
    form: {
      firstname: "",
      lastname: "",
      image: "",
      select: null,
    },

    items: [
      "Project manger",
      "Web developer",
      "Graphic designer",
      "UI / UX designer",
      "Social media marketer",
      "Sales Representative",
    ],
    loading: false,
  }),

  computed: {
    firstnameError() {
      const errors = [];
      if (!this.$v.form.firstname.$dirty) return errors;
      !this.$v.form.firstname.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.form.firstname.required && errors.push("Name is required.");
      return errors;
    },
    lastnameError() {
      const errors = [];
      if (!this.$v.form.lastname.$dirty) return errors;
      !this.$v.form.lastname.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.form.lastname.required && errors.push("Name is required.");
      return errors;
    },
    imageErrors() {
      const errors = [];
      if (!this.$v.form.image.$dirty) return errors;
      !this.$v.form.image.required && errors.push("Image URL is required");
      !this.$v.form.image.url && errors.push("Kindly enter a valid URL");

      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.form.select.$dirty) return errors;
      !this.$v.form.select.required && errors.push("Item is required");
      return errors;
    },
    fullName() {
      const firstname = this.form.firstname;
      const lastname = this.form.lastname;

      return (
        firstname.charAt(0).toUpperCase() +
        firstname.slice(1) +
        " " +
        lastname.charAt(0).toUpperCase() +
        lastname.slice(1)
      );
    },
  },
};
