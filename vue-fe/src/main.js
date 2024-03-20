import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from "./js/routes/index.js";
import './css/index.css'
import App from './App.vue'

let app = createApp(App);
let pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount('#app');
