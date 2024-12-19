<template>
    <div class="flex flex-col">

        <div v-if="data.sub_imgs.length > 0" class="p-20">
            <swiper
                :effect="'coverflow'"
                :grabCursor="true"
                :centeredSlides="true"
                :slidesPerView="'auto'"
                :coverflowEffect="{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
                }"
                :pagination="true"
                :modules="modules"
                class="mySwiper"
            >
                <swiper-slide v-for="i in data.sub_imgs" v-bind:key="i.id" class="hover:transform hover:scale-110 duration-300">
                    <img :src="getSubImgUrl(i.file_name)" class="h-full w-[200px] object-cover hover:transform hover:scale-110 duration-300"/>
                </swiper-slide>
                    
            </swiper>
        </div>
        



        <div class="flex-none flex flex-col py-10" ref="view_description">

            <div class="flex-none w-full grid grid-cols-1 sm:grid-cols-2 bg-black-400">
                <div class="text-white text-center p-auto p-10">
                    <p class="mb-4">Цвет корпуса</p>

                    <span v-for="i in data_sub.color_cabinet" v-bind:key="i.id" class="p-4 w-full">
                        <span class="relative w-6 h-6 bg-purple-200 rounded-full flex justify-center items-center text-center p-4 cursor-pointer border border-gray-400 mx-auto" :style="{ 'background-color': i.value }">
                        </span>
                    </span>
                </div>
                <div class="text-white text-center p-auto p-10">
                    <p class="mb-4">Подходящий цвет</p>
                    <span v-for="i in data_sub.color_fittings" v-bind:key="i.id" class="p-4 w-full">
                        <span class="relative w-6 h-6 bg-purple-200 rounded-full flex justify-center items-center text-center p-4 cursor-pointer border border-gray-400 mx-auto" :style="{ 'background-color': i.value }">
                        </span>
                    </span>
                </div>
            </div>
            

            <div class="flex-none w-full grid grid-cols-1 sm:grid-cols-4 bg-black-400">
                <div class="text-white text-center p-auto p-10">
                    Стиль
                    <p class="text-2xl tracking-widest mt-2 font-bold">{{data_sub.style}}</p>
                </div>
                <div class="text-white text-center p-auto p-10">
                    Покрытие
                    <p class="text-2xl tracking-widest mt-2 font-bold">{{data_sub.covering}}</p>
                </div>
                <div class="text-white text-center p-auto p-10">
                    Система хранения
                    <p class="text-2xl tracking-widest mt-2 font-bold">{{data_sub.storage_system}}</p>
                </div>
              
                <div class="text-white text-center p-auto p-10">
                    Установка
                    <p class="text-2xl tracking-widest mt-2 font-bold">{{data_sub.installation}}</p>
                </div>
                <div class="text-white text-center p-auto p-10">
                    Размеры
                    <p class="text-2xl tracking-widest mt-2 font-bold">{{data_sub.dimensions}}</p>
                </div>
                <div class="text-white text-center p-auto p-10">
                    Установка с закрывающимся механизмом
                    <p class="text-2xl tracking-widest mt-2 font-bold">{{data_sub.fittings_with_closer_mechanism}}</p>
                </div>
                <div class="text-white text-center p-auto p-10">
                    Фасадный материал
                    <p class="text-2xl tracking-widest mt-2 font-bold">{{data_sub.material_cabinet_facade}}</p>
                </div>
                <div class="text-white text-center p-auto p-10">
                    Материал корпуса
                    <p class="text-2xl tracking-widest mt-2 font-bold">{{data_sub.material_cabinet_body}}</p>
                </div>
            </div>

        </div>


        <div class="flex-none flex flex-col py-10 px-20" ref="view_design" v-if="data.sub_imgs.length > 0">

            <p class="text-2xl tracking-wider w-full text-center font-bold my-10">ДИЗАЙН ПРОДУКЦИИ</p>

            <swiper
                :slidesPerView="3"
                :spaceBetween="30"
                :pagination="{
                clickable: true,
                }"
                :modules="modules"
                class="design_swiper"
            >
                <swiper-slide v-for="i in data.sub_imgs" v-bind:key="i.id">
                    <img :src="getSubImgUrl(i.file_name)" class="h-[600px] w-[600px] object-fill hover:transform hover:scale-105 duration-300 rounded-md"/>
                </swiper-slide> 
            </swiper>


        </div>

        <FloatingMenu_Cabinet :scrollView="scrollView"/>

    </div>
</template>


<script>
import axios from 'axios';
import FloatingMenu_Cabinet from '@/components/FloatingMenu/FloatingMenu_Cabinet.vue';

import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { EffectCoverflow, Pagination } from 'swiper/modules';

export default{
    data(){
        return {
            modules: [EffectCoverflow, Pagination],
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
            },

            data_sub : '',
        }
    },
    components: {
      FloatingMenu_Cabinet,
      Swiper,
      SwiperSlide,
    },
    methods: {
        scrollView(val){
            if(val == 'view_intro') window.scroll({top: 0,left: 0,behavior: 'smooth' })
            else if(val == 'view_description') this.$refs.view_description.scrollIntoView({ behavior: 'smooth' })
            else if(val == 'view_material') this.$refs.view_material.scrollIntoView({ behavior: 'smooth' })
            else if(val == 'view_design') this.$refs.view_design.scrollIntoView({ behavior: 'smooth' })
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
        getSubImgUrl(imagePath) {
        return process.env.VUE_APP_BASE_URL + "/products_img/get_img/" + imagePath;
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

                    this.getProductSubInfo();
                }
                
            })
        },
        getProductSubInfo(){
            axios.get(process.env.VUE_APP_BASE_URL + '/info_pedestals/find_by_product/' + this.data.id)
            .then((res)=>{
            
                if(res.status == 200){

                    this.data_sub = res.data;

                    if(res.data.color_cabinet){
                        var colorArr = JSON.parse(res.data.color_cabinet); 
                        this.data_sub.color_cabinet = colorArr;
                    }

                    if(res.data.color_fittings){
                        var colorArr2 = JSON.parse(res.data.color_fittings); 
                        this.data_sub.color_fittings = colorArr2;
                    }
                    
                   

                    

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
