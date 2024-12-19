<template>
  <div
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
    @click="closeModal()"
  >
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>

    <div class="fixed z-10 inset-0 w-auto h-auto">
      <div
        class="flex flex-col h-auto w-screen sm:w-1/4 overflow-y-auto lg:mx-auto fadeInSlide sm:mt-20 sm:rounded-2xl"
      >
        <div
          class="flex-auto overflow-y-auto bg-black-400 sm:rounded-b-xl sm:h-auto lg:px-2 sm:rounded-2xl"
          @click.stop
        >
          <div class="flex flex-col sm:flex-row p-4 gap-4">
            <div class="flex-1 flex flex-col h-auto max-h-full gap-4">
              <div class="flex-1 flex flex-col p-8 space-y-4">
                <div class="flex-none text-center">
                  <img
                    src="../../../assets/logo_single.png"
                    class="w-24 h-24 mx-auto"
                    alt="Logo"
                  />
                  <p class="text-white text-lg my-4">Sign in to your account</p>
                </div>

                <!-- Email Field -->
                <div class="flex-none">
                  <label class="text-xs text-white">Email address</label>
                  <input
                    type="email"
                    v-model="email"
                    class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 text-sm p-4 w-full"
                  />
                </div>

                <!-- Password Field -->
                <div class="flex-none">
                  <label class="text-xs text-white">Password</label>
                  <input
                    type="password"
                    v-model="password"
                    class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 text-sm p-4 w-full"
                  />
                </div>

                <!-- Alert Message -->
                <div
                  v-if="alertMsg"
                  class="text-red-500 text-sm text-center py-2"
                >
                  {{ alertMsg }}
                </div>

                <!-- Login Button -->
                <div class="flex-none">
                  <button
                    class="bg-primary-600 px-8 rounded-md py-2 text-white w-full"
                    @click="loginUser"
                    :disabled="loading"
                  >
                    <span v-if="loading">Loading...</span>
                    <span v-else>Login</span>
                  </button>
                </div>

                <!-- Signup Link -->
                <div class="flex-none text-center py-4">
                  <p class="text-white">
                    No account yet?
                    <span
                      class="text-primary-600 cursor-pointer hover:text-primary-500"
                      @click="PromptModal"
                    >
                      Sign up
                    </span>
                  </p>
                </div>

                <div class="flex-none">
                  <hr class="bg-white" />
                </div>

                <!-- Social Login -->
                <div class="flex-none text-center py-4">
                  <p class="text-white">or sign up using</p>
                  <div class="flex items-center gap-4 justify-center py-4">
                    <i
                      class="pi pi-google text-white hover:text-primary-600 cursor-pointer text-2xl"
                    ></i>
                    <i
                      class="pi pi-facebook text-white hover:text-primary-600 cursor-pointer text-2xl"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Prompt Modal -->
  <PromptModal
    v-if="show_PromptModal"
    @close-modal="show_PromptModal = false"
    :refreshData="refreshData2"
    :prompt_data="prompt_data"
  />
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      email: "",
      password: "",
      alertMsg: "",
      loading: false,
      show_PromptModal: false,
      prompt_data: {
        email: "",
        password: "",
        products: [],
        cart: [],
      },
    };
  },
  methods: {
    async loginUser() {
      this.alertMsg = "";
      this.loading = true;

      const user_data = {
        email: this.email,
        password: this.password,
      };

      try {
        const res = await axios.post(
          `${process.env.VUE_APP_BASE_URL}/auth/login`,
          user_data
        );

        if (res.data.status === 302) {
          this.email = "";
          this.password = "";

          // Store userId and token in localStorage
          localStorage.setItem("userToken", res.data.token);
          localStorage.setItem("userId", res.data.user.id);

          this.$store.commit("UPDATE_USER", res.data.user);

          this.loadCart();
          if (this.cart.length > 0) {
            await this.syncCart();
          }

          Cookies.remove("cart");

          // Redirect to home page
          this.$router.push(`/home/`);

          // Refresh the page after a successful login
          window.location.reload();
        } else {
          this.alertMsg = res.data.message;
        }
      } catch (error) {
        this.alertMsg = "An error occurred. Please try again.";
        console.error("Login failed:", error);
      } finally {
        this.loading = false;
      }
    },
    loadCart() {
      const cartCookie = Cookies.get("cart");
      const userId = parseInt(localStorage.getItem("userId"), 10);
      this.cart = cartCookie
        ? JSON.parse(cartCookie).map((item) => ({
            ...item,
            user_id: userId,
            type: 1,
            status: 1,
            quantity: item.quantity || 1,
          }))
        : [];
    },
    async syncCart() {
      const baseUrl = `${process.env.VUE_APP_BASE_URL}/user_carts/add`;
      try {
        // Create a batch request to add all items in the cart
        const requests = this.cart.map((item) => {
          return axios.post(baseUrl, {
            product_id: item.productId,
            user_id: item.user_id,
            type: 1,
            status: 1,
            quantity: item.quantity,
          });
        });

        // Await all requests to complete
        const responses = await Promise.all(requests);
        // Update the products based on the responses
        this.products = responses.map((response) => response.data);
      } catch (error) {
        console.error("Error syncing cart items:", error);
      }
    },

    closeModal() {
      this.show_PromptModal = false;
    },

    PromptModal() {
      this.show_PromptModal = true;
    },
  },
};
</script>
