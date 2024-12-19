<template>

    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        
    
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    
    <div class="fixed z-10 inset-0 w-screen h-screen">
    
        <div class="flex flex-col h-screen w-screen overflow-y-auto lg:mx-auto fadeInSlide">
    
    <div class="flex-none">
    
        <div class="bg-gray-900 px-5 py-4 grid grid-cols-2 items-center justify-center md:rounded-none sm:rounded-t-xl">
        <h3 class="text-lg leading-6 font-medium text-white">{{title}}</h3>
        <div class="items-center">
            <img src="../../assets/icon_close_white.png" class="w-4 h-4 float-right cursor-pointer" @click="closeModal()"/>
            </div>
        </div>
    
    </div>
    
    <div class="flex-auto overflow-y-auto scrollbar bg-white md:rounded-none sm:rounded-b-xl h-screen sm:h-auto lg:px-20">
    
        <div class="flex flex-col sm:flex-row p-4 gap-4">

            <div class="flex-1 flex flex-col sm:flex-row h-auto max-h-full gap-4">

                <div class="flex-1 flex flex-col bg-white">
                    <div class="border rounded-lg m-8 h-full flex flex-col justify-center text-center">
                        <div class="p-4">

                        <img src="../../assets/icon_upload.png" class="flex-none h-96 w-96 m-auto max-h-96 max-w-96 object-cover rounded-xl" ref="view_img"/>
                        <p class="flex-none font-thin my-4">Drop your image here or</p>
                        <input type="file" id="upload_file" ref="upload_file" @change="onFileChange($event)" class="w-full sm:w-1/2 mx-auto text-gray-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-600 file:hover:bg-gray-700 file:text-white rounded" />
                        <!-- <p class="flex-none text-gray-700 font-bold">Click to browse</p> -->
                        
                        </div>

                        <div class="flex flex-col p-4 gap-2">
                            <p>Gallery</p>
                            <input type="file" id="upload_sub_img" ref="upload_sub_img" @change="onFileChangeSubImage($event)" class="w-full sm:w-1/2 mx-auto text-gray-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-600 file:hover:bg-gray-700 file:text-white rounded" />
                            <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                <div v-for="i in allsubimages" :key="i.id">
                                    <img :src="getSubImgUrl(i.file_name)" class="w-full h-full rounded-lg"/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="flex-1 flex flex-col bg-white p-8 space-y-4">

                    <div>
                        <label class="text-xs">Product Name</label>
                        <textarea v-model="data.name" rows="2" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm p-4 w-full">
                        </textarea>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-4">
                        <div class="flex-1 flex-col">
                            <label class="text-xs">SKU #</label>
                            <input v-model="data.sku" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
                        </div>
                        <div class="flex-1 flex-col">
                            <label class="text-xs">Factory #</label>
                            <input v-model="data.factory_part_num" type="text" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm w-full p-4">
                        </div>
                    </div>

                    <div>
                        <p class="text-xs">Product Price</p>
                        <input v-model="data.price" type="number" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm p-4 w-full">
                    </div>

                    <div class="flex flex-col md:flex-col sm:flex-row gap-4">
                        <div class="flex-1 flex-col">
                            <label class="text-xs">Category</label>
                            <select v-model="data.category_id" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm p-4 w-full" @change="getCollections()">
                                <option v-for="i in allcategories" v-bind:key="i.id" :value="i.id">
                                {{i.description}}      
                                </option>
                            </select>
                        </div>
                        <div class="flex-1 flex-col">
                            <label class="text-xs">Collection</label>
                            <select v-model="data.collection_id" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm p-4 w-full">
                                <option v-for="i in allcollections" v-bind:key="i.id" :value="i.id">
                                {{i.description}}      
                                </option>
                            </select>
                        </div>
                    </div>

                
                  
                    

                    <div class="justify-end flex items-center h-20">
                        <button class="bg-blue-600 px-8 rounded-md py-2 text-white" @click="submitForm()">{{btn_name}}</button>
                    </div>
                </div>

            </div>




            </div>

            

            <InfoCounterTopSinkForm v-if="data.category_name == 'Countertop Sinks'" :product_id="data.id" :showNotification="showNotification" :refreshData="refreshData" :closeModal="closeModal"/>            
            <InfoBathroomAccessoryForm v-if="data.category_name == 'Bathroom Accessory'" :product_id="data.id" :showNotification="showNotification" :refreshData="refreshData" :closeModal="closeModal"/>   
            <InfoBathroomDisabledForm v-if="data.category_name == 'Bath for the disabled'" :product_id="data.id" :showNotification="showNotification" :refreshData="refreshData" :closeModal="closeModal"/> 
            <InfoKitchenSinkForm v-if="data.category_name == 'Kitchen Sink'" :product_id="data.id" :showNotification="showNotification" :refreshData="refreshData" :closeModal="closeModal"/>
            <InfoMirrorForm v-if="data.category_name == 'Mirror'" :product_id="data.id" :showNotification="showNotification" :refreshData="refreshData" :closeModal="closeModal"/>   
            <InfoMirrorCabinetsForm v-if="data.category_name == 'Mirror Cabinet'" :product_id="data.id" :showNotification="showNotification" :refreshData="refreshData" :closeModal="closeModal"/>  
            <InfoMixerForm v-if="data.category_name == 'Mixer'" :product_id="data.id" :showNotification="showNotification" :refreshData="refreshData" :closeModal="closeModal"/>   
            <InfoShowerSystemForm v-if="data.category_name == 'Shower System'" :product_id="data.id" :showNotification="showNotification" :refreshData="refreshData" :closeModal="closeModal"/>  
            <InfoCabinetForm v-if="data.category_name == 'Cabinet'" :product_id="data.id" :showNotification="showNotification" :refreshData="refreshData" :closeModal="closeModal"/>  
            <InfoKitForm v-if="data.category_name == 'Kits'" :product_id="data.id" :showNotification="showNotification" :refreshData="refreshData" :closeModal="closeModal"/>  
    </div>
    
    
    
    </div>
    
    </div>
    
    </div>
        
    
    
        <!-- <PromptModal v-if="show_PromptModal" @close-modal="show_PromptModal = false" :refreshData="refreshData2" :prompt_data="prompt_data" :showNotification="showNotification" :closeSecondModal="closeModal"/>
        <LoadingView v-show="loadingViewShown"/> -->
    
    
    
    </template>
    
    <script>
    
    import axios from 'axios';
    import moment from 'moment';
    import InfoCounterTopSinkForm from '../Forms/InfoCounterTopSinkForm.vue';
    import InfoBathroomAccessoryForm from '../Forms/InfoBathroomAccessoryForm.vue';
    import InfoBathroomDisabledForm from '../Forms/InfoBathroomDisabledForm.vue';
    import InfoKitchenSinkForm from '../Forms/InfoKitchenSinkForm.vue';
    import InfoMirrorForm from '../Forms/InfoMirrorForm.vue';
    import InfoMirrorCabinetsForm from '../Forms/InfoMirrorCabinetsForm.vue';
    import InfoMixerForm from '../Forms/InfoMixerForm.vue';
    import InfoShowerSystemForm from '../Forms/InfoShowerSystemForm.vue';
    import InfoCabinetForm from '../Forms/InfoCabinetForm.vue';
    import InfoKitForm from '../Forms/InfoKitForm.vue';
    // import LoadingView from '../../views/LoadingView.vue';
    // import PromptModal from '../Modals/PromptModal.vue';
    
    
    export default{
    data(){
    return{
    
        action : '',
        btn_name : '',

        allsubimages : '',

        data_subimage : {
            product_id : null,
            file_name : null
        },

        data : {
            id : 0,
            name : '',
            sku : '',
            factory_part_num : '',
            category_id : 0,
            category_name : '',
            collection_id : 0,
            product_img : null,
            file_product_img : null,
            datetime_added : '',
            price : 0,
        },
    
        prompt_data : {
            data : '',
            action : '',
        },
        show_PromptModal : false,
    }
    },
    props: {
    getAllRecords : Function,
    item_data : Object, 
    showNotification : Function,
    refreshData : Function,
    },
    components: {
        // LoadingView,
        // PromptModal,
        InfoCounterTopSinkForm,
        InfoBathroomAccessoryForm,
        InfoBathroomDisabledForm,
        InfoKitchenSinkForm,
        InfoMirrorForm,
        InfoMirrorCabinetsForm,
        InfoMixerForm,
        InfoShowerSystemForm,
        InfoCabinetForm,
        InfoKitForm
    },
    methods: {
        refreshData2(){
            this.refreshData();
    
        },
        getSubImgUrl(imagePath) {
        return process.env.VUE_APP_BASE_URL + "/products_img/get_img/" + imagePath;
        },
        getImgUrl(imagePath) {
        return process.env.VUE_APP_BASE_URL + "/products/get_img/" + imagePath;
        },
        onFileChangeSubImage(e){
                var fileData =  e.target.files[0];
                if(fileData != '' || fileData != null){
                    var fileName = "";
                    var fileExt = "";
                    var fileArray = fileData.name.split(".");
                    
                    for(var i = 0; i < fileArray.length; i++){
    
                            if(i == fileArray.length - 2){
                            fileName += fileArray[i];
                            }
                            else{
                                fileName += fileArray[i] + "."; 
                            }
                            if(i == fileArray.length - 2) break;
    
                    }
    
                    fileExt = fileArray[fileArray.length - 1].toLowerCase().trim();
                    if(fileExt != "png" && fileExt != "jpg" && fileExt != "jpeg"){
                        this.showNotification(0,'Invalid file extension','Please upload only jpeg, png, and jpg files.');
                        this.$refs.upload_sub_img.value = null;
                    }
                    else{
                        if(fileExt == 'jpg' || fileExt == 'jpeg') fileExt = 'jpeg';
                        fileName = this.data.sku + "_" + this.data.factory_part_num + "_" + (this.allsubimages.length + 1);

                        const formdata = new FormData();
                        var file_input = document.getElementById('upload_sub_img').files[0];

                        this.data_subimage.product_id = this.data.id;
                        this.data_subimage.file_name = fileName + "."+ fileExt;

                        axios.post(process.env.VUE_APP_BASE_URL + '/products_img/add', this.data_subimage)
                            .then((res)=>{
                            
                                if(res.status == 201){

                                    formdata.append("file", file_input, this.data_subimage.file_name);

                                    axios.post(process.env.VUE_APP_BASE_URL + '/products_img/upload_img', formdata)
                                    .then((res)=>{
                                        console.log(res);
                                        this.data_subimage.file_name = null;
                                        this.$refs.upload_sub_img.value = null;
                                        this.getDataInfo();
                                        this.showNotification(1,'Success','Image Added to Gallery');
                                        
                                    });
                            
                                }
                                
                            })

                        
                    
                        

                        
                        
                      

    
                    }
                }
        },
        onFileChange(e){
                var fileData =  e.target.files[0];
                if(fileData != '' || fileData != null){
                    var fileName = "";
                    var fileExt = "";
                    var fileArray = fileData.name.split(".");
                    
                    for(var i = 0; i < fileArray.length; i++){
    
                            if(i == fileArray.length - 2){
                            fileName += fileArray[i];
                            }
                            else{
                                fileName += fileArray[i] + "."; 
                            }
                            if(i == fileArray.length - 2) break;
    
                    }
    
                    fileExt = fileArray[fileArray.length - 1].toLowerCase().trim();
                    if(fileExt != "png" && fileExt != "jpg" && fileExt != "jpeg"){
                        this.showNotification(0,'Invalid file extension','Please upload only jpeg, png, and jpg files.');
                        this.$refs.upload_file.value = null;
                    }
                    else{
                        if(fileExt == 'jpg' || fileExt == 'jpeg') fileExt = 'jpeg';
                        fileName = this.data.sku + "_" + this.data.factory_part_num;
                        this.data.product_img = fileName + "."+ fileExt;

                       

                        const formdata = new FormData();
                        var file_input = document.getElementById('upload_file').files[0];

                        this.$refs.view_img.src = URL.createObjectURL(file_input);
                        
                        formdata.append("file", file_input, this.data.product_img);
                        this.data.file_product_img = formdata;

    
                    }
                }
        },
        getDataInfo(){
            axios.get(process.env.VUE_APP_BASE_URL + '/products/find/' + this.data.id)
            .then((res)=>{
            
                if(res.status == 200){
    
                    this.data.name = res.data.name;
                    this.data.sku = res.data.sku;
                    this.data.factory_part_num = res.data.factory_part_num;
                    this.data.price = res.data.price;
                    this.data.product_img = res.data.product_img;
                    this.$refs.view_img.src = this.getImgUrl(res.data.product_img);


                    this.data.category_name = res.data.category_id.description;

                    this.data.category_id = res.data.category_id.id;
                    this.data.collection_id = res.data.collection_id.id;

                    this.allsubimages = res.data.sub_imgs;

                    
    
                }
                
            })
        },
        getCollections(){

        axios.get(process.env.VUE_APP_BASE_URL + '/collections/find_by_category/' + this.data.category_id)
        .then((res)=>{
        
            if(res.status == 200){

        
            this.allcollections = res.data;
            if(this.action == 'add') this.data.category_id = res.data[0].id;

            if(this.action == 'edit'){
                this.getDataInfo();
            }
            }
            
        })
        },
        getCategories(){
            axios.get(process.env.VUE_APP_BASE_URL + '/categories/get_all')
            .then((res)=>{
            
                if(res.status == 200){
            
                this.allcategories = res.data;
                if(this.action == 'add') this.data.category_id = res.data[0].id;
                
                if(this.action == 'edit'){
                    this.getCollections();
                }
                }
                
            })
        
        //
    },
    submitForm(){

        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const timestamp = date + ' ' + time;

        this.data.datetime_added = timestamp;

        var valid = true;

        if(this.data.name == ''){
            valid = false;
        }
        else if(this.data.sku == ''){
            valid = false;
        }
        else if(this.data.factory_part_num == ''){
            valid = false;
        }

        if(valid){

            if(this.action == 'add'){

                axios.post(process.env.VUE_APP_BASE_URL + '/products/add', this.data)
                .then((res)=>{
                
                    if(res.status == 201){

                        if(this.data.file_product_img){
                            
                            axios.post(process.env.VUE_APP_BASE_URL + '/products/upload_img', this.data.file_product_img)
                            .then((res)=>{
                                //
                            });
                        }

                        
                        this.showNotification(1,'Success','Product added to list');
                        this.refreshData();
                        this.closeModal();
                        // this.$router.push('/edit_product/' + this.data.article_num + '/' + this.data.factory_part_num);
                
                    }
                    
                })

            }
            else{

                axios.post(process.env.VUE_APP_BASE_URL + '/products/edit', this.data)
                .then((res)=>{
                
                    if(res.status == 201){

                        if(this.data.file_product_img){
                            
                            axios.post(process.env.VUE_APP_BASE_URL + '/products/upload_img', this.data.file_product_img)
                            .then((res)=>{
                                //
                            });
                        }

                        
                        this.showNotification(1,'Success','Product updated');
                        this.refreshData();
                        this.closeModal();
                        // this.$router.push('/edit_product/' + this.data.article_num + '/' + this.data.factory_part_num);
                
                    }
                    
                })


            }


            

        }


    },
    changeDateFormat(val){
        return moment(val).format('MMMM DD, YYYY h:mm a')
    },
    closeModal(){
        this.$emit('close-modal');
    }
    },
    watch: {
        item_data: {
            immediate:true,
            handler(val){
                this.action = val.action;
                this.title = 'Product Information';

                this.data.id = val.id;

                

                
    
                if(this.action == 'edit'){
                    this.btn_name = 'Edit';
                    this.getCategories();
                   
                    
                }
                else if(this.action == 'add'){
                    this.btn_name = 'Add';
                    this.getCategories();
                   
                    
                }
                
            },
        },
        
        }
        }
    </script>
    