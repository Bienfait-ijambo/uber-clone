import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

export const useMapStore = defineStore("map-store", () => {

const customerDestination=ref({})
const customerLocation = ref({})
const driverLocation=ref({})


function getDriverLocationCoordinates(){
    const longitude=driverLocation.value.properties?.coordinates?.longitude
    const latitude=driverLocation.value.properties?.coordinates?.latitude
    const place=driverLocation.value.properties?.full_address 

    return {longitude,latitude,place}

}


function getCustomerLocationCoordinates(){
    const longitude=customerLocation.value.properties?.coordinates?.longitude
    const latitude=customerLocation.value.properties?.coordinates?.latitude
    const place=customerLocation.value.properties?.full_address 

    return {longitude,latitude,place}

}

function getCustomerDestinationCoordinates(){
    const longitude=customerDestination.value.properties?.coordinates?.longitude
    const latitude=customerDestination.value.properties?.coordinates?.latitude
    const place=customerDestination.value.properties?.full_address 

    return {longitude,latitude,place}
}




    return {
       customerDestination,
       customerLocation,
       getCustomerLocationCoordinates,
       getCustomerDestinationCoordinates,
       getDriverLocationCoordinates,
       driverLocation
     
        
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMapStore, import.meta.hot));
}
