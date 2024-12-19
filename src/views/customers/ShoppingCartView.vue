<template>
  <div class="flex flex-col">
    <div class="w-full">
      <p class="m-4 font-bold text-xl">My Shopping Cart</p>
    </div>

    <!-- Empty Cart -->
    <div v-if="allcart.length === 0" class="border p-8 text-center m-4">
      <img
        src="../../assets/icon_empty_cart.png"
        class="h-20 w-20 mx-auto mb-2"
      />
      <p class="text-gray-700">No items yet</p>
      <p class="text-gray-700">
        Start adding now by selecting products on our website
      </p>
      <button
        class="flex-none bg-primary-600 rounded-md text-white px-8 py-2 hover:bg-primary-700 duration-300 my-4"
        @click="goToUrl('/products')"
      >
        Перейти к продуктам
      </button>
    </div>

    <!-- Populated Cart -->
    <div v-else class="mx-36 my-10">
      <div
        v-for="(product, index) in allcart"
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

          <p class="text-gray-600">quantity: {{ product.quantity }}</p>
          <button
            @click="removeProduct(product.id)"
            class="px-4 py-2 mt-3 bg-yellow-600 text-white rounded hover:bg-yellow-500"
          >
            Remove
          </button>
        </div>
        <div class="justify-between items-center px-20 mx-10 flex">
          <h1 class="text-black-600">
            Price: {{ changeMonetaryFormat(product.price) }}
          </h1>
        </div>

        <!-- Quantity Control -->
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
              {{ product.quantity }}
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

      <!-- Total and Checkout -->
      <div
        class="text-right mt-4 fixed bottom-0 left-0 right-0 bg-black bg-black-400 text-white"
      >
        <div class="mr-32 py-10 flex right-0 justify-end">
          <h2 class="text-xl font-bold mx-10 justify-center text-center py-3">
            Total Price: {{ changeMonetaryFormat(totalPrice) }}
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
import axios from "axios";

export default {
  data() {
    return {
      allcart: [],
    };
  },
  computed: {
    totalPrice() {
      return this.allcart.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
    },
  },
  methods: {
    goToUrl(val) {
      this.$router.push(val);
    },
    refreshData() {
      this.getItemsFromCart();
    },
    getItemsFromCart() {
      axios
        .get(
          `${process.env.VUE_APP_BASE_URL}/user_carts/find_by_type/${this.$store.state.user.id}/1/1/20`
        )
        .then((res) => {
          if (res.status === 200) {
            const cartData = res.data[0];
            this.allcart = cartData.map((item) => ({
              id: item.id,
              product_id: item.product_id.id,
              name: item.product_id.name,
              sku: item.product_id.sku,
              product_img: item.product_id.product_img,
              price: item.product_id.price || 0,
              quantity: item.quantity,
            }));
          }
        })
        .catch((error) => {
          console.error("Error fetching cart items:", error);
        });
    },
    updateQuantity(index, delta) {
      const product = this.allcart[index];
      const newQuantity = product.quantity + delta;
      if (newQuantity > 0) {
        product.quantity = newQuantity;
        axios
          .put(`${process.env.VUE_APP_BASE_URL}/user_carts/update`, {
            user_id: this.$store.state.user.id,
            product_id: product.id,
            quantity: newQuantity,
          })
          .then(() => {
            console.log("Quantity updated successfully");
          })
          .catch((error) => {
            console.error("Error updating quantity:", error);
          });
      }
    },
    removeProduct(product) {
      // const product = this.allcart[index];
      // this.allcart.splice(index, 1);
      axios
        .post(`${process.env.VUE_APP_BASE_URL}/user_carts/delete`, {
          id: product,
        })
        .then(() => {
          console.log("Product removed successfully");
        })
        .catch((error) => {
          console.error("Error removing product:", error);
        });
    },
    getImgUrl(imgPath) {
      return `${process.env.VUE_APP_BASE_URL}/products/get_img/${imgPath}`;
    },
    viewImg(imgPath) {
      window.open(this.getImgUrl(imgPath), "_blank");
    },
    changeMonetaryFormat(val) {
      return `${val}₽`;
    },
  },
  mounted() {
    this.refreshData();
  },
};
</script>
