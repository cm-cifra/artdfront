<template>


    <div class="flex flex-col sm:flex-row p-4 gap-4">

<div class="flex-1 flex flex-col sm:flex-row h-auto max-h-full gap-4">

    

    <div class="flex-1 flex flex-col bg-white p-8 space-y-4">

        <div>
            <p class="font-bold">Product Description</p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-auto flex flex-col">
                <label class="text-xs">Guarantee</label>
                <textarea v-model="data_info.guarantee" rows="2" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
                </textarea>
            </div>
            <div class="flex-auto flex flex-col">
                <label class="text-xs">Scheme</label>
                <textarea v-model="data_info.scheme" rows="2" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
                </textarea>
            </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-2 flex flex-col">
                <label class="text-xs">Product Weight (kg)</label>
                <input v-model="data_info.product_weight" type="number" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-2 flex flex-col">
                <label class="text-xs">Package Weight (kg)</label>
                <input v-model="data_info.package_weight" type="number" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
        </div>


        <div class="flex-auto flex flex-col">
            <div class="flex items-center space-x-2">
                <label class="text-xs bg-gray-800 px-4 py-2 rounded-md text-white cursor-pointer" @click="showToggleListColor">{{ !showListColor ? 'Show Color List' : 'Hide Color List' }}</label>
                <div class="relative w-6 h-6 bg-purple-200 rounded-full flex justify-center items-center text-center p-4 cursor-pointer" @click="addToColorList">
                    <span class="mx-auto">+</span>
                </div>
            </div>
            <Vue3ColorPicker v-if="showListColor" v-model="data_info.selected_color" mode="solid" theme="light" type="HEX" :showInputMenu="false" :showColorList="false" :showPickerMode="false" :showEyeDrop="false" :showAlpha="false" gradientMode="light" :showButtons="showButtons" style="box-shadow: none;"/>

            <label class="text-xs mt-2" @click="showListColor == true" v-if="data_info.color.length > 0">Colors</label>
            <div class="flex items-center">
                <span v-for="i in data_info.color" v-bind:key="i.id" class="p-2">
                    <span class="relative w-6 h-6 bg-purple-200 rounded-full flex justify-center items-center text-center p-4 cursor-pointer border border-gray-400" @click="showColor(i.value)" @dblclick="removeColor(i.value)" :style="{ 'background-color': i.value }">
                    </span>
                </span>
            </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Surface</label>
                <input v-model="data_info.surface" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Material</label>
                <input v-model="data_info.material" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Height (mm)</label>
                <input v-model="data_info.height" type="number" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Installation</label>
                <input v-model="data_info.installation" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-auto p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Suitable for bowl sink</label>
                <input v-model="data_info.suitable_for_bowl_sink" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-auto p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Consumption Saving</label>
                <input v-model="data_info.consumption_saving" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-auto p-4">
            </div>
        </div>

        <div>
            <p class="font-bold">Spout</p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-2 flex flex-col">
                <label class="text-xs">Description</label>
                <input v-model="data_info.spout" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-2 flex flex-col">
                <label class="text-xs">Height (mm)</label>
                <input v-model="data_info.spout_height" type="number" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-2 flex flex-col">
                <label class="text-xs">Length (mm)</label>
                <input v-model="data_info.spout_length" type="number" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-auto p-4">
            </div>
        </div>

        <div>
            <p class="font-bold">Control</p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-2 flex flex-col">
                <label class="text-xs">Type</label>
                <input v-model="data_info.control" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-2 flex flex-col">
                <label class="text-xs">Control Mechanism</label>
                <input v-model="data_info.control_mechanism" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
        </div>

        <div>
            <p class="font-bold">Eyeliner</p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-2 flex flex-col">
                <label class="text-xs">Type</label>
                <input v-model="data_info.eyeliner_type" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-2 flex flex-col">
                <label class="text-xs">Eyeliner Standard</label>
                <input v-model="data_info.eyeliner_standard" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
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

import {Vue3ColorPicker} from '@cyhnkckali/vue3-color-picker';
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
            selected_color : '#ffffff',
            color : [],
            surface : null,
            material : null,
            spout : null,
            height : null,
            spout_height : null,
            spout_length : null,
            installation : null,
            control : null,
            eyeliner_type : null,
            eyeliner_standard : null,
            control_mechanism : null,
            suitable_for_bowl_sink : null,
            consumption_saving : null,
            product_weight : null,
            package_weight : null,
            guarantee : null,
            scheme : null,
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
    components: {
        Vue3ColorPicker
    },
    mounted(){
        this.findData();
    },
    methods: {
        findData(){
            this.data_info.product_id = this.product_id;

            axios.get(process.env.VUE_APP_BASE_URL + '/info_mixers/find_by_product/' + this.data_info.product_id)
            .then((res)=>{
            
                if(res.status == 200){
                    
                    if(res.data.color){
                        var colorArr = JSON.parse(res.data.color); 
                        this.data_info.color = colorArr;
                    }

                    this.data_info.id = res.data.id;
                    this.data_info.product_id = res.data.product_id;
                    this.data_info.surface = res.data.surface;
                    this.data_info.material = res.data.material;
                    this.data_info.spout = res.data.spout;
                    this.data_info.height = res.data.height;
                    this.data_info.spout_height = res.data.spout_height;
                    this.data_info.spout_length = res.data.spout_length;
                    this.data_info.installation = res.data.installation;
                    this.data_info.control = res.data.control;
                    this.data_info.eyeliner_type = res.data.eyeliner_type;
                    this.data_info.eyeliner_standard = res.data.eyeliner_standard;
                    this.data_info.control_mechanism = res.data.control_mechanism;
                    this.data_info.suitable_for_bowl_sink = res.data.suitable_for_bowl_sink;
                    this.data_info.consumption_saving = res.data.consumption_saving;
                    this.data_info.product_weight = res.data.product_weight;
                    this.data_info.package_weight = res.data.package_weight;
                    this.data_info.guarantee = res.data.guarantee;
                    this.data_info.scheme = res.data.scheme;
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

            axios.post(process.env.VUE_APP_BASE_URL + '/info_mixers/edit', this.data_info)
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