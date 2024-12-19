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

           

            <div class="flex-none w-full grid grid-cols-1 sm:grid-cols-3 bg-black-400">
                <div class="text-white text-center p-auto p-10">
                    Стиль
                    <p class="text-2xl tracking-widest mt-2 font-bold">{{data_sub.style}}</p>
                </div>
                <div class="text-white text-center p-auto p-10">
                    Форма
                    <p class="text-2xl tracking-widest mt-2 font-bold">{{data_sub.form}}</p>
                </div>
                <div class="text-white text-center p-auto p-10">
                    Рамка
                    <p class="text-2xl tracking-widest mt-2 font-bold">{{data_sub.frame}}</p>
                </div>
              
                <div class="text-white text-center p-auto p-10">
                    Материал
                    <p class="text-2xl tracking-widest mt-2 font-bold">{{data_sub.material}}</p>
                </div>
                <div class="text-white text-center p-auto p-10">
                    Размеры
                    <p class="text-2xl tracking-widest mt-2 font-bold">{{data_sub.dimensions}}</p>
                </div>
                <div class="text-white text-center p-auto p-10">
                    Особенности
                    <p class="text-xl tracking-widest mt-2 font-bold whitespace-pre-line">{{data_sub.peculiarities}}</p>
                </div>
            </div>

            <div class="flex-none w-full grid grid-cols-1 sm:grid-cols-2 bg-black-400">
                <div class="text-white text-center p-auto p-10">
                    Размещение подсветки
                    <p class="text-2xl tracking-widest mt-2 font-bold">{{data_sub.backlight_placement}}</p>
                </div>
                <div class="text-white text-center p-auto p-10">
                    Цвет подсветки
                    <p class="text-2xl tracking-widest mt-2 font-bold">{{data_sub.backlight_color}}</p>
                </div>
               
            </div>

            <div class="flex-none grid grid-cols-1 sm:grid-cols-1">
                <div class="bg-black-500 content-center text-center p-20">
                    <div class="m-auto">
                        <p class="text-white">Противотуманное покрытие</p>
                        <p class="text-5xl tracking-widest text-white mt-4">{{data_sub.anti_fog_coating}}</p>
                    </div>
                </div>
                
            </div>


            <div class="flex-none grid grid-cols-1 sm:grid-cols-2">
                <div class="bg-black-500 content-center text-center p-20">
                    <div class="m-auto">
                        <p class="text-white">Тип переключателя</p>
                        <p class="text-5xl tracking-widest text-white mt-4 cursor-default" @mouseover="setBrightnessImage(true)" @mouseleave="setBrightnessImage(false)">{{data_sub.switch_type}}</p>
                    </div>
                </div>
                <div>
                    <img :src="getImgUrl(data.product_img)" class="object-cover m-auto brightness-0 duration-500" ref="img_switch"/>
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

        <FloatingMenu_MirrorCabinet :scrollView="scrollView"/>

    </div>
</template>


<script>
import axios from 'axios';
import FloatingMenu_MirrorCabinet from '@/components/FloatingMenu/FloatingMenu_MirrorCabinet.vue';

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
      FloatingMenu_MirrorCabinet,
      Swiper,
      SwiperSlide,
    },
    methods: {
        setBrightnessImage(val){
            if(val){
                this.$refs.img_switch.classList.add('brightness-100');
                this.$refs.img_switch.classList.remove('brightness-0');
            }
            else{
                this.$refs.img_switch.classList.add('brightness-0');
                this.$refs.img_switch.classList.remove('brightness-100');
            }

        },
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
            axios.get(process.env.VUE_APP_BASE_URL + '/info_mirror_cabinets/find_by_product/' + this.data.id)
            .then((res)=>{
            
                if(res.status == 200){

                    this.data_sub = res.data;
                    

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
