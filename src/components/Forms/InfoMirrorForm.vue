<template>


    <div class="flex flex-col sm:flex-row p-4 gap-4">

<div class="flex-1 flex flex-col sm:flex-row h-auto max-h-full gap-4">

    

    <div class="flex-1 flex flex-col bg-white p-8 space-y-4">

        <div>
            <p class="font-bold">Product Description</p>
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


        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Style</label>
                <input v-model="data_info.style" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Form</label>
                <input v-model="data_info.form" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Frame</label>
                <input v-model="data_info.frame" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Material</label>
                <input v-model="data_info.material" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Backlight Placement</label>
                <input v-model="data_info.backlight_placement" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Backlight Color</label>
                <input v-model="data_info.backlight_color" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Switch Type</label>
                <input v-model="data_info.switch_type" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Anti-fog coating</label>
                <input v-model="data_info.anti_fog_coating" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Dimensions (w*d*h)</label>
                <input v-model="data_info.dimensions" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
            </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1 flex flex-col">
                <label class="text-xs">Peculiarities</label>
                <textarea v-model="data_info.peculiarities" rows="2" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
                </textarea>
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
            style : null,
            dimensions : null,
            form : null,
            frame : null,
            material : null,
            backlight_placement : null,
            backlight_color : null,
            switch_type : null,
            anti_fog_coating : null,
            peculiarities : null,
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
    mounted(){
        this.findData();
    },
    methods: {
        findData(){
            this.data_info.product_id = this.product_id;

            axios.get(process.env.VUE_APP_BASE_URL + '/info_mirrors/find_by_product/' + this.data_info.product_id)
            .then((res)=>{
            
                if(res.status == 200){
                    

                    this.data_info.id = res.data.id;
                    this.data_info.product_id = res.data.product_id;
                    this.data_info.style = res.data.style;
                    this.data_info.dimensions = res.data.dimensions;
                    this.data_info.form = res.data.form;
                    this.data_info.frame = res.data.frame;
                    this.data_info.material = res.data.material;
                    this.data_info.backlight_placement = res.data.backlight_placement;
                    this.data_info.backlight_color = res.data.backlight_color;
                    this.data_info.switch_type = res.data.switch_type;
                    this.data_info.anti_fog_coating = res.data.anti_fog_coating;
                    this.data_info.peculiarities = res.data.peculiarities;
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

            axios.post(process.env.VUE_APP_BASE_URL + '/info_mirrors/edit', this.data_info)
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