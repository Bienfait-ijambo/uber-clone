<script setup>
import { onMounted, TrackOpTypes } from "vue";
import CustomerTable from "./components/CustomerTable.vue";
import { useMapStore } from "../../../stores/map/map-store";
import { storeToRefs } from "pinia";
import { getUserData } from "../../../helper/utils";
import { App } from "../../../api/api";
import { getData } from "../../../helper/http";
import { useRoute } from "vue-router";


const mapStore=useMapStore()
const userData=getUserData()
const userId=userData?.user?.id
const {allCustomerTripData}=storeToRefs(mapStore)



const route=useRoute()


function shouldRedirect(){

    setTimeout(()=> {

        if(typeof route.query?.redirect!=='undefined'){
            window.location.href='/app/customer_map'
        }
        
    },2000)
}

function viewCheckOutForm(trip_code){
    window.location.href=App.baseUrl+'/checkout_form?trip_code='+trip_code
}

onMounted(async () => {

    await mapStore.getAllCustomerTrips(userId)
    shouldRedirect()
});
</script>
<template>
    <div class="ml-4 mr-4">

       
        <h1 class="text-2xl mb-4">My Trips</h1>
        
        <CustomerTable @viewCheckOutForm="viewCheckOutForm" :customers="allCustomerTripData"/>

        
    </div>
</template>

