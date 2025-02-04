<script setup>
import { onMounted } from "vue";
import PaymentTable from './components/PaymentTable.vue'
// import CustomerTable from "./components/CustomerTable.vue";
// import { useMapStore } from "../../../stores/map/map-store";
// import { storeToRefs } from "pinia";
// import { getUserData } from "../../../helper/utils";
// import { App } from "../../../api/api";
// import { getData } from "../../../helper/http";


// const mapStore=useMapStore()
// const userData=getUserData()
// const userId=userData?.user?.id
// const {allCustomerTripData}=storeToRefs(mapStore)


onMounted(async () => {
    // await mapStore.getAllCustomerTrips(userId)
    console.log('....')
});
</script>
<template>
    <div class="ml-4 mr-4">

       
        <h1 class="text-2xl mb-4">Payments</h1>
        
        <PaymentTable />

        
    </div>
</template>

