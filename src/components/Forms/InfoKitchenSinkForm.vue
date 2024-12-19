<template>


    <div class="flex flex-col sm:flex-row p-4 gap-4">

<div class="flex-1 flex flex-col sm:flex-row h-auto max-h-full gap-4">

    

    <div class="flex-1 flex flex-col bg-white p-8 space-y-4">

        <div>
            <p class="font-bold">Product Description</p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Equipment</label>
                <textarea v-model="data_info.equipment" rows="2" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
                </textarea>
            </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Guarantee</label>
                <input v-model="data_info.guarantee" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Scheme</label>
                <input v-model="data_info.scheme" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Product weight (kg)</label>
                <input v-model="data_info.product_weight" type="number" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Package weight (kg)</label>
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
                <label class="text-xs">Form</label>
                <input v-model="data_info.form" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Material</label>
                <input v-model="data_info.material" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Dimensions (w*d*h)</label>
                <input v-model="data_info.dimensions" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Code</label>
                <input v-model="data_info.code" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Sink Thickness (mm)</label>
                <input v-model="data_info.thickness" type="number" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Hole for Mixer</label>
                <input v-model="data_info.hole_for_mixer" type="number" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Hole for filter tap or dispenser</label>
                <input v-model="data_info.hole_for_filter" type="number" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-auto flex flex-col">
                <label class="text-xs">Installation</label>
                <input v-model="data_info.installation" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Drain Overflow</label>
                <input v-model="data_info.drain_overflow" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Presence of a Wing?</label>
                <input v-model="data_info.presence_wing" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
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
            surface : null,
            selected_color : '#ffffff',
            color : [],
            form : null,
            material : null,
            dimensions : null,
            code : null,
            thickness : null,
            hole_for_mixer : null,
            installation : null,
            drain_overflow : null,
            presence_wing : null,
            hole_for_filter : null,
            equipment : null,
            guarantee : null,
            product_weight : null,
            package_weight : null,
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

            axios.get(process.env.VUE_APP_BASE_URL + '/info_kitchen_sink/find_by_product/' + this.data_info.product_id)
            .then((res)=>{
            
                if(res.status == 200){
                    
                    if(res.data.color){
                        var colorArr = JSON.parse(res.data.color); 
                        this.data_info.color = colorArr;
                    }

                    this.data_info.id = res.data.id;
                    this.data_info.product_id = res.data.product_id;
                    this.data_info.surface = res.data.surface;
                    this.data_info.form = res.data.form;
                    this.data_info.material = res.data.material;
                    this.data_info.dimensions = res.data.dimensions;
                    this.data_info.code = res.data.code;
                    this.data_info.thickness = res.data.thickness;
                    this.data_info.hole_for_mixer = res.data.hole_for_mixer;
                    this.data_info.installation = res.data.installation;
                    this.data_info.drain_overflow = res.data.drain_overflow;
                    this.data_info.presence_wing = res.data.presence_wing;
                    this.data_info.hole_for_filter = res.data.hole_for_filter;
                    this.data_info.equipment = res.data.equipment;
                    this.data_info.guarantee = res.data.guarantee;
                    this.data_info.product_weight = res.data.product_weight;
                    this.data_info.package_weight = res.data.package_weight;
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

            axios.post(process.env.VUE_APP_BASE_URL + '/info_kitchen_sink/edit', this.data_info)
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