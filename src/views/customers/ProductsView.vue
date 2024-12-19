<template>
  <div class="flex flex-col">
    <div class="w-full h-[200px]">
      <swiper
        :pagination="true"
        :effect="'fade'"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
        }"
        :navigation="true"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide class="relative">
          <div class="w-1/2 mx-20 my-10 sm:m-20 absolute z-20">
            <p class="font-bold md:text-3xl sm:text-4xl text-white">
              ОТЛИЧНЫЕ КАЧЕСТВА
            </p>
            <!-- <p class="text-gray-200 text-xs sm:text-lg">Оборудование для ванных комнат, Готовые решения, Шоу-оборудование и многое другое...</p> -->
          </div>
          <img
            src="../../assets/100734.jpg"
            class="object-cover brightness-50"
          />
        </swiper-slide>
        <swiper-slide class="relative">
          <div class="w-1/2 mx-20 my-10 sm:m-20 absolute z-20">
            <p class="font-bold md:text-3xl sm:text-4xl text-white">
              ДОСТУПНЫЕ ЦЕНЫ
            </p>
            <!-- <p class="text-gray-200 text-xs sm:text-lg">Оборудование для ванных комнат, Готовые решения, Шоу-оборудование и многое другое...</p> -->
          </div>
          <img
            src="../../assets/163025.jpg"
            class="object-cover brightness-50"
          />
        </swiper-slide>
      </swiper>
    </div>

    <div class="flex-auto flex flex-row">
      <div class="flex-none border p-4">
        <div>
          <p class="font-bold">CATEGORY</p>
          <p
            class="font-lighter text-sm cursor-pointer hover:font-bold duration-300 my-2"
            :class="
              view_category_id == 0
                ? 'font-bold text-primary-700'
                : 'font-normal text-gray-600'
            "
            @click="selectCategory(0)"
          >
            All
          </p>
          <p
            class="font-lighter text-sm cursor-pointer hover:font-bold duration-300 my-2"
            :class="
              view_category_id == i.id
                ? 'font-bold text-primary-700'
                : 'font-normal text-gray-600'
            "
            v-for="i in allcategories"
            v-bind:key="i.id"
            @click="selectCategory(i.id)"
          >
            {{ i.description }}
          </p>
        </div>

        <div>
          <p class="font-bold">COLLECTIONS</p>
          <p
            class="font-lighter text-sm cursor-pointer hover:font-bold duration-300 my-2"
            :class="
              view_collection_id == 0
                ? 'font-bold text-primary-700'
                : 'font-normal text-gray-600'
            "
            @click="selectCollection(0)"
          >
            All
          </p>
          <p
            class="font-lighter text-sm cursor-pointer hover:font-bold duration-300 my-2"
            :class="
              view_collection_id == i.id
                ? 'font-bold text-primary-700'
                : 'font-normal text-gray-600'
            "
            v-for="i in allcollections"
            v-bind:key="i.id"
            @click="selectCollection(i.id)"
          >
            {{ i.description }}
          </p>
        </div>
      </div>

      <div class="flex-auto border">
        <div
          v-if="allproducts.length == 0"
          class="w-full text-center justify-center p-8"
        >
          <img
            src="../../assets/empty_list.png"
            class="h-20 w-20 mx-auto mb-2"
          />
          <p class="text-gray-600">No products to display yet</p>
        </div>

        <div
          v-if="allproducts.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
        >
          <div
            v-for="i in allproducts"
            v-bind:key="i.id"
            class="flex flex-col border p-4"
          >
            <img
              class="w-full h-72 border-1 border rounded-2xl object-cover mb-4 flex-none hover:opacity-70 duration-300 hover:cursor-pointer"
              :src="getImgUrl(i.product_img)"
              @click="viewProduct(i.sku)"
            />
            <div class="flex-1 py-2" @click="viewProduct(i.sku)">
              <div class="flex items-center gap-4">
                <p class="flex-1 text-primary-600 text-sm">
                  {{ i.collection_id.description }}
                </p>
                <p class="flex-1 text-gray-800 text-sm text-end">
                  {{ i.category_id.description }}
                </p>
              </div>

              <p>{{ i.sku }}</p>
              <p class="font-extralight">{{ i.name }}</p>
              <p class="font-light">{{ changeMonetaryFormat(i.price) }}</p>
            </div>
            <div class="flex items-center flex-none">
              <div class="flex-auto">
                <button
                  class="bg-primary-600 rounded-md text-white px-8 py-2 hover:bg-primary-700 duration-300"
                  @click="viewProduct(i.sku)"
                >
                  КУПИТЬ СЕЙЧАС
                </button>
              </div>
              <div class="flex items-center flex-none gap-4">
                <i
                  class="pi pi-shopping-cart text-black text-4xl hover:text-yellow-400"
                  :class="{ 'animate-bounce': isAddingToCart }"
                  @click="handleAddToCart(i.id)"
                ></i>

                <i
                  class="pi pi-heart text-black hover:text-yellow-400 text-3xl"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/vue";
import Cookies from "js-cookie";
// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css";

import { EffectFade, Autoplay, Pagination, Navigation } from "swiper/modules";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      page: 1,
      total_cnt: 0,
      total_pages: 0,
      page_list: [],
      page_limit: 25,
      isAddingToCart: false,
      modules: [EffectFade, Autoplay, Pagination, Navigation],
      allcategories: "",
      allproducts: "",
      allcollections: "",

      view_category_id: 0,
      view_collection_id: 0,
    };
  },
  methods: {
    refreshData() {
      this.getCategories(0);
      this.getProducts();
      this.getCollections(0);
    },
    viewProduct(id) {
      this.$router.push("/products/" + id);
    },
    viewImg(imagePath) {
      window.open(
        process.env.VUE_APP_BASE_URL + "/products/get_img/" + imagePath,
        "_blank"
      );
    },
    getImgUrl(imagePath) {
      return process.env.VUE_APP_BASE_URL + "/products/get_img/" + imagePath;
    },
    changeMonetaryFormat(val) {
      return val + "₽";
    },
    selectCollection(id) {
      this.view_collection_id = id;

      this.getProductsByCollection(id);
    },
    selectCategory(id) {
      this.view_category_id = id;

      this.getCategories(id);
    },
    getProductsByCollection(id) {
      if (id == 0) {
        axios
          .get(
            process.env.VUE_APP_BASE_URL +
              "/products/find_by_category/" +
              this.view_category_id +
              "/" +
              this.page +
              "/" +
              this.page_limit
          )
          .then((res) => {
            if (res.status == 200) {
              this.allproducts = res.data[0];
            }
          });
      } else {
        axios
          .get(
            process.env.VUE_APP_BASE_URL +
              "/products/find_by_collection/" +
              id +
              "/" +
              this.page +
              "/" +
              this.page_limit
          )
          .then((res) => {
            if (res.status == 200) {
              this.allproducts = res.data[0];
            }
          });
      }
    },
    getCollections(id) {
      if (id == 0) {
        if (this.allcollections.length == 0) {
          axios
            .get(process.env.VUE_APP_BASE_URL + "/collections/get_all")
            .then((res) => {
              if (res.status == 200) {
                this.allcollections = res.data;
              }
            });
        }
      } else {
        axios
          .get(
            process.env.VUE_APP_BASE_URL + "/collections/find_by_category/" + id
          )
          .then((res) => {
            if (res.status == 200) {
              this.allcollections = res.data;
            }
          });
      }
    },
    async handleAddToCart(productId) {
      this.isAddingToCart = true; // Start animation
      setTimeout(() => (this.isAddingToCart = false), 500); // Stop animation after 0.5s

      // Call the existing addToCart method
      await this.addToCart(productId);
    },
    // add to cart
    async addToCart(productId) {
      const userId = this.$store.state.user?.id || null;

      if (userId != null) {
        // User is logged in, store product in the backend
        try {
          const checkResponse = await axios.get(
            `${process.env.VUE_APP_BASE_URL}/user_carts/find_by_user/${userId}/1/1/${productId}`
          );

          if (checkResponse.data.exists) {
            // If the product exists, get the cart item's ID and update the quantity
            const cartItem = checkResponse.data;

            // Update the quantity of the existing product
            const updateResponse = await axios.put(
              `${process.env.VUE_APP_BASE_URL}/user_carts/edit/${cartItem.id}`,
              {
                quantity: cartItem.quantity + 1, // Increment existing quantity
              }
            );
            console.log("Quantity updated successfully:", updateResponse.data);
          } else {
            // If the product does not exist, add a new entry
            const addResponse = await axios.post(
              `${process.env.VUE_APP_BASE_URL}/user_carts/add`,
              {
                user_id: userId,
                type: 1,
                product_id: productId,
                quantity: 1,
                status: 1,
              }
            );
            console.log("Product added to backend cart:", addResponse.data);
          }
        } catch (error) {
          console.error("Error processing cart:", error);
        }
        window.location.reload();
      } else {
        // If the user is not logged in, store the cart in cookies
        let cart = Cookies.get("cart");
        cart = cart ? JSON.parse(cart) : [];

        const existingProduct = cart.find(
          (item) => item.productId === productId
        );

        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          cart.push({ productId, quantity: 1 });
        }

        // Store cart in cookies for 7 days
        Cookies.set("cart", JSON.stringify(cart), { expires: 7 });
        console.log("Product added to cart (cookies):", cart);
      }
    },
    getCategories(id) {
      if (id == 0) {
        this.getProducts();

        this.view_category_id = 0;
        this.view_collection_id = 0;

        axios
          .get(process.env.VUE_APP_BASE_URL + "/categories/get_all")
          .then((res) => {
            if (res.status == 200) {
              this.allcategories = res.data;
            }
          });

        axios
          .get(process.env.VUE_APP_BASE_URL + "/collections/get_all")
          .then((res) => {
            if (res.status == 200) {
              this.allcollections = res.data;
            }
          });
      } else {
        this.getCollections(id);
        axios
          .get(
            process.env.VUE_APP_BASE_URL +
              "/products/find_by_category/" +
              id +
              "/" +
              this.page +
              "/" +
              this.page_limit
          )
          .then((res) => {
            if (res.status == 200) {
              this.allproducts = res.data[0];
            }
          });
      }
    },
    getProducts() {
      axios
        .get(process.env.VUE_APP_BASE_URL + "/products/get_all/1/50")
        .then((res) => {
          if (res.status == 200) {
            this.allproducts = res.data[0];
          }
        });
    },
  },
  mounted() {
    this.refreshData();
  },
};
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.animate-bounce {
  animation: bounce 0.5s ease infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
