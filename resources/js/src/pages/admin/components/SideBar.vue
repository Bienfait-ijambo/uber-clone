
<script setup>
import { App } from '../../../api/api';
import ChevronIconLeft from '../../../components/icons/ChevronIconLeft.vue';
import HomeIcon from '../../../components/icons/HomeIcon.vue';
import PaymentIcon from '../../../components/icons/PaymentIcon.vue';
import LogoutIcon from '../../../components/icons/LogoutIcon.vue';
import CheveronIconRight from '../../../components/icons/CheveronIconRight.vue';
import { ref } from 'vue';


const toggleSideBar=ref(false)

function toggle(){
    toggleSideBar.value=!toggleSideBar.value
}
</script>
<template>
    <div class="h-screen">
            <nav :class="`h-full bg-slate-50 ${toggleSideBar ?'w-[210px]':''} `" >
                <div class="flex justify-between p-3">
                    <img v-show="toggleSideBar" :src="App.baseUrl+'/img/logo.png'" alt="logo"
                    class="w-10">
                    <button v-if="toggleSideBar" @click="toggle" class="hover:bg-slate-200 px-2 rounded-md " >
                        <ChevronIconLeft />
                    </button>
                    <button v-else @click="toggle" class="hover:bg-slate-200 px-2 py-2 rounded-md " >
                        <CheveronIconRight />
                    </button>
                </div>

                <ul class="flex flex-col p-2 gap-2">
                    <li class="flex bg-slate-200  gap-2 px-2 py-2  cursor-pointer    rounded-md">
                     <HomeIcon class="mt-1"/>
                      <span v-show="toggleSideBar">  Home</span>
                    </li>
                    <li class="flex hover:bg-slate-200 cursor-pointer  gap-2 px-2 py-2  rounded-md">
                     <PaymentIcon class="mt-1"/>
                        <span v-show="toggleSideBar">Payments</span>
                    </li>
                    <hr>
                    <li class="flex text-red-600 hover:bg-slate-200  cursor-pointer  gap-2 px-2 py-2  rounded-md">
                     <LogoutIcon class="mt-1"/>
                        <span v-show="toggleSideBar">Logout</span>
                    </li>

                </ul>

        
            </nav>
    </div>
</template>