<template>
  <div class="sticky top-0 z-10 flex-shrink-0 flex flex-row h-auto bg-white shadow w-full items-center p-2">
    
    <div class="flex-none p-2 justify-center cursor-pointer" @click="this.$parent.openCloseSidebar">
      <img src="../../assets/menu.png" class="h-6 w-auto m-2"/>
    </div>
    
    <div class="flex-none p-2 justify-center ml-8 flex items-center border border-gray-300 rounded-md space-x-2">
      <img src="../../assets/icon_search.png" class="h-5 mx-4 w-auto flex-none"/>
      <input type="text" class="flex-auto h-4 border-none focus:outline-none focus:ring-0" placeholder="Search here.."/>  
    </div>

    <div class="flex-auto">

    </div>

    <div class="flex-none p-1 justify-center border border-gray-300 rounded-full flex items-center cursor-pointer hover:bg-gray-200 duration-300">
      <img src="../../assets/icon_profile.png" class="h-10 w-auto mr-2"/>
      <div class="mr-6 flex flex-col">
        <p class="font-bold text-sm">GAL GADOT</p>
        <span class="text-xs">ADMIN</span>
      </div>
      <img src="../../assets/icon_down.png" class="h-5 w-auto mr-2"/>
    </div>


  </div>
</template>

<script>
  import moment from 'moment';
  import axios from 'axios';
  import { inject, toRefs } from "vue";

  export default{
    data(){
      return{
        interval: null,
        time: null,
        profileDropdown : false,
        notifDropdown : false,
        sidebarOpen : true,
        dateTime : '',
        fullName : '',
        email : '',
        profilePic : '',
        allnotifications : '',
        cnt_unread : 0,
        search_nav : '',
        search_nav_list : [],
      }
    },
    mounted : function(){
      // this.getDateTime();
      // this.created();
      // this.getNotifications();
      // this.getUserInfo();
    },
    setup(props) {
      const { isSignIn } = toRefs(props);
      const Vue3GoogleOauth = inject("Vue3GoogleOauth");
      return {
        Vue3GoogleOauth,
        isSignIn,
      };
    },
    methods : {
      formatUserName(i){

      var result = '';

      if(i != null){

          result += i.fname;
          if(i.mname != null) result += ' ' + i.mname.substring(0,1) + '.';
          result += ' ' + i.lname;
          if(i.suffix != null) result += ' ' + i.suffix;
      }
      else{
          return '-';
      }


      return result;

      },
          created() {
          // update the time every second
          this.interval = setInterval(() => {
            // Concise way to format time according to system locale.
            // In my case this returns "3:48:00 am"
            this.time = Intl.DateTimeFormat(navigator.language, {
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric'
            }).format()
          }, 1000)
        },
          showProfileDropDown(){
            if(this.notifDropdown){
              this.notifDropdown = false;
              this.profileDropdown = true;
            }
            else if(this.profileDropdown){
              this.profileDropdown = false;
            }
            else{
              this.profileDropdown = true;
            }
          },
          showNotifDropDown(){
            if(this.profileDropdown){
              this.profileDropdown = false;
              this.notifDropdown = true;
            }
            else if(this.notifDropdown){
              this.notifDropdown = false;
              this.profileDropdown = false;
            }
            else{
              this.notifDropdown = true;
            }
          },
          openSidebar(){
            if(this.sidebarOpen){
              this.sidebarOpen = false;
            }
            else{
              this.sidebarOpen = true;
            }
            // alert(this.sidebarOpen);
          },
          getDateTime(){
            const today = new Date();
            const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
            const timestamp = date;

            this.dateTime = moment(String(timestamp)).format('MMMM DD, YYYY');

          },
          changeMiddleName(name){
            if(name != '') return name.charAt(0) + ".";
            else return name;
        },
          getNotifications(){
            axios.get(process.env.VUE_APP_BASE_URL + '/notifications/find_user/' + this.$store.state.user.id)
          .then((res)=>{
              if(res.status == 200){
                  
                  this.allnotifications = res.data;

                  for(var i = 0; i < this.allnotifications.length; i++){
                    if(this.allnotifications[i].hasRead == 0) this.cnt_unread++;
                  }
              }
              
          })    
          },
          changePage(link) {
            this.search_nav_list.splice(0);
            this.search_nav = '';
            this.$router.push(link);
          },
          getImgUrl(imagePath) {
            // return require('@/assets/' + imagePath);
            return process.env.VUE_APP_BASE_URL + "/user_menu/get_file/" + imagePath + "/png";
            // return require('../../assets/' + imagePath);
          },
          getListByClick(){
            this.search_nav_list.splice(0);
          

              axios.get(process.env.VUE_APP_BASE_URL + '/user_type_menu/get_list_click/' + this.$store.state.user.ut_id.id)
          .then((res)=>{
              if(res.status == 200){

                for(var i = 0; i < res.data.length; i++){
                  if(res.data[i].um_id.isTitle != 1){
                    this.search_nav_list.push({
                      id : res.data[i].id,
                      name : res.data[i].um_id.name,
                      profile_pic : res.data[i].um_id.profile_pic,
                      link : res.data[i].um_id.link,
                      description : res.data[i].um_id.description,
                      title : res.data[i].um_id.title,
                    });
                  }
                }

                  
                  

              }
              
          }) 

          },
          searchName(){

            this.search_nav_list.splice(0);

            if(this.search_nav != ''){
              axios.get(process.env.VUE_APP_BASE_URL + '/user_type_menu/search_nav/' + this.search_nav + '/' + this.$store.state.user.ut_id.id)
          .then((res)=>{
              if(res.status == 200){

                for(var i = 0; i < res.data.length; i++){
                  if(res.data[i].um_id.isTitle != 1){
                    this.search_nav_list.push({
                    id : res.data[i].id,
                    name : res.data[i].um_id.name,
                    profile_pic : res.data[i].um_id.profile_pic,
                    link : res.data[i].um_id.link,
                    description : res.data[i].um_id.description,
                    title : res.data[i].um_id.title,
                  });
                  }
                  
                }
                  
                  

              }
              
          }) 
            }
           
          },
          getUserInfo(){

          axios.get(process.env.VUE_APP_BASE_URL + '/user/find_user/' + this.$store.state.user.id)
          .then((res)=>{
              if(res.status == 200){
                  
                  this.profilePic = process.env.VUE_APP_BASE_URL + "/user/get_img/"+res.data.profile_pic+"/profile_pic";
                  this.fullName = res.data.lname + ", " + res.data.fname;
                  this.email = res.data.email;
              }
              
          })
          },
          getFromNow(value){
            
            return moment(value).fromNow();    

            },
          async logoutAccount(){
            this.$router.push('/login');
            // try {
            //   const loggedOut = await this.$gAuth.signOut();
            //   //console.log("isAuthorized", this.Vue3GoogleOauth.isAuthorized);
            //   //this.user = "";
            //   if(loggedOut){
            //     this.$router.push('/akred');
            //   }
              
            // } catch (error) {
            //   console.error(error);
            // }
            
          }
    }
  }
</script>s