
<script setup>
import Leaflet from "leaflet";
import { onMounted, ref } from "vue";
import { useMapStore } from "../../../stores/map/map-store";

import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import { storeToRefs } from "pinia";
import {  useRouter } from "vue-router";

const map = ref(null);

const mapStore = useMapStore();
const { driverLocation, customerLocationForDriver} = storeToRefs(mapStore);


const router=useRouter()

function changeLocation(){
router.push('/profile')
}

onMounted(async () => {
  await mapStore.getDriverLocation();
  await mapStore.getCustomerLocationForDriver()
 

  map.value = Leaflet.map("map").setView(
    [driverLocation.value.latitude, driverLocation.value.longitude],
    10
  );
  Leaflet.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map.value);

  Leaflet.marker([
    driverLocation.value.latitude,
    driverLocation.value.longitude,
  ])
    .addTo(map.value)
    .bindPopup(driverLocation.value.address)
    .openPopup();

    Leaflet.circle(
      [
        parseFloat(driverLocation.value.latitude),
        parseFloat(driverLocation.value.longitude),
      ],
      {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: 500,
      }
    ).addTo(map.value);

    

   

//customer location and destination
    customerLocationForDriver.value.forEach((location)=>{



  


        Leaflet.marker([
    location.location_latitude,
    location.location_longitude,
  ])
    .addTo(map.value)
    .bindPopup(location.location_address)
    .openPopup();

  Leaflet.marker([
  location.destination_latitude,
  location.destination_longitude,
  ])
    .addTo(map.value)
    .bindPopup(location.destination_address)
    .openPopup();

  Leaflet.Routing.control({
    waypoints: [
      Leaflet.latLng(
        location.location_latitude,
        location.location_longitude
      ),
      Leaflet.latLng(
        location.destination_latitude,
        location.destination_longitude
      ),
    ],
    lineOptions: { styles: [{ color: "blue", weight: 5, opacity: 0.8 }] },
    routeWhileDragging: true,
  }).addTo(map.value);


    })

});
</script>
<template>
  <div class="h-screen w-full">
    <div
      class="mt-5 right-4 absolute max-w-[400px] z-[1000] bg-white p-3 rounded-md shadow-lg"
    >
      <div class="flex flex-col mb-2">
        <div class="flex flex-col">
          <div>
            <span class="font-bold">Location</span> : {{ driverLocation.address }}
            
          </div>
        </div>
      </div>
      <button
    @click="changeLocation"
        class="flex justify-center font-semibold rounded-md bg-indigo-700 text-white px-2 py-2 w-[100%]"
      >
        <MapPinIcon class="pt-1" />
        <span class="">Change Location</span>
      </button>
    </div>
    <div class="h-screen w-full" id="map"></div>
  </div>
</template>