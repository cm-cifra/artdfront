<template>
  <div
    class="h-20 z-10 top-0 justify-between right-0 left-0 flex fixed bg-black-500 py-2 px-4 md:px-8 gap-4"
  >
    <div class="flex flex-wrap items-center">
      <button
        class="md:hidden text-white focus:outline-none"
        @click="toggleMenu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 12h16.5m-16.5-6h16.5M3.75 18h16.5"
          />
        </svg>
      </button>
      <img
        src="../../../assets/logo_single.png"
        class="flex-none h-10 w-10 cursor-pointer mx-5"
        @click="goToUrl('/home')"
      />

      <nav
        :class="[
          'flex-auto md:flex absolute top-20 bg-black-500 md:static',
          isMenuOpen ? 'block' : 'hidden',
        ]"
        class="text-white text-sm z-10"
      >
        <ul
          class="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 z-10"
        >
          <li
            class="hover:cursor-pointer hover:text-primary-600 duration-200 px-6"
          >
            корпоративная установка
          </li>
          <li
            @click="goToUrl('/collections')"
            class="cursor-pointer hover:text-primary-600 duration-200 px-6"
          >
            коллекция
          </li>
          <li
            @click="goToUrl('/catalogs')"
            class="cursor-pointer hover:text-primary-600 duration-200 px-6"
          >
            каталоги
          </li>
          <li
            @click="goToUrl('/products')"
            class="cursor-pointer hover:text-primary-600 duration-200 px-6"
          >
            Продукты
          </li>
          <li
            @click="goToUrl('/about')"
            class="cursor-pointer hover:text-primary-600 duration-200 px-6"
          >
            о нас
          </li>
        </ul>
      </nav>
    </div>

    <!-- Cart and Favorite Icons -->
    <div class="flex-none flex items-center">
      <div class="relative">
        <!-- Cart Icon -->
        <i
          class="pi pi-shopping-cart text-white duration-300 hover:transform hover:scale-150 p-2 mx-2 text-lg cursor-pointer hover:text-primary-600"
          @click="goToUrl('/my-cart')"
        ></i>
        <!-- Badge for Cart Count -->
        <span
          v-if="cartCount > 0"
          class="absolute -ml-10 bg-red-500 text-white text-xs font-bold px-1 py-0.5 rounded-full"
        >
          {{ cartCount }}
        </span>
      </div>

      <!-- Favorites Icon -->
      <i
        class="pi pi-heart text-white duration-300 hover:transform hover:scale-150 p-2 mx-2 text-lg cursor-pointer hover:text-primary-600"
        @click="goToUrl('/cart/favorites')"
      ></i>
      <p
        class="text-white flex-none hover:text-primary-600 mx-2 duration-200 cursor-pointer"
        @click="showLogin()"
      >
        ВОЙТИ
      </p>
    </div>
  </div>

  <LoginModal
    v-if="showModal_Login"
    @close-modal="showModal_Login = false"
    @show-signup="openSignupModal"
  />

  <SignUpModal
    v-if="showModal_Signup"
    @close-modal="showModal_Signup = false"
  />
</template>

<script>
import Cookies from "js-cookie";
import LoginModal from "../../Modals/customers/LoginModal.vue";
import SignUpModal from "../../Modals/customers/SignupModal.vue";
export default {
  data() {
    return {
      showModal_Login: false,
      isMenuOpen: false,
      cartCount: 0,
    };
  },
  components: {
    LoginModal,
    SignUpModal,
  },
  methods: {
    // Show login modal
    showLogin() {
      this.showModal_Login = true;
    },

    // Navigate to specified route
    goToUrl(val) {
      this.$router.push(val);
    },

    // Toggle menu visibility
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },

    // Load cart count from cookies
    loadCartCount() {
      const cartCookie = Cookies.get("cart");
      if (cartCookie) {
        try {
          const cartData = JSON.parse(cartCookie);
          this.cartCount = cartData.length;
        } catch (e) {
          console.error("Error parsing cart data from cookies:", e);
          this.cartCount = 0;
        }
      } else {
        this.cartCount = 0;
      }
    },
  },
  mounted() {
    this.loadCartCount(); // Load cart count on component mount
  },
};
</script>

<style>
/* Add any additional styles here */
</style>
