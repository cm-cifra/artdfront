<template>
  <CustomerNavbar />

  <div class="flex flex-col">
    <div class="w-full h-[350px] sm:h-[350px] md:h-[350px] lg:h-[350px]">
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
              СОВРЕМЕННЫЙ И ЭСТЕТИЧЕСКИЙ ДИЗАЙН
            </p>
            <p class="text-gray-200 text-xs sm:text-lg">
              Оборудование для ванных комнат, Готовые решения, Шоу-оборудование
              и многое другое
            </p>
            <button
              class="bg-primary-600 rounded-md text-white px-8 py-4 mt-4 hover:bg-primary-700 text-xs sm:text-md"
              @click="goToUrl('/products')"
            >
              ПОИСК
            </button>
          </div>
          <!-- <img src="../../assets/landing_page_pic.png" class="object-cover brightness-50"/> -->
          <video
            class="w-full h-full object-cover brightness-50"
            autoplay
            loop
            muted
          >
            <source src="../../assets/1204.mp4" type="video/mp4" />
          </video>
        </swiper-slide>
        <swiper-slide>
          <div class="w-1/2 mx-20 my-10 sm:m-20 absolute z-20">
            <p class="font-bold md:text-3xl sm:text-4xl text-white">
              СОЗДАЙТЕ СВОЙ СОБСТВЕННЫЙ
            </p>
            <p class="text-gray-200 text-xs sm:text-lg">
              Где комфортная комната должна быть вашим собственным определением
              комфорта
            </p>
            <!-- <button class="bg-primary-600 rounded-md text-white px-8 py-4 mt-4 hover:bg-primary-700">ИССЛЕДОВАТЬ</button> -->
          </div>
          <img
            src="../../assets/cat_cabinet.png"
            class="object-cover brightness-50"
          />
        </swiper-slide>
        <!-- <swiper-slide>
                    <div class="relative">

                        <p class="font-bold md:text-3xl sm:text-4xl text-white">СОВРЕМЕННЫЙ И ЭСТЕТИЧЕСКИЙ ДИЗАЙН</p>
                        <p class="text-gray-200 text-xs sm:text-lg">Оборудование для ванных комнат, Готовые решения, Шоу-оборудование и многое другое...</p>
                        <button class="bg-primary-600 rounded-md text-white px-8 py-4 mt-4 hover:bg-primary-700">ИССЛЕДОВАТЬ</button>
                   
                    <img src="../../assets/landing_page_pic.png" class="object-cover w-full h-[250px] bg-cover bg-center bg-no-repeat mb-8 md:h-[350px] brightness-50"/>
                    </div>
                </swiper-slide> -->
        <!-- <swiper-slide>
                    <div class="relative">

                    <div class="w-1/2 mx-20 my-10 sm:m-20 z-20">
                        <p class="font-bold md:text-3xl sm:text-4xl text-white">СОВРЕМЕННЫЙ И ЭСТЕТИЧЕСКИЙ ДИЗАЙН</p>
                        <p class="text-gray-200 text-xs sm:text-lg">Оборудование для ванных комнат, Готовые решения, Шоу-оборудование и многое другое...</p>
                        <button class="bg-primary-600 rounded-md text-white px-8 py-4 mt-4 hover:bg-primary-700">ИССЛЕДОВАТЬ</button>
                    </div>
                    <img src="../../assets/landing_page_pic.png" class="object-cover w-full h-[250px] bg-cover bg-center bg-no-repeat mb-8 md:h-[350px] brightness-50"/>
                    </div>
                </swiper-slide> -->
      </swiper>
    </div>

    <div class="flex flex-col p-8 bg-black-400">
      <div class="flex-none flex flex-col">
        <div
          class="w-full sm:w-1/2 flex items-center rounded-full border bg-white mx-auto p-2"
        >
          <i class="flex-none pi pi-search mx-4"></i>
          <input
            type="text"
            v-model="search_name"
            class="flex-none border-none rounded-r-full focus:outline-none focus:ring-0 focus:border-gray-200"
            placeholder="Search product here.."
            @keyup.enter="searchProduct"
          />
        </div>

        <div
          class="w-full sm:w-1/2 h-full max-h-40 overflow-y-auto scrollbar mx-auto mt-2 p-2 bg-white duration-300 transition-all"
          v-if="allproducts.length > 0"
        >
          <div
            v-for="i in allproducts"
            v-bind:key="i.id"
            class="cursor-pointer hover:bg-gray-100"
            @click="goToUrl('/products/' + i.sku)"
          >
            {{ i.name }}
          </div>
        </div>
      </div>

      <div class="flex-none flex flex-wrap gap-2 w-full justify-between mt-4">
        <span
          v-for="i in allcategories"
          v-bind:key="i.id"
          class="flex-auto flex items-center p-2 text-sm text-white"
        >
          <input
            type="checkbox"
            v-bind:value="i.id"
            class="mr-2 duration-300 rounded-full accent-primary-300 focus:accent-primary-500"
            @click="addToSearchData(i)"
          />{{ i.description }}
        </span>
      </div>
    </div>

    <div
      class="flex flex-col sm:flex-row md:flex-col lg:flex-row items-center m-8 gap-4 p-10"
    >
      <div class="flex-none sm:flex-1">
        <p class="font-bold md:text-3xl sm:text-4xl">Бесчисленный дизайн</p>
        <p class="text-gray-600 mt-2">
          Вам никогда не придется так беспокоиться, выбирая атмосферу по своему
          вкусу.
        </p>
        <button
          class="bg-primary-600 rounded-md text-white px-8 py-4 mt-4 hover:bg-primary-700"
          @click="goToUrl('/products')"
        >
          ПЕРЕЙТИ К ПРОДУКЦИИ
        </button>
      </div>

      <div
        class="flex-none sm:flex-1 flex flex-row w-[500px] h-[500px] sm:w-[800px] sm:h-[800px] md:w-[800px] md:h-[800px] lg:w-[800px] lg:h-[800px] p-20"
      >
        <swiper
          :effect="'cards'"
          :grabCursor="true"
          :modules="modules"
          :autoplay="{
            delay: 3000,
            disableOnInteraction: false,
          }"
          class="mySwiper text-black-500"
        >
          <swiper-slide>
            <img
              src="../../assets/cat_bathroom_a.png"
              class="object-cover h-52 w-52 rounded-md"
            />
          </swiper-slide>
          <swiper-slide>
            <img
              src="../../assets/cat_mirror_c.png"
              class="object-cover h-52 w-52 rounded-md"
            />
          </swiper-slide>
          <swiper-slide>
            <img
              src="../../assets/cat_bath_d.png"
              class="object-cover h-52 w-52 rounded-md"
            />
          </swiper-slide>
        </swiper>
      </div>

      <!-- <div class="flex-none">
                <div class="shadow-xl p-8 text-center hover:transform hover:scale-110 duration-300">
                    <img src="../../assets/pic_toilet.png" class="object-cover h-52 w-52">
                    <p>туалет</p>
                    <p class="font-bold">12 490 ₽</p>
                </div>
            </div>

            <div class="flex-none">
                <div class="shadow-xl p-8 text-center hover:transform hover:scale-110 duration-300">
                    <img src="../../assets/pic_sink.png" class="object-cover h-52 w-52">
                    <p>бассейн</p>
                    <p class="font-bold">15 490 ₽</p>
                </div>
            </div>

            <div class="flex-none">
                <div class="shadow-xl p-8 text-center hover:transform hover:scale-110 duration-300">
                    <img src="../../assets/pic_bathtub.png" class="object-cover h-52 w-52">
                    <p>ванна</p>
                    <p class="font-bold">23 490 ₽</p>
                </div>
            </div> -->
    </div>

    <div
      class="flex flex-col sm:flex-row md:flex-col lg:flex-row items-center w-full my-4 sm:my-10 px-4 sm:px-20 gap-10"
    >
      <div class="flex-none sm:flex-1 text-center">
        <p class="font-bold text-3xl mb-10">
          Настенное светодиодное зеркало в лучшем виде
        </p>
        <p class="font-bold text-lg text-gray-600">
          Сделайте свой собственный блеск по своему усмотрению. Покупайте
          светодиодные зеркала лучшего качества.
        </p>
      </div>
      <div class="flex-none sm:flex-1 flex flex-col sm:flex-row gap-4">
        <div class="flex-auto sm:flex-none space-y-4">
          <img
            src="../../assets/M-1022 (12).jpg"
            class="flex-auto h-[500px] w-[500px] sm:h-[250px] sm:w-[250px] object-cover m-auto"
          />
          <img
            src="../../assets/M-1022 (8).jpg"
            class="flex-auto h-[500px] w-[500px] sm:h-[250px] sm:w-[250px] object-cover m-auto"
          />
        </div>
        <img
          src="../../assets/M-1022 (13).jpg"
          class="flex-auto sm:flex-auto h-[500px] w-[500px] object-cover m-auto"
        />
      </div>
    </div>

    <div
      class="flex flex-col sm:flex-row md:flex-col lg:flex-row items-center w-full my-4 sm:my-10 px-4 sm:px-20 gap-10"
    >
      <div class="flex-1 flex flex-row">
        <img
          src="../../assets/cat_kitchensink.png"
          class="flex-auto h-[500px] w-[500px] object-contain sm:object-cover m-auto"
        />
      </div>

      <div class="flex-1 text-center">
        <p class="font-bold text-3xl mb-10">Мойки высокого качества</p>
        <p class="font-bold text-lg text-gray-600">
          Ваша деятельность по мытью посуды не организована и не удобна? Что ж,
          поклонись, но крепче, потому что мы подарили тебе самый лучший подарок
          на свете.
        </p>
        <p class="font-bold text-md"></p>
      </div>
    </div>

    <div class="">
      <div class="w-full absolute text-center align-center mt-12 z-20">
        <p class="font-bold md:text-3xl sm:text-4xl text-white">
          У нас самые лучшие коллекции
        </p>
        <p class="text-gray-200">
          У вас не возникнет проблем с выбором нашей продукции, потому что у нас
          есть коллекции, соответствующие вашим стандартам.
        </p>
        <button
          class="bg-primary-600 rounded-md text-white px-8 py-4 mt-10 hover:bg-primary-700"
          @click="goToUrl('/collections')"
        >
          Перейти в Коллекции
        </button>
      </div>
      <img
        src="../../assets/landing_page_pic2.png"
        class="object-cover w-full h-[250px] bg-cover bg-center bg-no-repeat mb-8 md:h-[350px] brightness-50"
      />
    </div>

    <div class="w-full">
      <p
        class="font-bold md:text-3xl sm:text-4xl text-gray-800 w-full text-center"
      >
        ТРЕНДОВЫЕ ПРОДУКТЫ
      </p>
    </div>

    <div class="flex flex-col sm:flex-row items-center m-8 gap-4 p-10">
      <div
        class="m-auto flex flex-col sm:flex-row md:flex-col lg:flex-row items-center gap-6"
      >
        <div class="flex-none">
          <div
            class="shadow-xl p-8 text-center hover:transform hover:scale-110 duration-300"
          >
            <img
              src="../../assets/pic_toilet.png"
              class="object-cover h-52 w-52 border border-gray-200 rounded-md"
            />
            <p>туалет</p>
            <p class="font-bold">12 490 ₽</p>
            <button
              class="bg-primary-600 hover:bg-primary-700 rounded-md text-white px-8 py-4 mt-10"
            >
              КУПИТЬ СЕЙЧАС
            </button>
          </div>
        </div>

        <div class="flex-none">
          <div
            class="shadow-xl p-8 text-center hover:transform hover:scale-110 duration-300"
          >
            <img
              src="../../assets/pic_sink.png"
              class="object-cover h-52 w-52 border border-gray-200 rounded-md"
            />
            <p>бассейн</p>
            <p class="font-bold">15 490 ₽</p>
            <button
              class="bg-primary-600 hover:bg-primary-700 rounded-md text-white px-8 py-4 mt-10"
            >
              КУПИТЬ СЕЙЧАС
            </button>
          </div>
        </div>

        <div class="flex-none">
          <div
            class="shadow-xl p-8 text-center hover:transform hover:scale-110 duration-300"
          >
            <img
              src="../../assets/pic_bathtub.png"
              class="object-cover h-52 w-52 border border-gray-200 rounded-md"
            />
            <p>ванна</p>
            <p class="font-bold">23 490 ₽</p>
            <button
              class="bg-primary-600 hover:bg-primary-700 rounded-md text-white px-8 py-4 mt-10"
            >
              КУПИТЬ СЕЙЧАС
            </button>
          </div>
        </div>

        <div class="flex-none">
          <div
            class="shadow-xl p-8 text-center hover:transform hover:scale-110 duration-300"
          >
            <img
              src="../../assets/pic_sink.png"
              class="object-cover h-52 w-52 border border-gray-200 rounded-md"
            />
            <p>бассейн</p>
            <p class="font-bold">15 490 ₽</p>

            <button
              class="bg-primary-600 hover:bg-primary-700 rounded-md text-white px-8 py-4 mt-10"
            >
              КУПИТЬ СЕЙЧАС
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterView class="flex-auto" />
</template>

<script>
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/vue";
import FooterView from "@/components/Footers/customers/FooterView.vue";
import CustomerNavbar from "@/components/Navbars/customers/CustomerNavbar.vue";
// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/effect-cards";
import "swiper/css";

import {
  EffectFade,
  EffectCards,
  Autoplay,
  Pagination,
  Navigation,
} from "swiper/modules";
import { handler } from "@tailwindcss/line-clamp";

export default {
  components: {
    Swiper,
    SwiperSlide,
    CustomerNavbar,
    FooterView,
  },
  data() {
    return {
      search_name: "",
      search_data: [],
      allcategories: "",
      allproducts: "",
      modules: [EffectFade, EffectCards, Autoplay, Pagination, Navigation],
    };
  },
  methods: {
    goToUrl(val) {
      this.$router.push(val);
    },
    getCategories() {
      axios
        .get(process.env.VUE_APP_BASE_URL + "/categories/get_all")
        .then((res) => {
          if (res.status == 200) {
            this.allcategories = res.data;
          }
        });
    },
    addToSearchData(data) {
      let a = this.search_data.find((item) => item.id === data.id);

      if (!a) {
        this.search_data.push({
          id: data.id,
        });
      } else {
        for (var i = 0; i < this.search_data.length; i++) {
          if (this.search_data[i].id == data.id) {
            this.search_data.splice(i, 1);
            break;
          }
        }
      }
    },
    searchProduct() {
      this.allproduct = "";

      try {
        axios
          .get(
            process.env.VUE_APP_BASE_URL +
              "/products/search_tag/" +
              this.search_name +
              "/" +
              this.search_data
          )
          .then((res) => {
            if (res.status == 200) {
              this.allproducts = res.data[0];
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.search_data.push({
      id: 0,
    });
    this.getCategories();
  },
  watch: {
    search_name: {
      handler(val) {
        if (val == "" || val == null) this.allproducts.splice(0);
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

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
