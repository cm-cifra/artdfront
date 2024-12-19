<template>


    <div class="flex flex-col sm:flex-row p-4 gap-4">

<div class="flex-1 flex flex-col sm:flex-row h-auto max-h-full gap-4">

    

    <div class="flex-1 flex flex-col bg-white p-8 space-y-4">

        <div>
            <p class="font-bold">Product Description</p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-2 flex flex-col">
                <label class="text-xs">Brand name</label>
                <input type="text" v-model="data_info.brand_name" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4"/>
               
            </div>
            
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
                <label class="text-xs bg-gray-800 px-4 py-2 rounded-md text-white cursor-pointer" @click="showToggleListColor('cabinet')">{{ !showListColorCabinet ? 'Show Color List of Cabinet' : 'Hide Color List' }}</label>
                <div class="relative w-6 h-6 bg-purple-200 rounded-full flex justify-center items-center text-center p-4 cursor-pointer" @click="addToColorList('cabinet')">
                    <span class="mx-auto">+</span>
                </div>
            </div>
            <Vue3ColorPicker v-if="showListColorCabinet" v-model="data_info.selected_color_cabinet" mode="solid" theme="light" type="HEX" :showInputMenu="false" :showColorList="false" :showPickerMode="false" :showEyeDrop="false" :showAlpha="false" gradientMode="light" :showButtons="showButtons" style="box-shadow: none;"/>

            <label class="text-xs mt-2" @click="showListColorCabinet == true" v-if="data_info.color_cabinet.length > 0">Color of Cabinet</label>
            <div class="flex items-center">
                <span v-for="i in data_info.color_cabinet" v-bind:key="i.id" class="p-2">
                    <span class="relative w-6 h-6 bg-purple-200 rounded-full flex justify-center items-center text-center p-4 cursor-pointer border border-gray-400" @click="showColor(i.value,'cabinet')" @dblclick="removeColor(i.value,'cabinet')" :style="{ 'background-color': i.value }">
                    </span>
                </span>
            </div>
        </div>

        <div class="flex-auto flex flex-col">
            <div class="flex items-center space-x-2">
                <label class="text-xs bg-gray-800 px-4 py-2 rounded-md text-white cursor-pointer" @click="showToggleListColor('fitting')">{{ !showListColorFitting ? 'Show Color List of Fittings' : 'Hide Color List' }}</label>
                <div class="relative w-6 h-6 bg-purple-200 rounded-full flex justify-center items-center text-center p-4 cursor-pointer" @click="addToColorList('fitting')">
                    <span class="mx-auto">+</span>
                </div>
            </div>
            <Vue3ColorPicker v-if="showListColorFitting" v-model="data_info.selected_color_fittings" mode="solid" theme="light" type="HEX" :showInputMenu="false" :showColorList="false" :showPickerMode="false" :showEyeDrop="false" :showAlpha="false" gradientMode="light" :showButtons="showButtons" style="box-shadow: none;"/>

            <label class="text-xs mt-2" @click="showListColorFitting == true" v-if="data_info.color_fittings.length > 0">Color of Fittings</label>
            <div class="flex items-center">
                <span v-for="i in data_info.color_fittings" v-bind:key="i.id" class="p-2">
                    <span class="relative w-6 h-6 bg-purple-200 rounded-full flex justify-center items-center text-center p-4 cursor-pointer border border-gray-400" @click="showColor(i.value,'fitting')" @dblclick="removeColor(i.value,'fitting')" :style="{ 'background-color': i.value }">
                    </span>
                </span>
            </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Style</label>
                <input v-model="data_info.style" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Covering</label>
                <input v-model="data_info.covering" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Storage System</label>
                <input v-model="data_info.storage_system" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Installation</label>
                <input v-model="data_info.installation" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-auto p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Dimensions (w*d*h, mm)</label>
                <input v-model="data_info.dimensions" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-auto p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Fitting with a closer mechanism?</label>
                <input v-model="data_info.fittings_with_closer_mechanism" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-auto p-4">
            </div>
        </div>

        <div>
            <p class="font-bold">Material</p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-2 flex flex-col">
                <label class="text-xs">Facade Material</label>
                <input v-model="data_info.material_cabinet_facade" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-2 flex flex-col">
                <label class="text-xs">Body Material</label>
                <input v-model="data_info.material_cabinet_body" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
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

        showListColorCabinet : false,
        showListColorFitting : false,

        data_info : {
            id : 0,
            product_id : 0,
            selected_color_cabinet : '#ffffff',
            selected_color_fittings : '#ffffff',
            color_cabinet : [],
            color_fittings : [],
            brand_name : '',
            style : null,
            dimensions : null,
            material_cabinet_facade : null,
            material_cabinet_body : null,
            covering : null,
            storage_system : null,
            installation : null,
            fittings_with_closer_mechanism : null,
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

            axios.get(process.env.VUE_APP_BASE_URL + '/info_pedestals/find_by_product/' + this.data_info.product_id)
            .then((res)=>{
            
                if(res.status == 200){
                    
                    if(res.data.color_cabinet){
                        var colorArr = JSON.parse(res.data.color_cabinet); 
                        this.data_info.color_cabinet = colorArr;
                    }

                    if(res.data.color_fittings){
                        var colorArr2 = JSON.parse(res.data.color_fittings); 
                        this.data_info.color_fittings = colorArr2;
                    }


                    this.data_info.id = res.data.id;
                    this.data_info.product_id = res.data.product_id;
                    this.data_info.brand_name = res.data.brand_name;
                    this.data_info.style = res.data.style;
                    this.data_info.dimensions = res.data.dimensions;
                    this.data_info.material_cabinet_facade = res.data.material_cabinet_facade;
                    this.data_info.material_cabinet_body = res.data.material_cabinet_body;
                    this.data_info.covering = res.data.covering;
                    this.data_info.storage_system = res.data.storage_system;
                    this.data_info.installation = res.data.installation;
                    this.data_info.fittings_with_closer_mechanism = res.data.fittings_with_closer_mechanism;
                    this.data_info.product_weight = res.data.product_weight;
                    this.data_info.package_weight = res.data.package_weight;
                    this.data_info.guarantee = res.data.guarantee;
                    this.data_info.scheme = res.data.scheme;
                    this.data_info.datetime_modified = res.data.datetime_modified;

                    
    
                }
                
            })
        },
        showToggleListColor(name){
            if(name == 'cabinet'){
                if(this.showListColorCabinet) this.showListColorCabinet = false;
                else this.showListColorCabinet = true;
            }
            else{
                if(this.showListColorFitting) this.showListColorFitting = false;
                else this.showListColorFitting = true;
            }
            
        },
        showColor(val,name){
            if(name == 'cabinet') this.data_info.selected_color_cabinet = val;
            else this.data_info.selected_color_fittings = val;
            
        },
        removeColor(val,name){
            if(name == 'cabinet'){
                for(var i = 0; i < this.data_info.color_cabinet.length; i++){
                    if(this.data_info.color_cabinet[i].value == val){
                        this.data_info.color_cabinet.splice(i, 1);
                        break;
                    }
                }
            }
            else{
                for(var j = 0; j < this.data_info.color_fittings.length; j++){
                    if(this.data_info.color_fittings[j].value == val){
                        this.data_info.color_fittings.splice(j, 1);
                        break;
                    }
                }
            }
            
        },
        addToColorList(name){

            if(name == 'cabinet'){
                this.data_info.color_cabinet.push({
                    value : this.data_info.selected_color_cabinet
                });
            }
            else{
                this.data_info.color_fittings.push({
                    value : this.data_info.selected_color_fittings
                });
            }
            

            this.data_info.selected_color_cabinet = '#ffffff';
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

            if(this.data_info.color_cabinet) this.data_info.color_cabinet = JSON.stringify(this.data_info.color_cabinet); 
            if(this.data_info.color_fittings) this.data_info.color_fittings = JSON.stringify(this.data_info.color_fittings); 

            axios.post(process.env.VUE_APP_BASE_URL + '/info_pedestals/edit', this.data_info)
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