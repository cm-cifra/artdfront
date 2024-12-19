<template>
    <div class="flex flex-col sm:flex-row p-4 gap-4">

<div class="flex-1 flex flex-col md:flex-col sm:flex-row h-auto max-h-full gap-4">

    <div class="flex-1 flex flex-col bg-white">
        <div class="border rounded-lg m-8 h-full flex flex-col justify-center text-center">
            <div class="p-4">

            <img src="../../assets/icon_upload.png" class="flex-none m-auto object-cover rounded-xl" :class="data.file_product_img ? 'h-96 w-96' : 'h-36 w-36'" ref="view_img"/>
            <p class="flex-none font-thin my-4">Drop your image here or</p>
            <input type="file" id="upload_file" ref="upload_file" @change="onFileChange($event)" class="w-auto text-gray-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-600 file:hover:bg-gray-700 file:text-white rounded" />
            <!-- <p class="flex-none text-gray-700 font-bold">Click to browse</p> -->
            
            </div>

        </div>
    </div>

    <div class="flex-1 flex flex-col bg-white p-8 space-y-4 ">
        <p class="font-bold">Create Product</p>

        <div class="flex flex-row gap-4">
            <div class="flex-1 flex-col">
                <label class="text-sm">Category</label>
                <select v-model="data.category_id" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm p-4 w-full" @change="getCollections(data.category_id)">
                    <option v-for="i in allcategories" v-bind:key="i.id" :value="i.id">
                    {{i.description}}      
                    </option>
                </select>
            </div>
            <div class="flex-1 flex-col" >
                <label class="text-sm">Collection</label>
                <select v-model="data.collection_id" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm p-4 w-full">
                    <option v-for="i in allcollections" v-bind:key="i.id" :value="i.id">
                    {{i.description}}      
                    </option>
                </select>
            </div>
            <div class="flex-1 flex-col" >
                <label class="text-sm">SKU #</label>
                <input v-model="data.sku" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex-col" >
                <label class="text-sm">Factory #</label>
                <input v-model="data.factory_part_num" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
        </div>

        <!-- <div>
            <label class="text-sm">Product Name</label>
            <input v-model="data.name" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm p-4 w-full">
        </div> -->

        <div class="flex flex-col md:flex-row sm:flex-row gap-4">
            <div class="flex-auto">
                <label class="text-sm">Product Name</label>
                <input v-model="data.name" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <!-- <div class="flex-1 sm:flex-none">
                <label class="text-sm">SKU #</label>
                <input v-model="data.sku" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div v-if="category_name != 'Kits'" class="flex-1 sm:flex-none">
                <label class="text-sm">Factory #</label>
                <input v-model="data.factory_part_num" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div> -->
        </div>


       
        

        <div class="justify-end flex items-center h-20">
            <button class="bg-blue-600 px-8 rounded-md py-2 text-white" @click="submitForm()">Create</button>
        </div>
    </div>

</div>


</div>
  </template>

<script>

// import moment from 'moment';
import axios from 'axios';

export default{
  data(){
    return{
        allcategories : '',
        allcollections : '',
        category_name : '',

        data : {
            name : '',
            sku : '',
            factory_part_num : '',
            category_id : 0,
            collection_id : 0,
            product_img : null,
            file_product_img : null,
            datetime_added : '',
            price : 0,
        }
        }
  },
  props: {
    showNotification : Function,
  },
  methods: {
    refreshData(){
        this.getCategories();
    },
    resetInput(){
        this.data.name = '';
        this.data.sku = '';
        this.data.factory_part_num = '';
        this.data.category_id = 0;
        this.data.collection_id = 0;
        this.data.product_img = null;
        this.data.datetime_added = '';
        this.data.price = 0;
        this.$refs.upload_file.value = null;
        this.$refs.view_img.src = null;
    },
    onFileChange(e){
                var fileData =  e.target.files[0];
                if(fileData != '' || fileData != null){
                    var fileName = "";
                    var fileExt = "";
                    var fileArray = fileData.name.split(".");
                    
                    for(var i = 0; i < fileArray.length; i++){
    
                            if(i == fileArray.length - 2){
                            fileName += fileArray[i];
                            }
                            else{
                                fileName += fileArray[i] + "."; 
                            }
                            if(i == fileArray.length - 2) break;
    
                    }
    
                    fileExt = fileArray[fileArray.length - 1].toLowerCase().trim();
                    if(fileExt != "png" && fileExt != "jpg" && fileExt != "jpeg"){
                        this.showNotification(0,'Invalid file extension','Please upload only jpeg, png, and jpg files.');
                        this.$refs.upload_file.value = null;
                    }
                    else{
                        if(fileExt == 'jpg' || fileExt == 'jpeg') fileExt = 'jpeg';
                        fileName = this.data.sku + "_" + this.data.factory_part_num;
                        this.data.product_img = fileName + "."+ fileExt;

                       

                        const formdata = new FormData();
                        var file_input = document.getElementById('upload_file').files[0];

                        this.$refs.view_img.src = URL.createObjectURL(file_input);
                        
                        formdata.append("file", file_input, this.data.product_img);
                        this.data.file_product_img = formdata;

    
                    }
                }
        },
    submitForm(){

       

        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const timestamp = date + ' ' + time;

        this.data.datetime_added = timestamp;

        var valid = true;

        if(this.data.name == ''){
            valid = false;
        }
        else if(this.data.sku == ''){
            valid = false;
        }
        else if(this.data.factory_part_num == ''){
            valid = false;
        }

        if(valid){


            axios.post(process.env.VUE_APP_BASE_URL + '/products/add', this.data)
            .then((res)=>{
            
                if(res.status == 201){

                    if(this.data.file_product_img){
                        
                        axios.post(process.env.VUE_APP_BASE_URL + '/products/upload_img', this.data.file_product_img)
                        .then((res)=>{
                            //
                        });
                    }

                    this.resetInput();
                    this.showNotification(1,'Success','Product added to list');
                    // this.$router.push('/edit_product/' + this.data.sku + '/' + this.data.factory_part_num);
            
                }
                
            })

        }

        
    },
    getCollections(val){
        axios.get(process.env.VUE_APP_BASE_URL + '/collections/find_by_category/' + val)
        .then((res)=>{
        
            if(res.status == 200){
        
            this.allcollections = res.data;
            this.data.collection_id = res.data[0].id;
            }
            
        })
    },
    getCategories(){
        axios.get(process.env.VUE_APP_BASE_URL + '/categories/get_all')
        .then((res)=>{
        
            if(res.status == 200){
        
            this.allcategories = res.data;
            this.data.category_id = res.data[0].id;
            this.category_name = res.data[0].description;
            this.getCollections(this.data.category_id);
            }
            
        })
    }
    //
  },
  mounted: function(){
    this.refreshData();
  }
}


</script>