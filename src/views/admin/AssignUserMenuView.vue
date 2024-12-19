<template>
    <div class="flex flex-col sm:flex-row p-4 gap-4">

<div class="flex-1 flex flex-col sm:flex-row h-auto max-h-full gap-4">

    <div class="flex-1 flex flex-col bg-white h-auto p-8 space-y-4 ">
        
        <div class="flex items-center mb-2 gap-4">
            <p class="flex-none font-bold">User Menu List</p>
            <select v-model="usertype" class="flex-none rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm p-4 w-1/4">
                <option v-for="i in allusertypes" v-bind:key="i.id" v-bind:value="i.id" @change="getAll()">{{ i.description }}</option>
            </select>
        </div>

        


        <div class="flex flex-row">
            <div class="flex-1">
                <p class="flex-none font-bold">Assigned Modules</p>
                <draggable class="dragArea list-group w-full" :alldata="alldata" @change="log">
                <div
                    class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center cursor-pointer"
                    v-for="element in alldata"
                    :key="element.id"
                >
                    {{ element.um_id.name }}
                </div>
                </draggable>
            </div>

            <div class="flex-1">
                <p class="flex-none font-bold">Available Modules</p>
                <draggable class="dragArea list-group w-full" :allavailablemenu="allavailablemenu" @change="log">
                <div
                    class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center cursor-pointer"
                    v-for="element in allavailablemenu"
                    :key="element.id"
                >
                    {{ element.name }}
                </div>
                </draggable>
            </div>
            
            
        </div>

       
    </div>

</div>


<AddUserMenuModal v-if="show_AddProduct" @close-modal="show_AddProduct = false" :refreshData="refreshData" :showNotification="showNotification" :item_data="item_data"/>


</div>
  </template>

<script>

// import moment from 'moment';
import axios from 'axios';
import AddUserMenuModal from '../../components/Modals/AddUserMenuModal.vue';
import { defineComponent } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'

export default{
  data(){
    return{
        alldata : '',
        allusertypes : '',
        allavailablemenu : '',

        usertype : '',

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
    AddUserMenuModal,
    draggable: VueDraggableNext,
  },
  props: {
    showNotification : Function,
  },
  methods: {
    refreshData(){
        this.getUserTypes();
        this.getAvailableMenus();
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
    return process.env.VUE_APP_BASE_URL + "/user_menu/get_img/" + imagePath;
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
    getUserTypes(){
        axios.get(process.env.VUE_APP_BASE_URL + '/user_types/get_all/')
        .then((res)=>{
        
            if(res.status == 200){
        
            this.allusertypes = res.data;
            this.usertype = this.allusertypes[0].id;
            this.getAll();

            }
            
        })
    },
    getAll(){
        axios.get(process.env.VUE_APP_BASE_URL + '/user_type_menu/find_by_type/' + this.usertype)
        .then((res)=>{
        
            if(res.status == 200){
        
            this.alldata = res.data;
            this.getAvailableMenus();

            }
            
        })
    },
    getAvailableMenus(){
        axios.get(process.env.VUE_APP_BASE_URL + '/user_menu/get_all/')
        .then((res)=>{
        
            if(res.status == 200){
        
            this.allavailablemenu = res.data;

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