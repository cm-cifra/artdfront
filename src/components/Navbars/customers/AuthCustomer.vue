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

    <!-- Cart, Favorite, User, and Logout -->
    <div class="flex-none flex items-center">
      <div class="relative">
        <!-- Cart Icon -->
        <i
          class="pi pi-shopping-cart text-white duration-300 hover:transform hover:scale-150 p-2 mx-2 text-lg cursor-pointer hover:text-primary-600"
          @click="goToUrl('/cart')"
        ></i>
        <span
          v-if="cartCount > 0"
          class="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold px-1 py-0.5 rounded-full"
        >
          {{ cartCount }}
        </span>
      </div>
      <i
        class="pi pi-heart text-white duration-300 hover:transform hover:scale-150 p-2 mx-2 text-lg cursor-pointer hover:text-primary-600"
        @click="goToUrl('/cart/favorites')"
      ></i>
      <i
        class="pi pi-user text-white duration-300 hover:transform hover:scale-150 p-2 mx-2 text-lg cursor-pointer hover:text-primary-600"
        @click="goToUrl('/profile/')"
      ></i>
      <!-- Logout Button -->
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  data() {
    return {
      isMenuOpen: false,
      cartCount: 0,
    };
  },
  methods: {
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

    // Logout functionality
    logout() {
      localStorage.removeItem("userToken");
      Cookies.remove("cart");
      this.$router.push("/");
    },
  },
  mounted() {
    this.loadCartCount(); // Load cart count on component mount
  },
};
</script>
