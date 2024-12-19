<template>
  <div class="flex justify-center items-center p-20 bg-gray-100 min-h-screen">
    <div class="flex mx-10 bg-white p-8 rounded-lg shadow-xl w-full max-w-7xl">
      <div class="">
        <!-- Header Section -->
        <div class="flex items-center my-10">
          <i class="pi pi-user text-6xl text-yellow-600"></i>
          <div class="ml-4">
            <h1 class="text-3xl font-semibold text-gray-900">
              {{ this.user.fname }}
            </h1>
            <p class="text-lg text-gray-600">View profile</p>
          </div>
        </div>

        <!-- Navigation Links -->
        <div>
          <ul>
            <li
              class="flex items-center text-lg font-medium text-gray-1000 hover:text-yellow-600 cursor-pointer py-2"
            >
              <i class="pi pi-user text-xl mr-2"></i>
              My Account
            </li>
            <li
              class="pl-8 my-1 text-gray-700 hover:text-yellow-600 cursor-pointer"
            >
              Profile
            </li>
            <li
              class="pl-8 my-1 text-gray-700 hover:text-yellow-600 cursor-pointer"
            >
              Addresses
            </li>
            <li
              class="pl-8 my-1 text-gray-700 hover:text-yellow-600 cursor-pointer"
            >
              Change Password
            </li>
            <li
              class="pl-8 my-1 text-gray-700 hover:text-yellow-600 cursor-pointer"
            >
              Privacy Settings
            </li>
            <li
              class="flex items-center text-lg font-medium text-gray-1000 hover:text-yellow-600 cursor-pointer py-2"
            >
              <i class="pi pi-receipt text-xl mr-2"></i>
              My Purchase
            </li>
            <li
              class="flex items-center text-lg font-medium text-gray-1000 hover:text-yellow-600 cursor-pointer py-2"
              @click="logout"
            >
              <i class="pi pi-sign-out text-xl mr-2"></i>
              Logout
            </li>
          </ul>
        </div>
      </div>

      <!-- Profile Form Section -->
      <ProfileForm :user="user" @updateProfile="updateProfile" />
    </div>
  </div>
</template>

<script>
// Importing the necessary library for cookie handling
import axios from "axios";
import Cookies from "js-cookie"; // Make sure to install js-cookie library
import ProfileForm from "../../../components/CustomerAccount/profile.vue";

export default {
  components: {
    ProfileForm,
  },
  data() {
    return {
      user: {
        username: "",
        fname: "",
        mname: "",
        lname: "",
        email: "",
        contact_num: "",
        address: "",
        gender: "",
        dob: "",
        imagePreview: null,
        selected_id: 0,
        userId: "",
      },
    };
  },
  methods: {
    fetchUserData() {
      const userId = this.$store.state.user.id;
      axios
        .get(`${process.env.VUE_APP_BASE_URL}/users/find/${userId}`)
        .then((response) => {
          this.user = response.data;
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    },
    updateProfile(updatedUser) {
      axios
        .put(
          `${process.env.VUE_APP_BASE_URL}/users/update/${updatedUser.id}`,
          updatedUser
        )
        .then((response) => {
          alert("Profile updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
          alert("There was an error updating your profile");
        });
    },

    // Correct logout method
    logout() {
      this.$store.commit("UPDATE_USER", null);

      this.$router.push("/");
    },
  },
  mounted() {
    this.fetchUserData();
  },
};
</script>
