<template>

    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        
    
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    
    <div class="fixed z-10 inset-0 w-auto h-auto">
    
        <div class="flex flex-col h-auto w-screen sm:w-1/2 overflow-y-auto lg:mx-auto fadeInSlide mt-20">
    
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


                <div class="flex-1 flex flex-col bg-white p-8 space-y-4">

                    <div class="flex flex-col space-y-4">
                        <img src="../../assets/icon_upload.png" class="flex-none h-20 w-20 max-h-96 max-w-96 object-cover rounded-xl" ref="view_img"/>
                        <input type="file" id="upload_file" ref="upload_file" @change="onFileChange($event)" class="w-full mx-auto text-gray-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-600 file:hover:bg-gray-700 file:text-white rounded" />
                    </div>

                    <div class="flex flex-col">
                        <label class="text-xs">Menu Type</label>
                        <select v-model="data.isTitle" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm p-4 w-1/4">
                            <option value="1">Parent Module</option>
                            <option value="0">Module</option>
                        </select>
                    </div>

                    <div>
                        <label class="text-xs">Menu Name</label>
                        <input type="text" v-model="data.name" rows="2" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm p-4 w-full"/>
                    </div>

                    <div>
                        <label class="text-xs">Title</label>
                        <input type="text" v-model="data.title" rows="2" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm p-4 w-full"/>
                    </div>

                    <div v-if="data.isTitle == 0">
                        <label class="text-xs">Link</label>
                        <input type="text" v-model="data.link" rows="2" class="rounded-lg border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200 font-bold text-sm p-4 w-full"/>
                    </div>

                
                  
                    

                    <div class="justify-end flex items-center h-20">
                        <button class="bg-blue-600 px-8 rounded-md py-2 text-white" @click="submitForm()">{{btn_name}}</button>
                    </div>
                </div>

            </div>




            </div>

            
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
    // import LoadingView from '../../views/LoadingView.vue';
    // import PromptModal from '../Modals/PromptModal.vue';
    
    
    export default{
    data(){
    return{
    
        action : '',
        btn_name : '',

        data : {
            id : 0,
            name : '',
            title : '',
            link : '',
            profile_pic : '',
            isTitle : 0,
            datetime_added : '',
            file_menu_img : null,
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
    },
    methods: {
        refreshData2(){
            this.refreshData();
    
        },
        getImgUrl(imagePath) {
        return process.env.VUE_APP_BASE_URL + "/user_menu/get_img/" + imagePath;
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
                        fileName = this.data.name;
                        this.data.profile_pic = fileName + "."+ fileExt;

                       

                        const formdata = new FormData();
                        var file_input = document.getElementById('upload_file').files[0];

                        this.$refs.view_img.src = URL.createObjectURL(file_input);
                        
                        formdata.append("file", file_input, this.data.profile_pic);
                        this.data.file_menu_img = formdata;

    
                    }
                }
        },
        getDataInfo(){
            axios.get(process.env.VUE_APP_BASE_URL + '/user_menu/find/' + this.data.id)
            .then((res)=>{
            
                if(res.status == 200){
    
                    this.data.name = res.data.name;
                    this.data.title = res.data.title;
                    this.data.link = res.data.link;
                    this.data.isTitle = res.data.isTitle;
                    this.$refs.view_img.src = this.getImgUrl(res.data.profile_pic);

                    
    
                }
                
            })
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
        else if(this.data.title == ''){
            valid = false;
        }

        if(valid){

            if(this.action == 'add'){

                axios.post(process.env.VUE_APP_BASE_URL + '/user_menu/add', this.data)
                .then((res)=>{
                
                    if(res.status == 201){

                        if(this.data.file_menu_img){
                            
                            axios.post(process.env.VUE_APP_BASE_URL + '/user_menu/upload_icon', this.data.file_menu_img)
                            .then((res)=>{
                                //
                            });
                        }

                        
                        this.showNotification(1,'Success','User Menu added to list');
                        this.refreshData();
                        this.closeModal();
                        // this.$router.push('/edit_product/' + this.data.article_num + '/' + this.data.factory_part_num);
                
                    }
                    
                })

            }
            else{

                axios.post(process.env.VUE_APP_BASE_URL + '/user_menu/edit', this.data)
                .then((res)=>{
                
                    if(res.status == 201){

                        if(this.data.file_menu_img){
                            
                            axios.post(process.env.VUE_APP_BASE_URL + '/user_menu/upload_icon', this.data.file_menu_img)
                            .then((res)=>{
                                //
                            });
                        }

                        
                        this.showNotification(1,'Success','User Menu updated');
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
                this.title = 'User Menu Information';

                this.data.id = val.id;
    
                if(this.action == 'edit'){
                    this.btn_name = 'Edit';
                    this.getDataInfo();
                   
                    
                }
                else if(this.action == 'add'){
                    this.btn_name = 'Add';
                   
                    
                }
                
            },
        },
        
        }
        }
    </script>
    