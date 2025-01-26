<script setup>
import { App } from "../../../api/api";
import { ref } from "vue";
import { getUserData } from "../../../helper/utils";
import { useLoginStore } from "../../../stores/auth/login-store";
import { ADMIN_ROLE, CUSTOMER_ROLE, DRIVER_ROLE } from "../../../constants/roles";
import { useRouter } from "vue-router";
import { useMapStore } from "../../../stores/map/map-store";
import { storeToRefs } from "pinia";

const toggleSideBar = ref(false);
const topNavBarMenu = ref(false);
const mapStore=useMapStore()
const {notificationVal}=storeToRefs(mapStore)

const loginStore = useLoginStore();
function toggleTopNavBar() {
  topNavBarMenu.value = !topNavBarMenu.value;
}

function toggle() {
  toggleSideBar.value = !toggleSideBar.value;
}
const userData = getUserData();


const router=useRouter()

function displayNotificationPage(){
  const role=userData?.user?.role

  if(role===DRIVER_ROLE){
    notificationVal.value=0
router.push('/customer_notifications')
  }

  if(role===CUSTOMER_ROLE){
    notificationVal.value=0

router.push('/driver_notifications')
  }
}
</script>
<template>
  <div class="h-screen flex flex-1">
    <nav :class="`h-full bg-slate-50 ${toggleSideBar ? 'w-[210px]' : ''} `">
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
        <Router-link
          to="welcome"
          class="flex hover:bg-slate-200 cursor-pointer gap-2 px-2 py-2 rounded-md"
        >
          <HomeIcon class="mt-1" />
          <span v-show="toggleSideBar"> Home</span>
        </Router-link>

        <Router-link
          to="trips"
           v-show="userData?.user?.role === CUSTOMER_ROLE"
          class="flex hover:bg-slate-200 cursor-pointer gap-2 px-2 py-2 rounded-md"
        >
          <TripIcon class="mt-1" />
          <span v-show="toggleSideBar">Trips</span>
        </Router-link>

        <Router-link
          to="payments"
          class="flex hover:bg-slate-200 cursor-pointer gap-2 px-2 py-2 rounded-md"
        >
          <PaymentIcon class="mt-1" />
          <span v-show="toggleSideBar">Payments</span>
        </Router-link>

        <Router-link
          class="flex hover:bg-slate-200 cursor-pointer gap-2 px-2 py-2 rounded-md"
          to="vehicles"
        >
          <TruckIcon class="mt-1" />
          <span v-show="toggleSideBar" class="ml-2">Vehicles</span>
        </Router-link>

        <Router-link
          v-show="userData?.user?.role === ADMIN_ROLE"
          class="flex hover:bg-slate-200 cursor-pointer gap-2 px-2 py-2 rounded-md"
          to="users"
        >
          <UsersIcon class="mt-1" />
          <span v-show="toggleSideBar" class="ml-2">Users</span>
        </Router-link>

        <hr />
        <li
          @click="loginStore.logout"
          class="flex text-red-600 hover:bg-slate-200 cursor-pointer gap-2 px-2 py-2 rounded-md"
        >
          <LogoutIcon class="mt-1" />
          <span v-show="toggleSideBar">Logout</span>
        </li>
      </ul>
    </nav>

    <!-- main section  -->

    <div class="w-full">
      <div class="flex justify-end">
        <div></div>
        <div class="py-3 px-3">
          <button @click="displayNotificationPage" class="relative inline-flex items-center justify-center p-2 bg-slate-200  rounded-full">
            <NotificationIcon class="w-6 h-6" />
  <span class="absolute top-0 left-8 px-2 text-white font-semibold block  rounded-full bg-red-500">{{notificationVal}}</span>
  
</button>

        </div>
        <div class="py-3 px-3">
          <img
            @click="toggleTopNavBar"
            :src="App.baseUrl + '/img/avatar.webp'"
            alt="logo"
            class="rounded-full border-2 hover:border-white w-10 h-10 cursor-pointer"
          />
          <ul
            v-show="topNavBarMenu"
            class="bg-white z-[100000] w-[250px] absolute right-4 py-3 px-3 rounded-md shadow-lg divide-y divide-gray-200"
          >
            <li class="py-2 px-2">
              {{ userData?.user?.name }}
              <br />
              <a class="text-indigo-700" href="">{{ userData?.user?.email }}</a>
              <br />
              Role : {{ userData?.user?.role }}
              <br class="mb-2" />

              <Router-link
                class="text-indigo-700 underline font-semibold"
                to="profile"
              >
                Profile
              </Router-link>
            </li>

            <li
              @click="loginStore.logout"
              class="py-2 px-2 hover:bg-gray-100 rounded-md cursor-pointer text-red-600 font-semibold"
            >
              Logout
            </li>
          </ul>
        </div>
      </div>

      <slot name="main"></slot>
    </div>
    <!-- main section  -->
  </div>
</template>


<style scoped>
.router-link-exact-active:hover{
  color:rgb(31, 30, 30)
}
.router-link-exact-active{
    --tw-bg-opacity: 1;
    background-color: rgb(67 56 202 / var(--tw-bg-opacity, 1)) /* #4338ca */;
    font-weight: 600;
    padding-top: 0.5rem /* 8px */;
    padding-bottom: 0.5rem /* 8px */;
    padding-left: 0.5rem /* 8px */;
    padding-right: 0.5rem /* 8px */;
    border-radius: 0.375rem /* 6px */;
    color:white;
    cursor: pointer;
}
</style>