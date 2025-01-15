<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { _debounce } from "../../../../helper/utils";
import { useVehicleStore } from "../../../../stores/vehicle/vehicle-store";

const showSuggestions = ref(false);
const vehicleStore = useVehicleStore();
const { places } = storeToRefs(vehicleStore);
const query = ref("");

const search = _debounce(async function () {
    await vehicleStore.getPlaces(query.value);
}, 1000);

function hideSuggestions() {
    setTimeout(() => (showSuggestions.value = false), 100);
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
                v-model="query"
                @keydown="search"
                @focus="showSuggestions = true"
                @blur="hideSuggestions"
                type="text"
                :placeholder="placeholder"
                class="mb-2 border  rounded-md focus:ring focus:ring-blue-200 py-2 px-6 w-[100%]"
            />
        </div>
        <ul
            v-show="showSuggestions"
            class="w-full z-10 rouned-md shadow-lg  bg-white boder border-gray-200 max-h-48 absolute overflow-y-auto"
        >
            <li
                v-for="place in places"
                :key="place?.properties"
                v-show="
                    place?.properties?.place_formatted === '' ? false : true
                "
                @click="emit('selectPlace',place)"
                class="flex py-4 px-2 hover:bg-blue-100 cursor-pointer"
            >
                <span>{{ place?.properties?.place_formatted }}</span>
            </li>
        </ul>
    </div>
</template>
