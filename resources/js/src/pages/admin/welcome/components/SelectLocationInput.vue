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
const {queryLocation,showSuggestionsLocation}=storeToRefs(autoCompleteStore);


const search = _debounce(async function () {
    await vehicleStore.getPlaces(queryLocation.value);
}, 1000);

function hideSuggestions() {
    setTimeout(() => (showSuggestionsLocation.value = false), 100);
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
                v-model="queryLocation"
                @keydown="search"
                @focus="showSuggestionsLocation = true"
                type="text"
                :placeholder="placeholder"
                class="mb-2 border  rounded-md focus:ring focus:ring-blue-200 py-2 px-6 w-[100%]"
            />
            <span class="absolute top-3 right-4" v-show="loading">
                <img :src="App.baseUrl+'/img/spinner.gif'" width="30" alt="">
            </span>
        </div>
        <ul
            v-show="showSuggestionsLocation"
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
