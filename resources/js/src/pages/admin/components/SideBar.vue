<script setup>
import { App } from "../../../api/api";
import { ref } from "vue";

const toggleSideBar = ref(false);
const topNavBarMenu = ref(false);


function toggleTopNavBar() {
    topNavBarMenu.value = !topNavBarMenu.value;
}

function toggle() {
    toggleSideBar.value = !toggleSideBar.value;
}
</script>
<template>
    <div class="h-screen flex flex-1">
        <nav
            :class="` h-full bg-slate-50 ${toggleSideBar ? 'w-[210px]' : ''} `"
        >
            <div class="flex justify-between p-3">
                <img
                    v-show="toggleSideBar"
                    :src="App.baseUrl + '/img/logo.png'"
                    alt="logo"
                    class="w-10"
                />
                <button
                    v-if="toggleSideBar"
                    @click="toggle"
                    class="hover:bg-slate-200 px-2 rounded-md"
                >
                    <ChevronIconLeft />
                </button>
                <button
                    v-else
                    @click="toggle"
                    class="hover:bg-slate-200 px-2 py-2 rounded-md"
                >
                    <CheveronIconRight />
                </button>
            </div>

            <ul class="flex flex-col p-2 gap-2">
                <li
                    class="flex bg-slate-200 gap-2 px-2 py-2 cursor-pointer rounded-md"
                >
                    <HomeIcon class="mt-1" />
                    <span v-show="toggleSideBar"> Home</span>
                </li>
                <li
                    class="flex hover:bg-slate-200 cursor-pointer gap-2 px-2 py-2 rounded-md"
                >
                    <PaymentIcon class="mt-1" />
                    <span v-show="toggleSideBar">Payments</span>
                </li>


                <li
                    class="flex hover:bg-slate-200 cursor-pointer gap-2 px-2 py-2 rounded-md"
                >
                    <UsersIcon class="mt-1" />
                    <span v-show="toggleSideBar">Users</span>
                </li>
              
                <hr />
                <li
                    class="flex text-red-600 hover:bg-slate-200 cursor-pointer gap-2 px-2 py-2 rounded-md"
                >
                    <LogoutIcon class="mt-1" />
                    <span v-show="toggleSideBar">Logout</span>
                </li>
            </ul>
        </nav>

       <!-- main section  -->

       <div class="bg-slate-200 w-full">
        <div class="flex justify-between">
            <div></div>
            <div class="py-3 px-3">
                <img  @click="toggleTopNavBar" :src="App.baseUrl+'/img/avatar.webp'"
                 alt="logo" class="rounded-full  border-2 hover:border-white w-10 h-10 cursor-pointer ">
                 <ul v-show="topNavBarMenu"  class="bg-white w-[250px] absolute right-4 py-3 px-3 rounded-md shadow-lg divide-y divide-gray-200">
                    <li class="py-2 px-2">Ben
                        <br>
                        <a class="text-indigo-700" href="">ben@gmail.com</a>
                    </li>
                    
                    <li  class="py-2 px-2 hover:bg-gray-100 rounded-md cursor-pointer  text-red-600 font-semibold">
                       Logout
                    </li>
                 </ul>
            </div>
        </div>


        <div class="flex p-10">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias rem nesciunt assumenda quis deleniti distinctio necessitatibus quibusdam iure nemo eum accusantium neque, soluta tempora commodi vel ullam pariatur ea cupiditate.
            </p>
        </div>
       </div>
       <!-- main section  -->


       
    </div>
</template>
