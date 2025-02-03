<script setup>
import { onMounted } from "vue";
import CustomerTable from "./components/CustomerTable.vue";
import { useMapStore } from "../../../stores/map/map-store";
import { storeToRefs } from "pinia";
import { getUserData } from "../../../helper/utils";
import { App } from "../../../api/api";


const mapStore=useMapStore()
const userData=getUserData()
const userId=userData?.user?.id
const {allCustomerTripData}=storeToRefs(mapStore)

function pay(stripe_price_id){
    window.location.href=App.baseUrl+'/checkout?stripe_price_id='+stripe_price_id
}
onMounted(async () => {
    await mapStore.getAllCustomerTrips(userId)
});
</script>
<template>
    <div class="ml-4 mr-4">

       
        <h1 class="text-2xl mb-4">My Trips</h1>
        
        <CustomerTable @pay="pay" :customers="allCustomerTripData"/>

        
    </div>
</template>

