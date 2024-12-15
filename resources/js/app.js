import './bootstrap';


import { createApp } from 'vue';
import { router } from './src/router';
import App from './src/App.vue';
import { createPinia } from 'pinia';


const app=createApp(App)

const pinia=createPinia()

app.use(router)
app.use(pinia)
app.mount('#app')