<template>
  <div class="container mx-auto mt-8 p-4">
    <h1 class="text-2xl font-bold text-center mb-6">Your Cart Products</h1>

    <!-- No Products -->
    <div v-if="cart.length === 0" class="text-center text-gray-500">
      No products found in your cart.
    </div>

    <!-- Products List -->
    <div v-else>
      <div
        v-for="(product, index) in products"
        :key="product.id"
        class="flex items-center justify-between p-4 border rounded-lg shadow hover:shadow-lg transition mb-4"
      >
        <!-- Product Image -->
        <img
          :src="getImgUrl(product.product_img)"
          :alt="product.name"
          class="w-32 h-32 object-cover rounded-md cursor-pointer"
          @click="viewImg(product.product_img)"
        />

        <!-- Product Details -->
        <div class="flex-1 px-4">
          <h2 class="text-lg font-semibold mb-1">{{ product.name }}</h2>
          <p class="text-gray-600">SKU: {{ product.sku }}</p>

          <button
            @click="removeProduct(index)"
            class="px-20 py-3 my-3 bg-yellow-600 text-white rounded hover:bg-yellow-500"
          >
            Remove
          </button>
        </div>
        <div class="justify-between items-center px-20 mx-10 flex">
          <h1 class="text-black-600">Price: {{ product.price || 0 }}</h1>
        </div>

        <div class="flex items-center gap-4 p-2 rounded">
          <h1 class="text-sm font-medium text-gray-600">Quantity:</h1>
          <div class="flex items-center border rounded-md">
            <button
              @click="updateQuantity(index, -1)"
              class="px-3 py-2 text-black rounded-l-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              −
            </button>
            <span class="px-4 text-lg font-semibold text-gray-800">
              {{ cart[index].quantity }}
            </span>
            <button
              @click="updateQuantity(index, 1)"
              class="px-3 py-2 text-black rounded-r-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div
        class="text-right mt-4 fixed bottom-0 left-0 right-0 bg-black bg-black-400 text-white"
      >
        <div class="mr-32 py-10 flex right-0 justify-end">
          <h2 class="text-xl font-bold mx-10 justify-center text-center py-3">
            Total Price: Total Price: ${{ totalPrice }}
          </h2>
          <button
            class="px-6 py-3 bg-yellow-600 text-white rounded hover:bg-yellow-500"
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import axios from "axios";

export default {
  name: "ProductList",
  data() {
    return {
      products: [],
      cart: [],
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((sum, item, index) => {
        const product = this.products[index];
        if (product && product.price !== undefined) {
          return sum + product.price * item.quantity;
        }
        return sum;
      }, 0);
    },
  },
  methods: {
    loadCart() {
      const cartCookie = Cookies.get("cart");
      this.cart = cartCookie
        ? JSON.parse(cartCookie).map((item) => ({
            ...item,

            quantity: item.quantity || 1,
          }))
        : [];
    },

    async fetchProducts() {
      const baseUrl = `${process.env.VUE_APP_BASE_URL}/products/find/`;
      try {
        const requests = this.cart.map((item) =>
          axios.get(`${baseUrl}${item.productId}`)
        );
        const responses = await Promise.all(requests);
        this.products = responses.map((response) => response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },

    updateQuantity(index, change) {
      const newQuantity = this.cart[index].quantity + change;
      if (newQuantity > 0) {
        this.cart[index].quantity = newQuantity;
      } else {
        this.removeProduct(index);
        return;
      }
      this.updateCartCookies();
    },

    removeProduct(index) {
      this.cart.splice(index, 1);
      this.products.splice(index, 1);
      this.updateCartCookies();
    },

    // Update cart in cookies
    updateCartCookies() {
      Cookies.set("cart", JSON.stringify(this.cart), { expires: 7 });
    },

    viewImg(imagePath) {
      window.open(
        `${process.env.VUE_APP_BASE_URL}/products/get_img/${imagePath}`,
        "_blank"
      );
    },

    getImgUrl(imagePath) {
      return `${process.env.VUE_APP_BASE_URL}/products/get_img/${imagePath}`;
    },
  },
  async mounted() {
    this.loadCart();
    if (this.cart.length > 0) {
      await this.fetchProducts();
    }
  },
};
</script>

<style scoped>
button {
  transition: background-color 0.2s ease-in-out;
}
</style>
