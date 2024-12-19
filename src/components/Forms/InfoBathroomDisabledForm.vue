<template>


    <div class="flex flex-col sm:flex-row p-4 gap-4">

<div class="flex-1 flex flex-col sm:flex-row h-auto max-h-full gap-4">

    

    <div class="flex-1 flex flex-col bg-white p-8 space-y-4">

        <div>
            <p class="font-bold">Product Description</p>
        </div>

        <div class="flex flex-col md:flex-col sm:flex-row gap-4">
            <div class="flex-auto flex flex-col">
                <label class="text-xs">Description</label>
                <textarea v-model="data_info.description" rows="2" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
                </textarea>
            </div>
            <div class="flex-auto flex flex-col">
                <label class="text-xs">Product (Equipment)</label>
                <textarea v-model="data_info.equipment" rows="2" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
                </textarea>
            </div>
        </div>

        <div class="flex flex-col md:flex-col sm:flex-row gap-4">
            <div class="flex-auto flex flex-col">
                <label class="text-xs">Options</label>
                <textarea v-model="data_info.options" rows="2" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
                </textarea>
            </div>
            <div class="flex-auto flex flex-col">
                <label class="text-xs">Acccessories</label>
                <textarea v-model="data_info.accessories" rows="2" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
                </textarea>
            </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-auto flex flex-col">
                <label class="text-xs">Guarantee</label>
                <input v-model="data_info.guarantee" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-none flex flex-col">
                <label class="text-xs">Capacity</label>
                <input v-model="data_info.capacity" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
        </div>

        <div>
            <p class="font-bold">Measurements</p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-none flex flex-col">
                <label class="text-xs">Product Weight (kg)</label>
                <input v-model="data_info.weight" type="number" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-32 p-4">
            </div>
            <div class="flex-none flex flex-col">
                <label class="text-xs">Entrance Height (mm)</label>
                <input v-model="data_info.entrance_height" type="number" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-32 p-4">
            </div>
            <div class="flex-none flex flex-col">
                <label class="text-xs">Opening Height (mm)</label>
                <input v-model="data_info.opening_height" type="number" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-32 p-4">
            </div>
            <div class="flex-none flex flex-col">
                <label class="text-xs">Opening Width (mm)</label>
                <input v-model="data_info.opening_width" type="number" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-32 p-4">
            </div>
            <div class="flex-auto flex flex-col">
                <label class="text-xs">Dimensions (w*d*h)</label>
                <input v-model="data_info.dimensions" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-none flex flex-col">
                <label class="text-xs">Seat Height (mm)</label>
                <input v-model="data_info.seat_height" type="number" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-32 p-4">
            </div>
            <div class="flex-none flex flex-col">
                <label class="text-xs">Package Weight (kg)</label>
                <input v-model="data_info.package_weight" type="number" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-32 p-4">
            </div>
            <div class="flex-auto flex flex-col">
                <label class="text-xs">Drain</label>
                <textarea v-model="data_info.drain" rows="1" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
                </textarea>
            </div>
            <div class="flex-auto flex flex-col">
                <label class="text-xs">Drain Location</label>
                <input v-model="data_info.drain_location" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
        </div>



        <div class="justify-end flex items-center h-20">
            <button class="bg-blue-600 px-8 rounded-md py-2 text-white" @click="editForm()">Edit</button>
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
    
        action : '',
        btn_name : '',

        showListColor : false,

        data_info : {
            id : 0,
            product_id : 0,
            dimensions : null,
            weight: 0,
            capacity: null,
            description: null,
            drain_location: null,
            entrance_height: 0,
            opening_height: 0,
            opening_width : 0,
            seat_height: 0,
            drain : null,
            equipment : '',
            options : '',
            accessories : '',
            guarantee : null,
            package_weight : 0,
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
        findData(){
            this.data_info.product_id = this.product_id;

            axios.get(process.env.VUE_APP_BASE_URL + '/info_baths_disabled/find_by_product/' + this.data_info.product_id)
            .then((res)=>{
            
                if(res.status == 200){
     
                    this.data_info.id = res.data.id;
                    this.data_info.product_id = res.data.product_id;
                    this.data_info.dimensions = res.data.dimensions;
                    this.data_info.weight = res.data.weight;
                    this.data_info.capacity = res.data.capacity;
                    this.data_info.description = res.data.description;
                    this.data_info.drain_location = res.data.drain_location;
                    this.data_info.entrance_height = res.data.entrance_height;
                    this.data_info.opening_height = res.data.opening_height;
                    this.data_info.opening_width = res.data.opening_width;
                    this.data_info.seat_height = res.data.seat_height;
                    this.data_info.drain = res.data.drain;
                    this.data_info.equipment = res.data.equipment;
                    this.data_info.options = res.data.options;
                    this.data_info.accessories = res.data.accessories;
                    this.data_info.guarantee = res.data.guarantee;
                    this.data_info.package_weight = res.data.package_weight;
                   
                    this.data_info.datetime_modified = res.data.datetime_modified;

                    
    
                }
                
            })
        },
        showToggleListColor(){
            if(this.showListColor) this.showListColor = false;
            else this.showListColor = true;
        },
        showColor(val){
            this.data_info.selected_color = val;
        },
        removeColor(val){
            for(var i = 0; i < this.data_info.color.length; i++){
                if(this.data_info.color[i].value == val){
                    this.data_info.color.splice(i, 1);
                    break;
                }
            }
        },
        addToColorList(){
            this.data_info.color.push({
                value : this.data_info.selected_color
            });

            this.data_info.selected_color = '#ffffff';
        },
        insertToSelectColor(color){
            console.log(color);
        },
        editForm(){

            const today = new Date();
            const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const timestamp = date + ' ' + time;

            this.data_info.datetime_modified = timestamp;

            this.data_info.color = JSON.stringify(this.data_info.color); 

            axios.post(process.env.VUE_APP_BASE_URL + '/info_baths_disabled/edit', this.data_info)
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