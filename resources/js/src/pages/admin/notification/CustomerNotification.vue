<script setup>
import { onMounted } from "vue";
import CustomerTable from "./components/CustomerTable.vue";
import { useMapStore } from "../../../stores/map/map-store";
import { storeToRefs } from "pinia";


const mapStore=useMapStore()
const {customerLocationForDriver}=storeToRefs(mapStore)
onMounted(async () => {
    await mapStore.getCustomerLocationForDriver()
});
</script>
<template>
    <div class="ml-4 mr-4">

       
        <h1 class="text-2xl mb-4">Customers</h1>
        
        <CustomerTable :customers="customerLocationForDriver"/>

        
    </div>
</template>

