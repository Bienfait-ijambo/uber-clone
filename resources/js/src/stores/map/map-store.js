import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

export const useMapStore = defineStore("map-store", () => {

const destination=ref('')
const location = ref('')


function getDestinationLongitudeAndLatitude(){
    const longitude=destination.value.properties?.coordinates?.longitude
    const latitude=destination.value.properties?.coordinates?.latitude
    return {longitude,latitude}


}

function getLocationLongitudeAndLatitude(){
    const longitude=destination.value.properties?.coordinates?.longitude
    const latitude=destination.value.properties?.coordinates?.latitude
    return {longitude,latitude}
}



    return {
       destination,
       location,
       getLocationLongitudeAndLatitude,
       getDestinationLongitudeAndLatitude
    
        
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMapStore, import.meta.hot));
}
