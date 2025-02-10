<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { App } from "../../../api/api";
import { useVehicleStore } from "../../../stores/vehicle/vehicle-store";
import VehicleList from "./components/VehicleList.vue";
import { useMapStore } from "../../../stores/map/map-store";
import SelectDestinationInput from "./components/SelectDestinationInput.vue";
import SelectLocationInput from "./components/SelectLocationInput.vue";
import { useAutoCompleteStore } from "../../../stores/vehicle/auto-complete-store";
import { useRouter } from "vue-router";
import { hideBookButton } from "../../../middleware/hideBookButton";
import { showError } from "../../../helper/utils";

const vehicleStore = useVehicleStore();

const { vehicleData } = storeToRefs(vehicleStore);
const mapStore = useMapStore();
const { customerLocation, customerDestination,vehicleId} = storeToRefs(mapStore);

const autoCompleteStore = useAutoCompleteStore();
const {
    showSuggestionsDestination,
    queryDestination,
    queryLocation,
    showSuggestionsLocation,
} = storeToRefs(autoCompleteStore);

function selectLocation(place) {
    customerLocation.value = place;
    showSuggestionsLocation.value = false;
    queryLocation.value = place?.properties?.full_address;
}
function selectDestination(place) {
    customerDestination.value = place;
    showSuggestionsDestination.value = false;
    queryDestination.value = place?.properties?.full_address;
}
const router = useRouter();

async function bookTaxi() {
    const data=await mapStore.validateBookTaxiForm()
    if(data===true){
       await mapStore.storeCustomerLocation()
       customerLocation.value={}
       customerDestination.value={}
       vehicleId.value=null
        
        // router.push("/customer_map");
        router.push("/trips");
    }
}


function selectVehicleId(event){
    const val=event.target.value;
    vehicleId.value = val;

}

const _hideBookButton=ref(hideBookButton())



onMounted(async () => {
    await vehicleStore.getVehicles();
});
</script>
<template>
    <div class="bg-white  flex flex-col p-2">
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
                    @change="selectVehicleId"
                        name=""
                        id=""
                        class="mb-2 border rounded-md py-2 px-2 w-[100%]"
                    >
                        <option value="">Select Taxi</option>
                        <option
                            v-for="vehicle in vehicleData"
                            :key="vehicle.id"
                            :value="vehicle.id"
                        >
                            {{ vehicle.name }} - {{ vehicle?.model }}
                        </option>
                    </select>
                    <div class="flex">
                        <SelectLocationInput
                            @selectPlace="selectLocation"
                            :placeholder="'Search location'"
                        />
                        <SelectDestinationInput
                            @selectPlace="selectDestination"
                            :placeholder="'Search destination'"
                        />
                    </div>
                </div>
                <button

                v-show="_hideBookButton"
                    @click="bookTaxi"
                    class="flex justify-center font-semibold rounded-md bg-indigo-700 text-white px-2 py-2 w-[100%]"
                >
                    <span class="">Book taxi now</span>
                    <ArrowRightIcon class="pt-1" />
                </button>
            </div>
        </div>

        <div
            class="grid   grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-[50px]"
        >
            <VehicleList :hideBookButton="_hideBookButton" :vehicles="vehicleData" />
        </div>
    </div>
</template>
