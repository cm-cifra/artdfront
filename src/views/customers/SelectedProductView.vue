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
            class="img-carousel object-cover brightness-50"
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
            class="img-carousel object-cover brightness-50"
          />
        </swiper-slide>
      </swiper>
    </div>

    <div class="w-full" ref="prod_desc">
      <div class="flex flex-row">
        <div class="flex-1 flex flex-row p-10 gap-4 border">
          <div
            class="w-auto h-full max-w-[200px] max-h-[385px] flex-none border p-4"
          >
            <swiper
              :slidesPerView="3"
              :direction="'vertical'"
              :spaceBetween="10"
              :freeMode="true"
              :pagination="{
                clickable: true,
              }"
              :modules="modules"
              class="mySwiper"
            >
              <swiper-slide>
                <img
                  :src="getImgUrl(data.product_img)"
                  @click="viewSubImg($event)"
                  class="sub-imgs rounded-2xl h-[300px] w-[300px] object-cover cursor-pointer duration-300 hover:brightness-50"
                />
              </swiper-slide>
              <swiper-slide v-for="i in data.sub_imgs" v-bind:key="i.id">
                <img
                  :src="getSubImgUrl(i.file_name)"
                  @click="viewSubImg($event)"
                  class="sub-imgs rounded-2xl h-[300px] w-[300px] object-cover cursor-pointer duration-300 hover:brightness-50"
                />
              </swiper-slide>
            </swiper>
          </div>

          <img
            ref="main_img"
            :src="getImgUrl(data.product_img)"
            class="flex-auto rounded-2xl h-[600px] w-[600px] object-cover transition-all duration-300 fadeInSlide"
          />
        </div>

        <div class="flex-1 p-10 border">
          <p class="text-2xl font-bold mb-4">{{ data.name }}</p>
          <p class="flex-none text-gray-800 text-sm">
            {{ data.category_id.description }}
          </p>
          <p class="flex-none text-primary-600 text-sm">
            {{ data.collection_id.description }}
          </p>
          <p class="text-2xl">{{ changeMonetaryFormat(data.price) }}</p>

          <div class="flex items-center flex-none gap-4">
            <button
              class="flex-none bg-primary-600 rounded-md text-white px-8 py-2 hover:bg-primary-700 duration-300 my-4"
            >
              КУПИТЬ
            </button>
            <button
              class="flex-none bg-primary-600 rounded-md text-white px-8 py-2 hover:bg-primary-700 duration-300 my-4"
              @click="goToUrl('/preview/' + data.sku)"
            >
              ПРЕДВАРИТЕЛЬНЫЙ ПРОСМОТР
            </button>
            <i
              class="pi pi-shopping-cart text-black text-4xl hover:text-yellow-400"
              @click="addToCart(data.id)"
            ></i>
            <i
              class="pi pi-heart text-black hover:text-yellow-400 text-3xl"
            ></i>
          </div>

          <div v-if="data.category_id.description == 'Kits'">
            <p class="text-gray-800 text-sm">Kit composition:</p>

            <div
              v-for="i in alladdedproducts"
              v-bind:key="data.id"
              class="text-gray-800 flex items-center gap-4 my-2"
            >
              <img
                :src="getImgUrl(i.product_id.product_img)"
                class="h-14 w-14 object-cover rounded-md cursor-pointer hover:brightness-50 duration-300"
                @click="viewImg($event)"
              />
              {{ i.product_id.name }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full">
      <p class="m-4 font-bold text-xl">Find other related vanities</p>
    </div>

    <div class="w-full flex flex-row">
      <swiper
        :slidesPerView="5"
        :freeMode="true"
        :modules="modules"
        class="mySwiper flex flex-row"
      >
        <swiper-slide
          v-for="i in allproducts_categories"
          v-bind:key="i.id"
          class="flex-none flex flex-col border p-4"
        >
          <img
            :src="getImgUrl(i.product_img)"
            class="w-full h-72 border-1 border rounded-2xl object-cover mb-4 flex-none hover:opacity-70 duration-300 hover:cursor-pointer"
            @click="viewImg(i.product_img)"
          />
          <div class="flex-auto py-2 w-full text-start">
            <div class="flex items-center gap-4 w-full">
              <p class="flex-1 text-primary-600 text-sm text-start">
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
          <div class="flex items-center flex-none w-full">
            <div class="flex-auto text-start">
              <button
                class="bg-primary-600 rounded-md text-white px-8 py-2 hover:bg-primary-700 duration-300"
                @click="viewProduct(i.sku)"
              >
                КУПИТЬ
              </button>
            </div>
            <div class="flex items-center flex-none gap-4">
              <i
                class="pi pi-shopping-cart text-black text-4xl hover:text-yellow-400"
                @click="addToCart(i.id)"
              ></i>
              <i
                class="pi pi-heart text-black hover:text-yellow-400 text-3xl"
              ></i>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <h1></h1>
    <div class="w-full">
      <p class="m-4 font-bold text-xl">Find other related collections</p>
    </div>

    <div class="w-full flex flex-row">
      <swiper
        :slidesPerView="5"
        :freeMode="true"
        :modules="modules"
        class="mySwiper flex flex-row"
      >
        <swiper-slide
          v-for="i in allproducts_collections"
          v-bind:key="i.id"
          class="flex-none flex flex-col border p-4"
        >
          <img
            :src="getImgUrl(i.product_img)"
            class="w-full h-72 border-1 border rounded-2xl object-cover mb-4 flex-none hover:opacity-70 duration-300 hover:cursor-pointer"
            @click="viewImg(i.product_img)"
          />
          <div class="flex-auto py-2 w-full text-start">
            <div class="flex items-center gap-4 w-full">
              <p class="flex-1 text-primary-600 text-sm text-start">
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
          <div class="flex items-center flex-none w-full">
            <div class="flex-auto text-start">
              <button
                class="bg-primary-600 rounded-md text-white px-8 py-2 hover:bg-primary-700 duration-300"
                @click="viewProduct(i.sku)"
              >
                КУПИТЬ
              </button>
            </div>
            <div class="flex items-center flex-none gap-4">
              <i
                class="pi pi-shopping-cart text-black text-4xl hover:text-yellow-400"
                @click="addToCart(i.id)"
              ></i>
              <i
                class="pi pi-heart text-black hover:text-yellow-400 text-3xl"
              ></i>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <LoadingView v-if="show_Loading" />
  </div>
</template>

<script>
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/vue";
import LoadingView from "../LoadingView.vue";
import Preview from "./prepreview.vue";
import Cookies from "js-cookie";
// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";
import "swiper/css";

import {
  FreeMode,
  EffectFade,
  Autoplay,
  Pagination,
  Navigation,
} from "swiper/modules";

export default {
  components: {
    Swiper,
    SwiperSlide,
    LoadingView,
    Preview,
  },
  data() {
    return {
      show_Loading: false,

      alladdedproducts: "",

      menu_list: [],

      page: 1,
      total_cnt: 0,
      total_pages: 0,
      page_list: [],
      page_limit: 25,

      modules: [FreeMode, EffectFade, Autoplay, Pagination, Navigation],
      allproducts_collections: "",
      allproducts_categories: "",

      view_category_id: 0,
      view_collection_id: 0,

      selected_id: 0,

      data: {
        id: 0,
        name: "",
        sku: "",
        category_id: "",
        collection_id: "",
        product_img: "",
        sub_imgs: "",
        price: 0,
      },
    };
  },
  methods: {
    goToUrl(val) {
      this.$router.push(val);
    },
    refreshData() {
      this.getParam();
    },
    getParam() {
      this.selected_id = this.$route.params.id;

      this.getProductInfo();
    },
    getProductsOfKit() {
      axios
        .get(
          process.env.VUE_APP_BASE_URL +
            "/product_kits/find_by_kit/" +
            this.data.id
        )
        .then((res) => {
          if (res.status == 200) {
            this.alladdedproducts = res.data;

            // this.data_info.id = res.data.id;
            // this.data_info.product_id = res.data.product_id;
            // this.data_info.brand = res.data.brand;
            // this.data_info.configuration = res.data.configuration;
            // this.data_info.datetime_modified = res.data.datetime_modified;
          }
        });
    },
    async addToCart(productId) {
      // Retrieve the existing cart from cookies, or initialize an empty array
      let cart = Cookies.get("cart");
      cart = cart ? JSON.parse(cart) : [];

      // Check if the product already exists in the cart
      const existingProduct = cart.find((item) => item.productId === productId);

      if (existingProduct) {
        // If the product exists, increment the quantity
        existingProduct.quantity += 1;
      } else {
        // If not, add a new entry
        cart.push({ productId, quantity: 1 });
      }

      // Save the updated cart back to cookies
      Cookies.set("cart", JSON.stringify(cart), { expires: 7 }); // Cookie expires in 7 days

      console.log("Product added to cart:", cart);
    },
    getProductInfo() {
      axios
        .get(
          process.env.VUE_APP_BASE_URL +
            "/products/find_by_sku/" +
            this.selected_id
        )
        .then((res) => {
          if (res.status == 200) {
            this.data.id = res.data.id;
            this.data.name = res.data.name;
            this.data.sku = res.data.sku;
            this.data.category_id = res.data.category_id;
            this.data.collection_id = res.data.collection_id;
            this.data.product_img = res.data.product_img;
            this.data.price = res.data.price;
            this.data.sub_imgs = res.data.sub_imgs;

            this.getByCategories();
            this.getByCollections();

            if (this.data.category_id.description == "Kits")
              this.getProductsOfKit();
          }
        });
    },
    viewProduct(id) {
      this.$refs.prod_desc.scrollIntoView({ behavior: "smooth" });
      this.$router.replace("/products/" + id);
    },
    viewImg(event) {
      window.open(event.target.src, "_blank");
    },
    viewSubImg(event) {
      this.$refs.main_img.src = event.target.src;
      this.$refs.main_img.classList.add = "fadeInSlide";
    },
    getImgUrl(imagePath) {
      return process.env.VUE_APP_BASE_URL + "/products/get_img/" + imagePath;
    },
    getSubImgUrl(imagePath) {
      return (
        process.env.VUE_APP_BASE_URL + "/products_img/get_img/" + imagePath
      );
    },
    changeMonetaryFormat(val) {
      return val + "₽";
    },
    getByCollections() {
      axios
        .get(
          process.env.VUE_APP_BASE_URL +
            "/products/find_by_collection/" +
            this.data.collection_id.id +
            "/" +
            1 +
            "/" +
            10
        )
        .then((res) => {
          if (res.status == 200) {
            this.allproducts_collections = res.data[0];
          }
        });
    },
    getByCategories() {
      axios
        .get(
          process.env.VUE_APP_BASE_URL +
            "/products/find_by_category/" +
            this.data.category_id.id +
            "/" +
            1 +
            "/" +
            10
        )
        .then((res) => {
          if (res.status == 200) {
            this.allproducts_categories = res.data[0];
          }
        });
    },
  },
  mounted() {
    this.refreshData();
  },
  watch: {
    $route: {
      handler() {
        this.refreshData();
      },
    },
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

.swiper-slide .img-carousel {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper-slide .sub-imgs {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
