<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { _debounce } from "../../../../helper/utils";
import { useVehicleStore } from "../../../../stores/vehicle/vehicle-store";
import { useAutoCompleteStore } from "../../../../stores/vehicle/auto-complete-store";
import { App } from "../../../../api/api";

const vehicleStore = useVehicleStore();
const { places,loading } = storeToRefs(vehicleStore);
const autoCompleteStore=useAutoCompleteStore()
const {queryDestination,showSuggestionsDestination}=storeToRefs(autoCompleteStore);

const search = _debounce(async function () {
    await vehicleStore.getPlaces(queryDestination.value);
}, 1000);

function hideSuggestions() {
    setTimeout(() => (showSuggestionsDestination.value = false), 100);
}

const props = defineProps(["placeholder"]);
const emit=defineEmits(['selectPlace'])


</script>
<template>
    <div class="relative w-full max-w-sm">
      
     
        <div class="relative">
            <span class="absolute top-3 left-1">
                <MapPinIcon />
            </span>
            <input
                v-model="queryDestination"
                @keydown="search"
                @focus="showSuggestionsDestination = true"
                
                type="text"
                :placeholder="placeholder"
                class="mb-2 border  rounded-md focus:ring focus:ring-blue-200 py-2 px-6 w-[100%]"
            />

            <span class="absolute top-3 right-4" v-show="loading">
                <img :src="App.baseUrl+'/img/spinner.gif'" width="30" alt="">
            </span>
            
        </div>
        <ul
            v-show="showSuggestionsDestination"
            class="w-full z-10 rouned-md shadow-lg  bg-white boder border-gray-200 max-h-48 absolute overflow-y-auto"
        >
            <li
                v-for="place in places"
                :key="place?.properties"
                v-show="
                    place?.properties?.full_address === '' ? false : true
                "
                @click="emit('selectPlace',place)"
                class="flex py-4 px-2 hover:bg-blue-100 cursor-pointer"
            >
                <span>{{ place?.properties?.full_address }}</span>
            </li>
        </ul>
    </div>
</template>
<style scoped>
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-top: 2px solid #000;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}


</style>
