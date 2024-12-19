<template>


    <div class="flex flex-col sm:flex-row p-4 gap-4">

<div class="flex-1 flex flex-col sm:flex-row h-auto max-h-full gap-4">

    

    <div class="flex-1 flex flex-col bg-white p-8 space-y-4">

        <div>
            <p class="font-bold">Product Description</p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Brand</label>
                <input v-model="data_info.brand" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Configuration</label>
                <input v-model="data_info.configuration" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
        </div>

        <div class="justify-end flex items-center h-20">
            <button class="bg-blue-600 px-8 rounded-md py-2 text-white" @click="editForm()">Edit</button>
        </div>

        <div>
            <p class="font-bold">Add products to this kit</p>
        </div>
        
        <div class="flex flex-col sm:flex-row">

            <div class="flex items-center flex-col sm:flex-row w-full">

                <div class="flex-1 border h-full w-full sm:w-auto flex p-4 gap-4 flex-col sm:flex-row">

                    <img class="h-40 w-40 border rounded-md flex-none object-cover" :src="getImgUrl(selected_info.product_img)"/>
                    <div class="flex-auto flex flex-col">

                        <table class="w-full text-sm table-auto border-collapse border">
                            <tbody class="divide-y divide-solid">
                                <tr>
                                    <td class="p-4 w-28 text-left">SKU:</td>
                                    <td class="p-4 w-full">{{selected_info.sku}}</td>
                                </tr>   
                                <tr>
                                    <td class="p-4 w-28 text-left">Name:</td>
                                    <td class="p-4 w-full">{{selected_info.name}}</td>
                                </tr>
                                <tr>
                                    <td class="p-4 w-28 text-left">Quantity:</td>
                                    <td class="p-4 w-full">
                                        <input v-if="selectedInfoSelected" v-model="selected_info.qty" type="number" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm p-4 w-auto">
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" class="p-4">
                                        <div class="flex items-center gap-2 justify-end">
                                            <button v-if="selectedInfoSelected && selected_info.qty > 0" class="bg-blue-600 px-8 rounded-md py-2 text-white" @click="selectSearch(selected_info)">Add</button>
                                            <button v-if="selectedInfoSelected" class="bg-gray-200 px-8 rounded-md py-2 text-gray-800" @click="clearSelectedInfo()">Clear</button>
                                        </div>
                                    </td> 
                                </tr>                                
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="flex-1 h-full w-full sm:w-auto flex flex-col">

                    <table class="w-full text-sm table-auto border-collapse border">
                        <thead>
                            
                            <tr class="border">
                                <th class="w-auto text-left p-4">Product name 
                                <span v-if="alladdeditems.length > 0">
                                    ({{  alladdeditems.length }})
                                </span>
                            </th>
                                <th class="w-28 text-center p-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody class="divide-y divide-solid h-full">
                            <tr v-for="i in alladdeditems" v-bind:key="i.id">
                                    <td class="p-4 w-auto text-left flex items-center">
                                        <img :src="getImgUrl(i.product_img)" class="w-20 h-20 mr-4 border-1 border rounded-md object-cover"/>
                                        {{ i.name }}
                                    </td>
                                    <td class="p-4 w-28 text-left">
                                        <span class="flex items-center gap-2 text-center">
                                            <img src="../../assets/icon_delete.png" class="h-5 w-auto mx-auto hover:cursor-pointer" @click="deleteItem(i.id)"/>
                                        </span>
                                    </td>
                                </tr>

                                <tr>
                                    <td class="p-4 w-auto text-left" colspan="2">
                                        <input v-model="search_item" type="text" class="border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-200 w-full text-sm rounded-md" placeholder="Search SKU or name here" @keyup="findProduct(search_item)" @keyup.enter="selectSearch(search_item)">
                                        <div class="relative bg-gray-200 px-4 py-2 flex flex-col scrollbar overflow-y-auto h-auto max-h-40" v-if="allsearchdata.length > 0">
                                            <span v-for="i in allsearchdata" v-bind:key="i.id" class="flex-none cursor-pointer hover:font-bold w-full" @click="addToForm(i)">
                                                {{ i.sku + " - " + i.name }}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                        </tbody>
                    </table>

                </div>
            
            </div>
           
        </div>

        <div class="justify-end flex items-center h-20" v-if="alladdeditems.length > 0">
            <button class="bg-blue-600 px-8 rounded-md py-2 text-white" @click="editKitProducts()">Save</button>
        </div>

        
        

        
    </div>

</div>




</div>
</template>

<script>

import axios from 'axios';

export default{
    data(){
    return{

        selectedInfoSelected : false,

        alladdeditems : [],
        allsearchdata : [],
        search_item : '',
    
        action : '',
        btn_name : '',

        selected_info : {
            id : null,
            product_id : null,
            sku : null,
            name : null,
            product_img : null
        },

        data_info : {
            id : 0,
            product_id : 0,
            brand : null,
            configuration : null,
            datetime_modified : null,
        },
    
        prompt_data : {
            data : '',
            action : '',
        },
        show_PromptModal : false,
    }
    },
    props: {
        product_id : Number,
        showNotification : Function,
        refreshData : Function,
        closeModal : Function,
    },
    mounted(){
        this.findData();
    },
    methods: {
        getImgUrl(imagePath) {
            if(imagePath) return process.env.VUE_APP_BASE_URL + "/products/get_img/" + imagePath;
            else return process.env.VUE_APP_BASE_URL + "/products/get_img/default_pic.png";
        },
        deleteItem(id){
            for(var i = 0; i < this.alladdeditems.length; i++){
                if(this.alladdeditems[i].id == id){
                    this.alladdeditems.splice(i,1);
                    break;
                }
            }
        },
        addToForm(data){

            this.selectedInfoSelected = true;

            this.selected_info = {
                id : this.alladdeditems.length + 1,
                product_id : data.id,
                sku : data.sku,
                name : data.name,
                product_img : data.product_img
            }

            this.allsearchdata.splice(0);
            this.search_item = '';
        },
        clearSelectedInfo(){
            this.selectedInfoSelected = false;
            this.selected_info = '';
        },
        selectSearch(data){

            let a = this.alladdeditems.find(item => item.sku === data.sku);

            if(!a){ 

                this.selectedInfoSelected = false;

                this.alladdeditems.push({
                id : this.alladdeditems.length + 1,
                product_id : data.product_id,
                sku : data.sku,
                name : data.sku + ' - ' + data.name,
                product_img : data.product_img
                });

                this.selected_info = '';

                // this.allsearchdata.splice(0);
                // this.search_item = '';
            } 
            
        },
        findProduct(val){
            if(this.allsearchdata.length > 0) this.allsearchdata.splice(0);
            

            if(val){

                    axios.get(process.env.VUE_APP_BASE_URL + '/products/search_to_add_kit/' + val)
                    .then((res)=>{
                    
                        if(res.status == 200){
                        
                            
                            this.allsearchdata = res.data;


                        }
                        
                    })

            }
            
        },
        findData(){
            this.data_info.product_id = this.product_id;

            axios.get(process.env.VUE_APP_BASE_URL + '/info_kits/find_by_product/' + this.data_info.product_id)
            .then((res)=>{
            
                if(res.status == 200){
                    

                    this.data_info.id = res.data.id;
                    this.data_info.product_id = res.data.product_id;
                    this.data_info.brand = res.data.brand;
                    this.data_info.configuration = res.data.configuration;
                    this.data_info.datetime_modified = res.data.datetime_modified;

                    this.findProductsOfKit(this.data_info.product_id);
                }
                
            })
        },
        findProductsOfKit(val){
            
            axios.get(process.env.VUE_APP_BASE_URL + '/product_kits/find_by_kit/' + val)
            .then((res)=>{
            
                if(res.status == 200){
                    
                    for(var i = 0; i < res.data.length;i++){
                        this.alladdeditems.push({
                        id : i + 1,
                        product_id : res.data[i].product_id.id,
                        sku : res.data[i].product_id.sku,
                        name : res.data[i].product_id.sku + ' - ' + res.data[i].product_id.name,
                        product_img : res.data[i].product_id.product_img
                        });
                    }

                    // this.data_info.id = res.data.id;
                    // this.data_info.product_id = res.data.product_id;
                    // this.data_info.brand = res.data.brand;
                    // this.data_info.configuration = res.data.configuration;
                    // this.data_info.datetime_modified = res.data.datetime_modified;
    
                }
                
            })
        },
        editKitProducts(){

            var data = [];

            for(var i = 0; i < this.alladdeditems.length; i++){
                data.push({
                    kit_id : this.data_info.product_id,
                    product_id : this.alladdeditems[i].product_id,
                });
            }

            axios.post(process.env.VUE_APP_BASE_URL + '/product_kits/add', data)
            .then((res)=>{

                if(res.status == 201){

                    this.showNotification(1,'Success','Product description updated');
                    this.refreshData();
                    this.closeModal();

                }
                
            })

        },
        editForm(){

            const today = new Date();
            const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const timestamp = date + ' ' + time;

            this.data_info.datetime_modified = timestamp;

            axios.post(process.env.VUE_APP_BASE_URL + '/info_kits/edit', this.data_info)
            .then((res)=>{
            
                if(res.status == 201){

                    
                    this.showNotification(1,'Success','Product description updated');
                    this.refreshData();
                    this.closeModal();
            
                }
                
            })

          

        }
    }
}
</script>

<style>
</style>