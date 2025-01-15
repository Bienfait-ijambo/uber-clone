<script setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { App } from "../../../api/api";
import { useVehicleStore } from "../../../stores/vehicle/vehicle-store";
import AutocompleteInput from "./components/AutoCompleteInput.vue";
import VehicleList from './components/VehicleList.vue'
import { useMapStore } from "../../../stores/map/map-store";

const vehicleStore=useVehicleStore()

const {vehicleData}=storeToRefs(vehicleStore)
const mapStore=useMapStore()
const {location,destination}=storeToRefs(mapStore)

function selectLocation(place){
location.value =  place
}
function selectDestination(place){
    destination.value =  place

}



onMounted(async()=>{
   await vehicleStore.getVehicles()
})

</script>
<template>
    <div class="bg-white flex flex-col p-2 mb-10">
        <div class="flex">
            <div class="mr-20">
                <img :src="App.baseUrl + '/taxi/cab-booking.png'" alt="" />
            </div>
            <div class="ml-20">
                <h1 class="text-2xl mb-10 mt-10 font-semibold">
                    Trust the leading and the most reliable <br />
                    US taxi operator.
                </h1>
                <div class="flex flex-col mb-2">
                    <select
                        name=""
                        id=""
                        class="mb-2 border rounded-md py-2 px-2 w-[100%]"
                    >
                        <option value="">Select Taxi</option>
                        <option v-for="vehicle in vehicleData"
                        :key="vehicle.id" :value="vehicle.id">{{vehicle.name}} - {{ vehicle?.model }}</option>
                    </select>
                    <div class="flex">
                        <AutocompleteInput @selectPlace="selectLocation"  :placeholder="'Search location'" />
                        <AutocompleteInput @selectPlace="selectDestination"     :placeholder="'Search destination'"/>
                    </div>
                </div>
                <button
                    class="flex justify-center font-semibold rounded-md bg-indigo-700 text-white px-2 py-2 w-[100%]"
                >
                    <span class="">Book taxi now</span>
                    <ArrowRightIcon class="pt-1" />
                </button>
            </div>
        </div>

        <div
            class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-[100px]"
        >

        <VehicleList :vehicles="vehicleData"/>
          
        </div>
    </div>
</template>
