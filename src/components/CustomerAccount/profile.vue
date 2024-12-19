<template>
  <div class="mt-8 mx-10">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">My Profile</h2>
    <form @submit.prevent="saveProfile">
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Left Form Fields -->
        <div>
          <div class="mb-4">
            <label for="username" class="text-sm font-semibold text-gray-700"
              >Username</label
            >
            <input
              type="text"
              id="username"
              v-model="user.username"
              class="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div class="mb-4">
            <label for="fullname" class="text-sm font-semibold text-gray-700"
              >Full Name</label
            >
            <input
              type="text"
              id="fullname"
              v-model="user.fname"
              class="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
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
            />
          </div>

          <div class="mb-4">
            <label for="mobile" class="text-sm font-semibold text-gray-700"
              >Mobile Number</label
            >
            <input
              type="text"
              id="mobile"
              v-model="user.contact_num"
              class="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div class="mb-4">
            <label for="gender" class="text-sm font-semibold text-gray-700"
              >Gender</label
            >
            <input
              type="text"
              id="gender"
              v-model="user.gender"
              class="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
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
          <label for="avatar" class="text-sm font-semibold text-gray-700 mt-4"
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
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      imagePreview: this.user.imagePreview,
    };
  },
  methods: {
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
    saveProfile() {
      this.$emit("updateProfile", this.user);
    },
  },
};
</script>

<style scoped>
/* Custom styles for the profile form component */
</style>
