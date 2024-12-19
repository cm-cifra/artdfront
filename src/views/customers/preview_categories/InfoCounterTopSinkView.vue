<template>
    <div>
        

        
        <div class="flex flex-col fixed bottom-20 right-0 space-y-4 bg-primary-600 px-4 py-4 cursor-pointer rounded-l-lg">
            <p class="cursor-pointer hover:text-white duration-300 hover:transform hover:scale-110">Description</p>
            <p class="cursor-pointer hover:text-white duration-300 hover:transform hover:scale-110">Characteristics</p>
            <p class="cursor-pointer hover:text-white duration-300 hover:transform hover:scale-110">Instruction</p>
        </div>

        <div class="">

        </div>




    </div>
</template>

<script>

import axios from 'axios'

export default{
    data(){
        return{
            
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

        }
    },
    props : {
        item_data : Object
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
    },
    watch: {
        item_data: {
            immediate:true,
            handler(val){

                this.data_info.id = val;
                this.findData();
            },
        },
        
        }
}

</script>