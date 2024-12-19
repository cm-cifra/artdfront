<template>
    <div class="flex flex-col sm:flex-row p-4 gap-4">

<div class="flex-1 flex flex-col sm:flex-row h-auto max-h-full gap-4">

    <div class="flex-1 flex flex-col bg-white p-8 space-y-4 ">
        
        <div class="flex items-center mb-2">
            <p class="font-bold">Product List</p>
        </div>

        <div class="flex items-center">

            <div>
                <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">1</span>
                to
                <span>
                    <select v-model="page_limit" @change="refreshData" class="text-xs pl-2 pr-8 py-1 mx-2 rounded-lg">
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="250">250</option>
                    <option value="500">500</option>
                    </select>
                </span>
                of
                <span class="font-bold">{{total_cnt}}</span>
                results
                </p>
            </div>

            <div class="flex-auto"></div>

            <div v-if="alldata.length > 0">
                <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <span @click="changePageByClick('minus')" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span class="sr-only">Previous</span>
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                    </svg>
                </span>
                <span v-for="i in page_list" v-bind:key="i.id" aria-current="page" class="relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:cursor-pointer" :class="page == i.id ? 'bg-gray-600 focus-visible:outline-gray-600 text-white' : 'bg-white text-gray-700 ring-gray-300 ring-1 ring-inset'" @click="changePage(i.id)">{{ i.id }}</span>

                <span @click="changePageByClick('add')" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span class="sr-only">Next</span>
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                    </svg>
                </span>
                </nav>
            </div>

        </div>

        <table class="w-full text-sm table-auto border-collapse border">
            <thead>
                <tr class="border bg-gray-600 text-white">
                    <th class="w-10 text-center p-4">
                    <input type="checkbox" class="border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 appearance-none accent-orange-600"/>
                    </th>
                    <th class="w-auto text-left p-4">Name</th>
                    <th class="w-auto text-left p-4">SKU</th>
                    <th class="w-auto text-left p-4">Factory #</th>
                    <th class="w-auto text-left p-4">Price</th>
                    <th class="w-auto text-left p-4">Category</th>
                    <th class="w-auto text-left p-4">Collection</th>
                    <th class="w-auto text-left p-4">Actions</th>
                </tr>
            </thead>

            <tbody class="divide-y divide-solid">
                <tr v-for="i in alldata" v-bind:key="i.id" class="hover:bg-gray-100">
                    <td class="p-4 w-10 text-center">
                        <input type="checkbox" class="border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 appearance-none accent-orange-600"/>
                    </td>
                    <td class="p-4 w-auto text-left items-center flex">
                        <img :src="getImgUrl(i.product_img)" class="w-20 h-20 mr-4 border-1 border rounded-md object-cover"/>
                        {{ i.name }}
                    </td>
                    <td class="p-4 w-auto text-left">
                        {{ i.sku }}
                    </td>
                    <td class="p-4 w-auto text-left">
                        {{ i.factory_part_num }}
                    </td>
                    <td class="p-4 w-auto text-left">
                        {{ changeMonetaryFormat(i.price) }}
                    </td>
                    <td class="p-4 w-auto text-left">
                        {{ i.category_id.description }}
                    </td>
                    <td class="p-4 w-auto text-left">
                        {{ i.collection_id.description }}
                    </td>
                    <td class="p-4 w-auto text-left">
                        <span class="flex items-center gap-2">
                            <img src="../../assets/icon_edit.png" class="h-5 w-auto hover:cursor-pointer" @click="openAddModal('edit',i.id)"/>
                            <img src="../../assets/icon_delete.png" class="h-5 w-auto hover:cursor-pointer"/>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="flex items-center">

            <div>
                <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">1</span>
                to
                <span>
                    <select v-model="page_limit" @change="refreshData" class="text-xs pl-2 pr-8 py-1 mx-2 rounded-lg">
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="250">250</option>
                    <option value="500">500</option>
                    </select>
                </span>
                of
                <span class="font-bold">{{total_cnt}}</span>
                results
                </p>
            </div>

            <div class="flex-auto"></div>

            <div v-if="alldata.length > 0">
                <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <span @click="changePageByClick('minus')" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span class="sr-only">Previous</span>
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                    </svg>
                </span>
                <span v-for="i in page_list" v-bind:key="i.id" aria-current="page" class="relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:cursor-pointer" :class="page == i.id ? 'bg-gray-600 focus-visible:outline-gray-600 text-white' : 'bg-white text-gray-700 ring-gray-300 ring-1 ring-inset'" @click="changePage(i.id)">{{ i.id }}</span>

                <span @click="changePageByClick('add')" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span class="sr-only">Next</span>
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                    </svg>
                </span>
                </nav>
            </div>

            </div>
       
    </div>

</div>


<AddProductModal v-if="show_AddProduct" @close-modal="show_AddProduct = false" :refreshData="refreshData" :showNotification="showNotification" :item_data="item_data"/>


</div>
  </template>

<script>

// import moment from 'moment';
import axios from 'axios';
import AddProductModal from '../../components/Modals/AddProductModal.vue';

export default{
  data(){
    return{
        alldata : '',

        item_data : {

        },

        page: 1,
        total_cnt: 0,
        total_pages : 0,
        page_list : [],
        page_limit : 25,

        show_AddProduct : false
        
        }
  },
  components: {
    AddProductModal
  },
  props: {
    showNotification : Function,
  },
  methods: {
    refreshData(){
        this.getAll();
    },
    resetInput(){
        this.data.name = '';
        this.data.sku = '';
        this.data.factory_part_num = '';
        this.data.category_id = 0;
        this.data.collection_id = 0;
        this.data.product_img = null;
        this.data.datetime_added = '';
    },
    openAddModal(action,id){
        this.item_data.id = id;
        this.item_data.action = action; 
        this.show_AddProduct = true;
    },
    changeMonetaryFormat(val){
        return "₽" + val.toFixed(2);
    },
    getImgUrl(imagePath) {
    return process.env.VUE_APP_BASE_URL + "/products/get_img/" + imagePath;
    },
    changePageByClick(type){
    if(type == "add"){
        if(this.page != this.total_pages){
        this.page++;
        this.refreshData();
        }
        
    }
    else if(type == "minus"){
        if(this.page != 1){
        this.page--;
        this.refreshData();
        }
    }
    },
    changePage(val){
    this.page = val;
    this.refreshData();
},
    generatePages(val){

    this.total_cnt = val;
    if(this.page_list.length > 0) this.page_list.splice(0);

    this.total_pages = Math.ceil(this.total_cnt/this.page_limit);
    for(var i = 1; i <= this.total_pages; i++){
        this.page_list.push({
        id : i
        });
    }
    },
    getAll(){
        axios.get(process.env.VUE_APP_BASE_URL + '/products/get_all/' + this.page + '/' + this.page_limit)
        .then((res)=>{
        
            if(res.status == 200){
        
            this.alldata = res.data[0];
            this.generatePages(res.data[1]);

            }
            
        })
    },
    //
  },
  mounted: function(){
    this.refreshData();
  }
}


</script>