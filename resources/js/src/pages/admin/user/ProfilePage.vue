<script setup>
import { storeToRefs } from 'pinia';
import { ADMIN_ROLE, CUSTOMER_ROLE } from '../../../constants/roles';
import { getUserData } from '../../../helper/utils';
import { useProfileStore } from '../../../stores/user/profile-store';
import { onMounted, ref } from 'vue';
import SelectDriverLocation from './components/SelectDriverLocation.vue';
import { useMapStore } from '../../../stores/map/map-store';
import { useRouter } from 'vue-router';
import { useAutoCompleteStore } from '../../../stores/vehicle/auto-complete-store';

const userData=getUserData()

function showDriverStatus(){
    const role=userData?.user?.role

    if(role===ADMIN_ROLE||role===CUSTOMER_ROLE) return false
    return true
}

const profileStore=useProfileStore()
const {loading,driverStatus}=storeToRefs(profileStore)
const status=ref(null)

async function saveDriverStatus(){
    const userId=userData?.user?.id
 await  profileStore.modifyDriverStatus({user_id:userId,status:status.value})

}

function getStatusVal(event){
    const val=event.target.value
    status.value=val
}


const mapStore = useMapStore();
const { driverLocation } = storeToRefs(mapStore);

const autoCompleteStore = useAutoCompleteStore();
const {
   
    queryLocation,
    showSuggestionsLocation,
} = storeToRefs(autoCompleteStore);

function selectLocation(place) {
    driverLocation.value = place;
    showSuggestionsLocation.value = false;
    queryLocation.value = place?.properties?.full_address;
}


const router = useRouter();

async function plotDriverLocationOnMap() {

    await mapStore.storeDriverLocation()

    router.push("/driver_map");
}


onMounted(()=>{
    console.log('data :', userData?.user.email)
})
</script>
<template>
    <div class="h-screen w-full bg-white">
        <div class="flex flex-col ml-14">
            <div></div>
            <div></div>

            <div>
                <h1 class="text-2xl mb-10 mt-10 font-semibold">Profile</h1>

                <div class="flex flex-col gap-4 text-gray-700 mb-4">
                  <span>Name : {{userData?.user?.name}}</span>
                  <span>E-mail : <a href="" class="text-indigo-700 font-semibold">
                    {{userData?.user?.email}}
                  </a> </span>
                  <span>Role : {{userData?.user?.role}}</span>
                  
                  <div v-show="showDriverStatus()">Status : {{ userData?.driverStatus }} <span class="text-gray-800 font-bold py-1 px-2 rounded-md"></span></div>

                </div>
                <hr v-show="showDriverStatus()" class="w-[25%]  py-2">

                <div v-show="showDriverStatus()" class="mb-3">
                    <select
                    class="w-[25%] focus:ring focus:ring-blue-300 mb-3 border rounded-md py-2 px-2"
                @change="getStatusVal"
                >
                    <option value="">Status</option>
                    <option v-for="status in driverStatus"
                     :key="status.value" 
                     :value="status.value"
                     >{{status?.name}}</option>
                </select>

                <button
                :disabled="loading"
                @click="saveDriverStatus"
                    class="flex justify-center text-white bg-indigo-700 font-semibold rounded-lg px-4 py-2"
                >
                    <span>{{loading?'saving...':'Change Status'}}</span>
                </button>
                </div>



                <!-- change driver location  -->
                <div v-show="showDriverStatus()">
                    <SelectDriverLocation @selectPlace="selectLocation" :placeholder="'Type Location'"/>

                <button
                @click="plotDriverLocationOnMap"
                    class="flex justify-center text-white bg-indigo-700 font-semibold rounded-lg px-4 py-2"
                >
                    <span>Change Location</span>
                </button>
                </div>
                 <!-- end change driver location -->
            </div>
        </div>
    </div>
</template>