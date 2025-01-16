import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

export const useMapStore = defineStore("map-store", () => {

const destination=ref({})
const location = ref({})


function getLocationCoordinates(){
    const longitude=location.value.properties?.coordinates?.longitude
    const latitude=location.value.properties?.coordinates?.latitude
    const place=location.value.properties?.full_address 

    return {longitude,latitude,place}

}

function getDestinationCoordinates(){
    const longitude=destination.value.properties?.coordinates?.longitude
    const latitude=destination.value.properties?.coordinates?.latitude
    const place=destination.value.properties?.full_address 

    return {longitude,latitude,place}
}




    return {
       destination,
       location,
       getLocationCoordinates,
       getDestinationCoordinates
     
        
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMapStore, import.meta.hot));
}
