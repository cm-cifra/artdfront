import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './index.css';
import '@cyhnkckali/vue3-color-picker/dist/style.css'
import "vue3-colorpicker/style.css";
import 'primeicons/primeicons.css'
 
 
const app = createApp(App);
 
app
.use(store)
.use(router) 
.mount('#app')
