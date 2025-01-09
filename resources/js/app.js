import './bootstrap';


import { createApp } from 'vue';
import { router } from './src/router';
import App from './src/App.vue';
import { createPinia } from 'pinia';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';


const importIcons=import.meta.glob('./src/components/**/*.vue')

function registerComponents(app){
    for(const filePath of Object.keys(importIcons)){
        const componentName=filePath.split('/')?.pop()?.replace('.vue','')
       
        importIcons[filePath]().then(function(data){

            app.component(componentName,data?.default)
        }).catch((error)=>console.log(error?.message))
    }
}

const app=createApp(App)

const pinia=createPinia()


app.use(router)
app.use(pinia)
app.use(ToastPlugin)

registerComponents(app)
app.mount('#app')