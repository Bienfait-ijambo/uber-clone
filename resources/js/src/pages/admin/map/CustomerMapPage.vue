
<script setup>

import Leaflet from 'leaflet';
import { onMounted, ref } from 'vue';
import { useMapStore } from '../../../stores/map/map-store';

import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css"

const  map = ref(null)

const mapStore = useMapStore()

const {place:placeL,longitude:longitudeL,latitude:latitudeL}=mapStore.getCustomerLocationCoordinates()
const {place:placeD,longitude:longitudeD,latitude:latitudeD}=mapStore.getCustomerDestinationCoordinates()



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

    Leaflet.Routing.control({
  waypoints: [
        Leaflet.latLng(latitudeL, longitudeL),
        Leaflet.latLng(latitudeD, longitudeD)
  ],
  lineOptions: { styles: [{ color: "blue", weight: 5, opacity: 0.8 }] },
        routeWhileDragging: true,
 
}).addTo(map.value);

    
})

</script>
<template>
<div class="h-screen w-full">
    <div class="h-screen w-full" id="map"></div>
</div>
</template>