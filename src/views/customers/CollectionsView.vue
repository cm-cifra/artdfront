<template>
    <div class="flex flex-col">
        
        <div class="">

            <div class="w-1/2 mx-20 my-10 sm:m-20 absolute z-20">
                <p class="font-bold md:text-3xl sm:text-4xl text-white">Коллекции</p>
                <p class="text-gray-200 text-xs sm:text-lg">Роскошь в каждой детали, искусство в каждом решении.</p>
                <button class="bg-primary-600 rounded-md text-white px-8 py-4 mt-4 hover:bg-primary-700 duration-300" @click="showDropdownCategory">{{ selected_category_name }}</button>

                <div class="w-auto md:w-1/4 sm:w-1/4 bg-white rounded-md mb-1 duration-300 transition-all" v-if="show_dropdown_category">
                    <p v-for="i in allcategories" v-bind:key="i.id" class="p-2 hover:bg-gray-100 hover:rounded-md cursor-pointer duration-300 mt-1" @click="selectCategory(i)">{{ i.description }}</p>
                </div>
            </div>
            <img src="../../assets/100734.jpg" class="object-cover w-full h-[250px] bg-cover bg-center bg-no-repeat md:h-[350px] brightness-50"/>
        </div>
        
       <div class="w-full h-20" v-if="allcollections.length > 0">
        <swiper
            :pagination="{
            type: 'progressbar',
            }"
            :slidesPerView="3"
            :navigation="true"
            :modules="modules"
            class="mySwiper"
        >
            <swiper-slide v-for="i in allcollections" v-bind:key="i.id" class="border cursor-pointer text-sm hover:font-bold duration-300" :class="i.id == selected_collection_id ? 'bg-primary-600 text-white' : 'bg-white text-gray-800'" @click="selectCollection(i)">{{ i.description }}</swiper-slide>
        </swiper>

       </div>

       <div class="border rounded-md grid grid-cols-1 sm:grid-cols-4 m-10" v-if="allproducts.length > 0">
            <div v-for="i in allproducts" v-bind:key="i.id" class="m-10 flex flex-col">
                
                <img :src="getImgUrl(i.product_img)" class="w-full h-72 border-1 border rounded-2xl  object-cover mb-4 flex-none hover:opacity-70 duration-300 hover:cursor-pointer" @click="viewImg(i.product_img)"/>
                <div class="flex-1 py-2">
                    <p class="text-primary-600">{{ i.collection_id.description }}</p>
                    <p>{{ i.sku }}</p>
                    <p class="font-light">{{ i.name }}</p>
                    <p class="font-light">{{ changeMonetaryFormat(i.price) }}</p>
                </div>
                <div class="flex items-center flex-none">
                    <div class="flex-auto">
                        <button class="bg-primary-600 rounded-md text-white px-8 py-2 hover:bg-primary-700 duration-300" @click="goToUrl('/products/' + i.sku)">КУПИТЬ</button>
                    </div>
                    <div class="flex items-center flex-none gap-4">
                        <img src="../../assets/icon_cart_black.png" class="h-6 w-6 flex-none cursor-pointer duration-300 hover:transform hover:scale-150"/>
                        <img src="../../assets/icon_heart_black.png" class="h-6 w-6 flex-none cursor-pointer duration-300 hover:transform hover:scale-150"/>
                    </div>
                </div>
            </div>
        <div >

        </div>

       </div>




    </div>
</template>

<script>

import axios from 'axios';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Pagination, Navigation } from 'swiper/modules';

export default {
    data(){
        return{
            modules: [Pagination, Navigation],
            allcategories : '',
            allcollections : '',
            allproducts : '',
            
            selected_category_name : 'Выберите категорию',

            selected_collection_id : 0,

            //toggles
            show_dropdown_category : false,
            
        }
    },
    components: {
      Swiper,
      SwiperSlide,
    },
    methods:{
        changeMonetaryFormat(val){
            return val + "₽";
        },
        viewImg(imagePath){
            window.open(process.env.VUE_APP_BASE_URL + "/products/get_img/" + imagePath, '_blank');
        },
        getImgUrl(imagePath) {
        return process.env.VUE_APP_BASE_URL + "/products/get_img/" + imagePath;
        },
        showDropdownCategory(){
            if(this.show_dropdown_category) this.show_dropdown_category = false;
            else this.show_dropdown_category = true;
        },
        getCategories(){
            axios.get(process.env.VUE_APP_BASE_URL + '/categories/get_all')
            .then((res)=>{
            
                if(res.status == 200){
            
                this.allcategories = res.data;

                }
                
            })
        },
        selectCategory(data){
            this.selected_category_name = data.description;
            this.show_dropdown_category = false;
            this.getCollections(data.id);
        },
        selectCollection(data){
            this.selected_collection_id = data.id;
            this.getProducts();
        },
        getCollections(id){
            axios.get(process.env.VUE_APP_BASE_URL + '/collections/find_by_category/' + id)
            .then((res)=>{
            
                if(res.status == 200){
            
                this.allcollections = res.data;
                this.selected_collection_id = res.data[0].id;
                this.getProducts();
                }
                
            })
        },
        getProducts(){
            axios.get(process.env.VUE_APP_BASE_URL + '/products/find_by_collection/' + this.selected_collection_id + '/' + 1 + '/' + 25)
            .then((res)=>{
            
                if(res.status == 200){
                this.allproducts = res.data[0];

                }
                
            })
        },
        goToUrl(val){
        this.$router.replace(val); 
        },
    },
    mounted(){
        this.getCategories();
    }
  };
</script>

<style>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;

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

.swiper {
  margin-left: auto;
  margin-right: auto;
}

.swiper-pagination-progressbar-fill{
    background: #C98C47 !important;
}

.swiper-button-prev {
    color: #d79c59 !important;
}

.swiper-button-next {
    color: #C98C47 !important;
}
</style>