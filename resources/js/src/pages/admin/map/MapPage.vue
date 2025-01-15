

<script setup>

import Leaflet from 'leaflet';
import { onMounted, ref } from 'vue';
import { useMapStore } from '../../../stores/map/map-store';


const  map = ref(null)


const mapStore=useMapStore()
const {location,destination}=storeToRefs(mapStore)
const {latitudeLocation,longitudeLocation}=mapStore.getLocationLongitudeAndLatitude()
const {latitudeDestination,longitudeDestination}=mapStore.getDestinationLongitudeAndLatitude()




onMounted(()=>{

    map.value=Leaflet.map('map').setView([latitudeLocation, longitudeLocation], 20);

    Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map.value);

Leaflet.marker([latitudeDestination, longitudeDestination]).addTo(map.value)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    .openPopup();

})




</script>
<template>
<div class="h-screen w-full">

    <div class="h-screen w-full" id="map"></div>
</div>
</template>