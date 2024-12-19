<template>
  <div class="flex justify-center items-center p-20 bg-gray-100 min-h-screen">
    <div class="flex mx-10 bg-white p-8 rounded-lg shadow-xl w-full max-w-7xl">
      <div class="">
        <!-- Header Section -->
        <div class="flex items-center my-10">
          <i class="pi pi-user text-6xl text-yellow-600"></i>
          <div class="ml-4">
            <h1 class="text-3xl font-semibold text-gray-900">
              Account Details
            </h1>
            <p class="text-lg text-gray-600">View and Edit Profile</p>
          </div>
        </div>

        <!-- Profile Form Section -->
        <div class="mt-8 mx-10">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">My Profile</h2>
          <form @submit.prevent="saveProfile">
            <div class="grid md:grid-cols-2 gap-6">
              <!-- Left Form Fields -->
              <div>
                <div class="mb-4">
                  <label
                    for="username"
                    class="text-sm font-semibold text-gray-700"
                    >Username</label
                  >
                  <input
                    type="text"
                    id="username"
                    v-model="user.username"
                    class="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
                    disabled
                  />
                </div>

                <div class="mb-4">
                  <label
                    for="fullname"
                    class="text-sm font-semibold text-gray-700"
                    >Full Name</label
                  >
                  <input
                    type="text"
                    id="fullname"
                    v-model="user.fname"
                    class="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
                    disabled
                  />
                </div>

                <div class="mb-4">
                  <label for="email" class="text-sm font-semibold text-gray-700"
                    >Email</label
                  >
                  <input
                    type="email"
                    id="email"
                    v-model="user.email"
                    class="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
                    disabled
                  />
                </div>

                <div class="mb-4">
                  <label
                    for="contact_number"
                    class="text-sm font-semibold text-gray-700"
                    >Contact Number</label
                  >
                  <input
                    type="text"
                    id="contact_number"
                    v-model="user.contact_num"
                    class="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
                    disabled
                  />
                </div>

                <div class="mb-4">
                  <label
                    for="address"
                    class="text-sm font-semibold text-gray-700"
                    >Address</label
                  >
                  <input
                    type="text"
                    id="address"
                    v-model="user.address"
                    class="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
                    disabled
                  />
                </div>

                <div class="mb-4">
                  <label for="dob" class="text-sm font-semibold text-gray-700"
                    >Date of Birth</label
                  >
                  <input
                    type="date"
                    id="dob"
                    v-model="user.dob"
                    class="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
                    disabled
                  />
                </div>
              </div>

              <!-- Right Profile Picture Section -->
              <div
                class="flex flex-col items-center justify-center border p-10 mt-10 rounded-lg"
              >
                <i
                  class="pi pi-user text-8xl text-gray-500 border bg-gray-200 p-10 rounded-full"
                ></i>
                <label
                  for="avatar"
                  class="text-sm font-semibold text-gray-700 mt-4"
                  >Profile Picture</label
                >
                <input
                  type="file"
                  id="avatar"
                  @change="handleImageUpload"
                  class="mt-2 p-2 text-gray-700 cursor-pointer"
                />
                <div v-if="imagePreview" class="mt-4">
                  <img
                    :src="imagePreview"
                    alt="Profile Avatar"
                    class="h-24 w-24 rounded-full object-cover"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              class="mt-6 px-6 py-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-4 focus:ring-yellow-300"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        id: "",
        fname: "",
        mname: "",
        lname: "",
        email: "",
        password: "",
        address: "",
        contact_num: "",
        ut_id: "",
        isActive: false,
        isApproved: false,
        datetime_added: "",
      },
      imagePreview: null,
    };
  },
  methods: {
    // Fetch user data from the backend
    fetchUserData() {
      const userId = localStorage.getItem("userId"); // Assuming the user ID is stored in localStorage
      axios
        .get(`${process.env.VUE_APP_BASE_URL}users/find/${userId}`)
        .then((response) => {
          this.user = response.data;
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    },

    // Handle profile picture upload
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },

    // Save the profile (this would typically be a PUT request)
    saveProfile() {
      console.log("Saving profile:", this.user);
      // Example of sending updated profile data to the server
      axios
        .put(
          `${process.env.VUE_APP_BASE_URL}users/update/${this.user.id}`,
          this.user
        )
        .then((response) => {
          alert("Profile updated successfully");
        })
        .catch((error) => {
          console.error("Error saving profile:", error);
          alert("There was an error updating the profile");
        });
    },
  },

  mounted() {
    this.fetchUserData();
  },
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
