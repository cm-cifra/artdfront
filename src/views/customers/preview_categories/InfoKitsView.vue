<template>
    <div class="flex flex-col">

        <!-- <div class="flex flex-col fixed bottom-20 right-0 space-y-4 bg-primary-600 px-4 py-4 cursor-pointer rounded-l-lg">
            <p class="cursor-pointer hover:text-white duration-300 hover:transform hover:scale-110" @click="scrollView('view_kit_composition')">Kit Composition</p>
            <p class="cursor-pointer hover:text-white duration-300 hover:transform hover:scale-110" @click="scrollView('view_description')">Description</p>
            <p class="cursor-pointer hover:text-white duration-300 hover:transform hover:scale-110">Characteristics</p>
            <p class="cursor-pointer hover:text-white duration-300 hover:transform hover:scale-110">Instruction</p>
        </div> -->

        <!-- <div class="flex-none py-10" ref="view_kit_composition">
            <p class="text-2xl font-bold w-full sm:text-left text-center px-20">KIT COMPOSITIONS ({{ alladdedproducts.length }})</p>
        </div> -->

        <div class="flex-none flex flex-col py-10 px-20" ref="view_kit_composition" v-if="alladdedproducts.length > 0">

        <p class="text-2xl tracking-wider w-full text-center font-bold my-10">Композиции комплектов ({{ alladdedproducts.length }})</p>

        <swiper
            :slidesPerView="3"
            :spaceBetween="30"
            :pagination="{
            clickable: true,
            }"
            :modules="modules"
            class="design_swiper"
        >
            <swiper-slide v-for="i in alladdedproducts" v-bind:key="i.id">
                <img :src="getImgUrl(i.product_id.product_img)" class="h-[600px] w-full object-fill hover:transform hover:scale-105 duration-300 rounded-md"/>
            </swiper-slide> 
        </swiper>


        </div>
        
        <!-- <div class="flex-auto grid grid-cols-1 sm:grid-cols-2">

            <div>
                <transition name="slide-fade" mode="out-in">
                    <img ref="main_img" class="object-cover h-[600px] w-full">
                </transition>
                
            </div>

            <div class="content-center text-center">
                <div>
                    <swiper
                    @slideChange="changeItem($event)"
                    :effect="'cube'"
                    :grabCursor="true"
                    :cubeEffect="{
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94,
                    }"
                    :autoplay="{
                    delay: 5000,
                    disableOnInteraction: false,
                    }"
                    :pagination="true"
                    :modules="modules"
                    class="mySwiper"
                    ref='cubeSwiper'
                >
                    <swiper-slide v-for="i in alladdedproducts" v-bind:key="i.id">
                        <img :src="getImgUrl(i.product_id.product_img)" class="object-cover h-full"/>
                    </swiper-slide>
                </swiper>

                    <p class="mt-10 font-bold text-2xl tracking-wider fadeInSlide">{{ selected_kit_product_name }}</p>
                </div>
            </div>

        </div> -->

        <!-- <div class="flex-none py-10" ref="view_description">
            <p class="text-2xl font-bold w-full sm:text-left text-center">DESCRIPTIONS</p>
        </div> -->

        <FloatingMenu_Kits :scrollView="scrollView"/>

    </div>
</template>


<script>
import axios from 'axios';
import FloatingMenu_Kits from '@/components/FloatingMenu/FloatingMenu_Kits.vue';

 import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

// import required modules
import { EffectCube, Pagination, Autoplay } from 'swiper/modules';

export default{
    data(){
        return {
            modules: [EffectCube, Pagination, Autoplay],

            alladdedproducts : '',
            selected_kit_product_name : '',
            selected_kit_id : 0,

            selected_id : 0,

            data : {
                id : 0,
                name : '',
                sku : '',
                category_id : '',
                collection_id : '',
                product_img : '',
                sub_imgs : '',
                price : 0,
            }
        }
    },
    components: {
      Swiper,
      SwiperSlide,
      FloatingMenu_Kits
    },
    methods: {
        scrollView(val){
            if(val == 'view_intro') window.scroll({top: 0,left: 0,behavior: 'smooth' })
            else if(val == 'view_kit_composition') this.$refs.view_kit_composition.scrollIntoView({ behavior: 'smooth' })
            else if(val == 'view_description') this.$refs.view_description.scrollIntoView({ behavior: 'smooth' })
            
            
        },
        changeItem(event){
            var index = event.activeIndex;

            this.selected_kit_product_name = this.alladdedproducts[index].product_id.name;
            this.$refs.main_img.src = this.getImgUrl(this.alladdedproducts[index].product_id.product_img);

        },
        getImgUrl(imagePath) {
        return process.env.VUE_APP_BASE_URL + "/products/get_img/" + imagePath;
        },
        getParam(){
            this.selected_id = this.$route.params.sku;

            this.getProductInfo();
        },
        getProductsOfKit(){
            axios.get(process.env.VUE_APP_BASE_URL + '/product_kits/find_by_kit/' + this.data.id)
            .then((res)=>{
            
                if(res.status == 200){
                    
                    this.alladdedproducts = res.data;

                    // this.selected_kit_product_name = this.alladdedproducts[0].product_id.name;
                    // this.$refs.main_img.src = this.getImgUrl(this.alladdedproducts[0].product_id.product_img);

                    // this.data_info.id = res.data.id;
                    // this.data_info.product_id = res.data.product_id;
                    // this.data_info.brand = res.data.brand;
                    // this.data_info.configuration = res.data.configuration;
                    // this.data_info.datetime_modified = res.data.datetime_modified;
    
                }
                
            })
        },
        getProductInfo(){
            axios.get(process.env.VUE_APP_BASE_URL + '/products/find_by_sku/' + this.selected_id)
            .then((res)=>{
            
                if(res.status == 200){
                    
                    this.data.id = res.data.id;
                    this.data.name = res.data.name;
                    this.data.sku = res.data.sku;
                    this.data.category_id = res.data.category_id;
                    this.data.collection_id = res.data.collection_id;
                    this.data.product_img = res.data.product_img;
                    this.data.price = res.data.price;
                    this.data.sub_imgs = res.data.sub_imgs;


                    if(this.data.category_id.description == 'Kits') this.getProductsOfKit();

                }
                
            })
        },
    },
    mounted(){
        this.getParam();
    }
}
</script>

<style scoped>

/* .swiper {
  width: 300px;
  height: 300px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
}

.swiper-slide img {
  display: block;
  width: 100%;
}


.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.design_swiper .swiper-slide {
  background-position: center;
  background-size: cover;
  height: 100%;
} */

.swiper {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}

.design_swiper .swiper-slide {
  background-position: center;
  background-size: cover;
  height: 100%;
}


.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 300px;
  height: 300px;
}

.swiper-slide img {
  display: block;
  width: 100%;
}

</style>