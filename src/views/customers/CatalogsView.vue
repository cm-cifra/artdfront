<template>
    <div class="flex flex-col">
        
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 m-2">
            <div v-for="i in allcategories" v-bind:key="i.id" class="relative">
                <img :src="getImgUrl(i.product_img)" class="brightness-50 hover:brightness-75 duration-300 object-cover h-72 w-full"/>
                <p class="absolute z-20 bottom-0 right-0 text-white m-4 text-lg">{{ i.description }}</p>
            </div>
        </div>



    </div>
</template>

<script>

import axios from 'axios';



export default {
    data(){
        return{
            allcategories : [],

            images : ['cat_bath_d.png','cat_bathroom_a.png','cat_cabinet.png','cat_countersink.png','cat_kitchensink.png','cat_kits.png','cat_mirror.png','cat_mirror_c.png','cat_mixer.png','cat_shower.png'],
            
            selected_category_name : 'Выберите категорию',

            selected_collection_id : 0,

            //toggles
            show_dropdown_category : false,
            
        }
    },
    methods:{
        changeMonetaryFormat(val){
            return val + "₽";
        },
        viewImg(imagePath){
            window.open(process.env.VUE_APP_BASE_URL + "/products/get_img/" + imagePath, '_blank');
        },
        getImgUrl(imagePath) {
        return require('../../assets/' + imagePath);
        },
        showDropdownCategory(){
            if(this.show_dropdown_category) this.show_dropdown_category = false;
            else this.show_dropdown_category = true;
        },
        getCategories(){
            axios.get(process.env.VUE_APP_BASE_URL + '/categories/get_all')
            .then((res)=>{
            
                if(res.status == 200){

            
                for(var i = 0; i < res.data.length; i++){
                    this.allcategories.push({
                        description : res.data[i].description,
                        product_img : this.images[i]
                    })
                }

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
        }
    },
    mounted(){
        this.getCategories();
    }
  };
</script>