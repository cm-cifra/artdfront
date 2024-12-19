<template>
  <div class="flex flex-col">
    <div class="flex-none flex items-center bg-black-400 text-white p-4 w-full">
      <p>{{ data.name }}</p>
    </div>

    <div class="flex-auto py-10 text-center" ref="view_intro">
      <img
        :src="getImgUrl(data.product_img)"
        class="object-cover m-auto h-[500px] w-[500px] rounded-2xl hover:transform hover:scale-110 duration-300"
      />

      <p class="text-5xl font-bold tracking-wider my-8">
        {{ data.collection_id.description }}
      </p>
      <p class="text-3xl font-bold tracking-wider">{{ data.name }}</p>

      <p class="text-5xl font-bold my-10 text-primary-700">
        {{ changeMonetaryFormat(data.price) }}
      </p>

      <!-- <button class="flex-none bg-black-500 rounded-md text-white px-8 py-2 hover:bg-black-400 duration-300 my-4">ЗАКАЗАТЬ СЕЙЧАС!</button> -->
    </div>

    <div class="flex-auto">
      <InfoBathDisabledView v-if="showCategory_BD" :item_data="item_data" />
      <InfoBathroomAccessoryView
        v-if="showCategory_BA"
        :item_data="item_data"
      />
      <InfoCabinetsView v-if="showCategory_C" :item_data="item_data" />
      <InfoCounterTopSinkView v-if="showCategory_CTS" :item_data="item_data" />
      <InfoKitchenSink v-if="showCategory_KS" :item_data="item_data" />
      <InfoKitsView v-if="showCategory_K" :item_data="item_data" />
      <InfoMirrorCabinetView v-if="showCategory_MC" :item_data="item_data" />
      <InfoMirrorView v-if="showCategory_MIR" :item_data="item_data" />
      <InfoMixersView v-if="showCategory_MIX" :item_data="item_data" />
      <InfoShowerSystemView v-if="showCategory_SS" :item_data="item_data" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

import InfoBathDisabledView from "./preview_categories/InfoBathDisabledView.vue";
import InfoBathroomAccessoryView from "./preview_categories/InfoBathroomAccessoryView.vue";
import InfoCabinetsView from "./preview_categories/InfoCabinetsView.vue";
import InfoCounterTopSinkView from "./preview_categories/InfoCounterTopSinkView.vue";
import InfoKitchenSink from "./preview_categories/InfoKitchenSink.vue";
import InfoKitsView from "./preview_categories/InfoKitsView.vue";
import InfoMirrorCabinetView from "./preview_categories/InfoMirrorCabinetView.vue";
import InfoMirrorView from "./preview_categories/InfoMirrorView.vue";
import InfoMixersView from "./preview_categories/InfoMixersView.vue";
import InfoShowerSystemView from "./preview_categories/InfoShowerSystemView.vue";
// import { Swiper, SwiperSlide } from 'swiper/vue';

//   // Import Swiper styles
// import 'swiper/css/pagination';
// import 'swiper/css/effect-fade';
// import 'swiper/css/free-mode';
// import 'swiper/css';

//   import { FreeMode, EffectFade, Autoplay, Pagination, Navigation } from 'swiper/modules';

export default {
  components: {
    InfoBathDisabledView,
    InfoBathroomAccessoryView,
    InfoCabinetsView,
    InfoCounterTopSinkView,
    InfoKitchenSink,
    InfoKitsView,
    InfoMirrorCabinetView,
    InfoMirrorView,
    InfoMixersView,
    InfoShowerSystemView,
    //   Swiper,
    //   SwiperSlide,
  },
  data() {
    return {
      menu_list: [],

      page: 1,
      total_cnt: 0,
      total_pages: 0,
      page_list: [],
      page_limit: 25,

      // modules: [FreeMode, EffectFade, Autoplay, Pagination, Navigation],
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

      //toggles
      showCategory_BD: false,
      showCategory_BA: false,
      showCategory_C: false,
      showCategory_CTS: false,
      showCategory_KS: false,
      showCategory_K: false,
      showCategory_MC: false,
      showCategory_MIR: false,
      showCategory_MIX: false,
      showCategory_SS: false,

      item_data: {
        id: "",
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
      this.selected_id = this.$route.params.sku;

      this.getProductInfo();
    },
    showComponent(cat_name, id) {
      this.item_data.id = id;

      if (cat_name == "Kits") this.showCategory_K = true;
      else if (cat_name == "Countertop Sinks") this.showCategory_CTS = true;
      else if (cat_name == "Cabinet") this.showCategory_C = true;
      else if (cat_name == "Mirror") this.showCategory_MIR = true;
      else if (cat_name == "Mirror Cabinet") this.showCategory_MC = true;
      else if (cat_name == "Mixer") this.showCategory_MIX = true;
      else if (cat_name == "Shower System") this.showCategory_SS = true;
      else if (cat_name == "Bathroom Accessory") this.showCategory_BA = true;
      else if (cat_name == "Kitchen Sink") this.showCategory_KS = true;
      else if (cat_name == "Bath for the disabled") this.showCategory_BD = true;
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

            this.showComponent(this.data.category_id.description, this.data.id);
          }
        });
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
    viewSubImg(imagePath) {
      window.open(
        process.env.VUE_APP_BASE_URL + "/products_img/get_img/" + imagePath,
        "_blank"
      );
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
  },
  mounted() {
    this.refreshData();
  },
};
</script>
