<template>
  <div class="flex flex-col fixed bottom-20 right-0 space-y-4 bg-black-500 text-white py-8 px-4 cursor-pointer text-center z-10">
    <p class="cursor-pointer hover:text-primary-600 duration-300 hover:transform hover:scale-110" @click="scrollView('view_intro')">Продукт</p>
    <p class="cursor-pointer hover:text-primary-600 duration-300 hover:transform hover:scale-110" @click="scrollView('view_kit_composition')">Состав комплекта</p>
    <!-- <p class="cursor-pointer hover:text-primary-600 duration-300 hover:transform hover:scale-110" @click="scrollView('view_design')">Дизайн</p> -->
  </div>
</template>

<script>
export default{
data(){
return{
//
}
},
props: {
scrollView : Function,
},
}
</script>