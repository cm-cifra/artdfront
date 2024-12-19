<template>
  <div
    class="flex flex-row min-h-screen justify-center items-center bg-gray-50"
  >
    <div
      class="flex flex-col bg-white rounded-lg px-12 pb-4 shadow-lg md:w-1/2 md:h-auto w-full h-full justify-center"
    >
      <div class="flex-none">
        <img src="../../assets/logo.png" class="w-auto h-32 mx-auto" />
      </div>

      <div class="flex-none">
        <p class="mb-2">Username</p>
        <input
          v-model="email"
          type="email"
          class="rounded-lg border-gray-300 text-center bg-gray-100 w-full"
          placeholder="Input username"
        />
      </div>

      <div class="flex-none my-4">
        <p class="mb-2">Password</p>
        <input
          v-model="password"
          type="password"
          class="rounded-lg border-gray-300 text-center bg-gray-100 w-full"
          placeholder="••••••••"
        />
      </div>

      <button
        @click="loginUser"
        class="bg-primary-500 rounded-lg text-white py-2 my-8"
      >
        LOGIN
      </button>

      <div class="flex-none text-center">
        {{ alertMsg }}
      </div>

      <div class="flex-none text-center">
        {{ formatDate(new Date()) }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      email: "",
      password: "",
      errorEmail: false,
      errorPassword: false,
      alertMsg: "",
      datetime: "",
    };
  },
  methods: {
    formatDate(val) {
      return moment(val).format("MMMM D YYYY, h:mm:ss a");
    },
    loginUser() {
      this.alertMsg = "";
      this.errorEmail = false;
      this.errorPassword = false;

      if (this.email == "") {
        this.errorEmail = true;
        this.alertMsg = "Please input email";
      } else if (this.password == "") {
        this.errorPassword = true;
        this.alertMsg = "Please input password";
      } else {
        this.loadingViewShown = true;
        this.alertMsg = "";

        let user_data = {
          email: this.email,
          password: this.password,
        };

        this.email = "";
        this.password = "";

        axios
          .post(process.env.VUE_APP_BASE_URL + "/auth/login", user_data)
          .then((res) => {
            if (res.data.status == 302) {
              this.email = "";
              this.password = "";
              this.$store.commit("UPDATE_USER", res.data.user);
              this.$router.push("/admin_dashboard");
            } else if (res.data.status == 404) {
              this.loadingViewShown = false;
              this.alertMsg = res.data.message;
            }
          });
      }
    },
  },
};
</script>

<style scoped>
.fadeInSlide {
  animation: fadeInSlide 1s ease forwards;
}
@keyframes fadeInSlide {
  from {
    opacity: 0;
    transform: translate3d(10%, 10%, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.fade {
  animation: fade 1s ease forwards;
}

@keyframes fade {
  to {
    opacity: 0.25;
  }
}
</style>
