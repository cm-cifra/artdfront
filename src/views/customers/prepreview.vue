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
    </div>

    <div class="flex-auto">
      <component
        v-for="(show, category) in categoryVisibility"
        :key="category"
        :is="categoryComponentMap[category]"
        v-if="show"
        :item_data="item_data"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";

// Lazy-loaded components
const InfoBathDisabledView = () =>
  import("./preview_categories/InfoBathDisabledView.vue");
const InfoBathroomAccessoryView = () =>
  import("./preview_categories/InfoBathroomAccessoryView.vue");
const InfoCabinetsView = () =>
  import("./preview_categories/InfoCabinetsView.vue");
const InfoCounterTopSinkView = () =>
  import("./preview_categories/InfoCounterTopSinkView.vue");
const InfoKitchenSink = () =>
  import("./preview_categories/InfoKitchenSink.vue");
const InfoKitsView = () => import("./preview_categories/InfoKitsView.vue");
const InfoMirrorCabinetView = () =>
  import("./preview_categories/InfoMirrorCabinetView.vue");
const InfoMirrorView = () => import("./preview_categories/InfoMirrorView.vue");
const InfoMixersView = () => import("./preview_categories/InfoMixersView.vue");
const InfoShowerSystemView = () =>
  import("./preview_categories/InfoShowerSystemView.vue");

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
  },
  data() {
    return {
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
      item_data: { id: "" },
      categoryVisibility: {
        BD: false,
        BA: false,
        C: false,
        CTS: false,
        KS: false,
        K: false,
        MC: false,
        MIR: false,
        MIX: false,
        SS: false,
      },
      categoryComponentMap: {
        BD: "InfoBathDisabledView",
        BA: "InfoBathroomAccessoryView",
        C: "InfoCabinetsView",
        CTS: "InfoCounterTopSinkView",
        KS: "InfoKitchenSink",
        K: "InfoKitsView",
        MC: "InfoMirrorCabinetView",
        MIR: "InfoMirrorView",
        MIX: "InfoMixersView",
        SS: "InfoShowerSystemView",
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
    showCategoryComponent(cat_name, id) {
      this.item_data.id = id;
      Object.keys(this.categoryVisibility).forEach((category) => {
        this.categoryVisibility[category] = category === cat_name;
      });
    },
    getProductInfo() {
      axios
        .get(
          `${process.env.VUE_APP_BASE_URL}/products/find_by_sku/${this.selected_id}`
        )
        .then((res) => {
          if (res.status === 200) {
            this.data = { ...res.data }; // Directly assign the response data
            this.showCategoryComponent(
              this.data.category_id.description,
              this.data.id
            );
          }
        });
    },
    viewProduct(id) {
      this.$router.push(`/products/${id}`);
    },
    viewImg(imagePath) {
      window.open(
        `${process.env.VUE_APP_BASE_URL}/products/get_img/${imagePath}`,
        "_blank"
      );
    },
    viewSubImg(imagePath) {
      window.open(
        `${process.env.VUE_APP_BASE_URL}/products_img/get_img/${imagePath}`,
        "_blank"
      );
    },
    getImgUrl(imagePath) {
      return `${process.env.VUE_APP_BASE_URL}/products/get_img/${imagePath}`;
    },
    getSubImgUrl(imagePath) {
      return `${process.env.VUE_APP_BASE_URL}/products_img/get_img/${imagePath}`;
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
