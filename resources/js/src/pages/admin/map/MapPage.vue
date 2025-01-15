

<script setup>

import Leaflet from 'leaflet';
import { onMounted, ref } from 'vue';
import { useMapStore } from '../../../stores/map/map-store';

const  map = ref(null)

const mapStore = useMapStore()

const {place:placeL,longitude:longitudeL,latitude:latitudeL}=mapStore.getLocationCoordinates()
const {place:placeD,longitude:longitudeD,latitude:latitudeD}=mapStore.getDestinationCoordinates()



onMounted(()=>{

    map.value=Leaflet.map('map').setView([latitudeL, longitudeL], 20);
    Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map.value);

Leaflet.marker([latitudeL, longitudeL]).addTo(map.value)
    .bindPopup(placeL)
    .openPopup();

    Leaflet.marker([latitudeD, longitudeD]).addTo(map.value)
    .bindPopup(placeD)
    .openPopup();
    

 
   

})




</script>
<template>
<div class="h-screen w-full">
    {{ longitudeD }} {{ placeD }}
    <div class="h-screen w-full" id="map"></div>
</div>
</template>