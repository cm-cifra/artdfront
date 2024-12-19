<template>


    <div class="flex flex-col sm:flex-row p-4 gap-4">

<div class="flex-1 flex flex-col sm:flex-row h-auto max-h-full gap-4">

    

    <div class="flex-1 flex flex-col bg-white p-8 space-y-4">

        <div>
            <p class="font-bold">Product Description</p>
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
            <div class="flex-auto flex flex-col">
                <label class="text-xs">Style</label>
                <input v-model="data_info.style" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-auto flex flex-col">
                <label class="text-xs">Guarantee</label>
                <input v-model="data_info.guarantee" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-auto flex flex-col">
                <label class="text-xs">Product Weight (kg)</label>
                <input v-model="data_info.product_weight" type="number" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-none flex flex-col">
                <label class="text-xs">Package Weight (kg)</label>
                <input v-model="data_info.package_weight" type="number" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-auto p-4">
            </div>
        </div>

        <div>
            <p class="font-bold">Shell</p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-auto flex flex-col">
                <label class="text-xs">Shell Shape</label>
                <input v-model="data_info.shell_shape" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-auto flex flex-col">
                <label class="text-xs">Shell Material</label>
                <input v-model="data_info.shell_material" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-none flex flex-col">
                <label class="text-xs">Number of Shells</label>
                <input v-model="data_info.num_shells" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-auto p-4">
            </div>
        </div>

        <div>
            <p class="font-bold">Sink</p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Sink Type</label>
                <input v-model="data_info.sink_type" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Sink Dimensions (w*d*h)</label>
                <input v-model="data_info.sink_dimensions" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Sink Drain Diameters (mm)</label>
                <input v-model="data_info.sink_diameter" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Possible base</label>
                <input v-model="data_info.sink_possible_base" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
        </div>

        
        <div>
            <p class="font-bold">Table Top</p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Table Top Material</label>
                <input v-model="data_info.table_top_material" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Table Top Dimensions(w*d*h)</label>
                <input v-model="data_info.table_top_dimensions" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Table Top Thickness (mm)</label>
                <input v-model="data_info.table_top_thickness" type="number" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Table Top Location</label>
                <input v-model="data_info.table_top_location" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1 flex-col">
                <label class="text-xs">Mixer Location</label>
                <input v-model="data_info.mixer_location" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex-col">
                <label class="text-xs">Ready-made holes for the mixer</label>
                <input v-model="data_info.ready_made_holes_for_mixer" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex-col">
                <label class="text-xs">Siphon Diameter (mm)</label>
                <input v-model="data_info.siphon_diameter" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex-col">
                <label class="text-xs">Overflow</label>
                <input v-model="data_info.overflow" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex-col">
                <label class="text-xs">Bottom Valve</label>
                <input v-model="data_info.bottom_valve" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
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
            style : null,
            selected_color : '#ffffff',
            color : [],
            sink_type : null,
            shell_shape : null,
            num_shells : 0,
            shell_material : null,
            sink_dimensions : null,
            table_top_material : null,
            table_top_dimensions : null,
            table_top_thickness : null,
            table_top_location : null,
            mixer_location : null,
            sink_diameter : 0,
            siphon_diameter : 0,
            ready_made_holes_for_mixer : null,
            overflow : null,
            bottom_valve : null,
            sink_possible_base : null,
            guarantee : null,
            product_weight : 0,
            package_weight : 0,
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

            axios.get(process.env.VUE_APP_BASE_URL + '/info_counter_top_sink/find_by_product/' + this.data_info.product_id)
            .then((res)=>{
            
                if(res.status == 200){
                    
                    if(res.data.color){
                        var colorArr = JSON.parse(res.data.color); 
                        this.data_info.color = colorArr;
                    }
                   

                    this.data_info.id = res.data.id;
                    this.data_info.product_id = res.data.product_id;
                    this.data_info.style = res.data.style;
                    this.data_info.sink_type = res.data.sink_type;
                    this.data_info.shell_shape = res.data.shell_shape;
                    this.data_info.num_shells = res.data.num_shells;
                    this.data_info.shell_material = res.data.shell_material;
                    this.data_info.sink_dimensions = res.data.sink_dimensions;
                    this.data_info.table_top_material = res.data.table_top_material;
                    this.data_info.table_top_dimensions = res.data.table_top_dimensions;
                    this.data_info.table_top_thickness = res.data.table_top_thickness;
                    this.data_info.table_top_location = res.data.table_top_location;
                    this.data_info.mixer_location = res.data.mixer_location;
                    this.data_info.sink_diameter = res.data.sink_diameter;
                    this.data_info.siphon_diameter = res.data.siphon_diameter;
                    this.data_info.ready_made_holes_for_mixer = res.data.ready_made_holes_for_mixer;
                    this.data_info.overflow = res.data.overflow;
                    this.data_info.bottom_valve = res.data.bottom_valve;
                    this.data_info.sink_possible_base = res.data.sink_possible_base;
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

            axios.post(process.env.VUE_APP_BASE_URL + '/info_counter_top_sink/edit', this.data_info)
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