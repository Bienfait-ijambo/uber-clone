import './bootstrap';


import { createApp } from 'vue';
import { router } from './src/router';
import App from './src/App.vue';
import { createPinia } from 'pinia';


const importIcons=import.meta.glob('./src/components/icons/**/*.vue')

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
registerComponents(app)
app.mount('#app')