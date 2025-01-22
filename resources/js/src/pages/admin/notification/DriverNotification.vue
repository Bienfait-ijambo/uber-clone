<script setup>
import { onMounted } from "vue";
import DriverTable from "./components/DriverTable.vue";
import { useMapStore } from "../../../stores/map/map-store";
import { storeToRefs } from "pinia";

const mapStore=useMapStore()

const {driverLocationForCustomer}=storeToRefs(mapStore)

onMounted(async () => {

   await mapStore.getDriverLocationForCustomer()
});
</script>
<template>
    <div class="ml-4 mr-4">

       
        <h1 class="text-2xl mb-4">Drivers</h1>
        
        <DriverTable :drivers="driverLocationForCustomer"/>

        
    </div>
</template>

