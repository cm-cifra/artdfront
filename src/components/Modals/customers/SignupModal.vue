<template>
  <div
    class="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
    @click.self="closeModal"
  >
    <!-- Modal Content -->
    <div class="w-full max-w-md p-8 bg-black rounded-lg shadow-md bg-black-500">
      <div class="flex-none">
        <img src="../../../assets/logo_single.png" class="w-20 h-20 mx-auto" />
      </div>
      <h2 class="text-2xl font-semibold mb-6 text-center text-white">
        Sign Up for a New Account
      </h2>
      <form @submit.prevent="handleSignup">
        <div class="space-y-4">
          <!-- First Name -->
          <div>
            <label for="fname" class="block text-xsfont-medium text-white"
              >First Name</label
            >
            <input
              v-model="form.fname"
              type="text"
              id="fname"
              class="w-full mt-2 p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <!-- Middle Name -->
          <div>
            <label for="mname" class="block text-xsfont-medium text-white"
              >Middle Name (Optional)</label
            >
            <input
              v-model="form.mname"
              type="text"
              id="mname"
              class="w-full mt-2 p-3 border border-gray-300 rounded-md"
            />
          </div>

          <!-- Last Name -->
          <div>
            <label for="lname" class="block text-xsfont-medium text-white"
              >Last Name</label
            >
            <input
              v-model="form.lname"
              type="text"
              id="lname"
              class="w-full mt-2 p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-xsfont-medium text-white"
              >Email</label
            >
            <input
              v-model="form.email"
              type="email"
              id="email"
              class="w-full mt-2 p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-xsfont-medium text-white"
              >Password</label
            >
            <input
              v-model="form.password"
              type="password"
              id="password"
              class="w-full mt-2 p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <!-- Confirm Password -->
          <div>
            <label
              for="confirmPassword"
              class="block text-xsfont-medium text-white"
              >Confirm Password</label
            >
            <input
              v-model="form.confirmPassword"
              type="password"
              id="confirmPassword"
              class="w-full mt-2 p-3 border border-gray-300 rounded-md"
              required
            />
            <p v-if="passwordMismatch" class="text-red-500 text-xsmt-2">
              Passwords do not match.
            </p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full py-3 mt-4 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
            :disabled="passwordMismatch"
          >
            Sign Up
          </button>

          <!-- Email Error -->
          <p v-if="emailError" class="text-red-500 text-xsmt-2">
            {{ emailError }}
          </p>
        </div>
      </form>
      <div class="flex-none text-center py-4">
        <p class="text-white">
          Already have an account?
          <span class="text-primary-600 cursor-pointer hover:text-primary-500"
            >Login here</span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        fname: "",
        mname: "",
        lname: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        contact_num: "",
        isActive: 1,
        ut_id: 2,
        isApproved: 0,
        datetime_added: new Date().toISOString(),
      },
      emailError: null,
      passwordMismatch: false,
    };
  },
  watch: {
    "form.password": function () {
      this.passwordMismatch = this.form.password !== this.form.confirmPassword;
    },
    "form.confirmPassword": function () {
      this.passwordMismatch = this.form.password !== this.form.confirmPassword;
    },
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
    async handleSignup() {
      try {
        const emailExists = await this.checkEmailExists(this.form.email);
        if (emailExists) {
          this.emailError = "Email is already in use.";
          return;
        }

        if (this.form.password !== this.form.confirmPassword) {
          this.passwordMismatch = true;
          return;
        }

        const response = await axios.post(
          process.env.VUE_APP_BASE_URL + "/users/create",
          this.form
        );
        this.$emit("close-modal"); // Close the modal on success
        this.$router.push("/login");
      } catch (error) {
        console.error("Error during signup:", error);
        alert("There was an error creating your account.");
      }
    },
    async checkEmailExists(email) {
      try {
        const response = await axios.get(
          process.env.VUE_APP_BASE_URL + `/users/check-email/${email}`
        );
        return response.data.exists;
      } catch (error) {
        console.error("Error checking email:", error);
        return false;
      }
    },
  },
};
</script>
