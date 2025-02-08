<script setup>
import Leaflet from "leaflet";
import { onMounted, ref, watch } from "vue";
import { useMapStore } from "../../../stores/map/map-store";

import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import animateMaker from "./marker.slideTo";
import { getNearestDriver } from "./detect-nearest-driver";

const map = ref(null);
const driverMarker = ref(null);
const circleDriverMarker = ref(null);

const mapStore = useMapStore();
const { customerTripData, driverLocationForCustomer } = storeToRefs(mapStore);

const router = useRouter();

function changeLocation() {
    router.push("/welcome");
}

onMounted(async () => {
    await mapStore.getCustomerTripData();
    await mapStore.getDriverLocationForCustomer();

    animateMaker(Leaflet);

    const nearestDriver = getNearestDriver(customerTripData.value, driverLocationForCustomer.value);
  

    map.value = Leaflet.map("map").setView(
        [
            customerTripData.value.location_latitude,
            customerTripData.value.location_longitude,
        ],
        20
    );
    Leaflet.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map.value);

    Leaflet.marker([
        customerTripData.value.location_latitude,
        customerTripData.value.location_longitude,
    ])
        .addTo(map.value)
        .bindPopup(customerTripData.value.location_address)
        .openPopup();

    Leaflet.marker([
        customerTripData.value.destination_latitude,
        customerTripData.value.destination_longitude,
    ])
        .addTo(map.value)
        .bindPopup(customerTripData.value.destination_address)
        .openPopup();

    Leaflet.Routing.control({
        waypoints: [
            Leaflet.latLng(
                customerTripData.value.location_latitude,
                customerTripData.value.location_longitude
            ),
            Leaflet.latLng(
                customerTripData.value.destination_latitude,
                customerTripData.value.destination_longitude
            ),
        ],
        lineOptions: { styles: [{ color: "blue", weight: 5, opacity: 0.8 }] },
        routeWhileDragging: true,
    }).addTo(map.value);

    driverLocationForCustomer.value.forEach((location) => {

      if(nearestDriver?.user_id===location?.user_id){

          //start circle code
          driverMarker.value = Leaflet.marker([
            parseFloat(location?.location_latitude),
            parseFloat(location?.location_longitude),
        ])
            .addTo(map.value)
            .bindPopup(
                `<img src="http://127.0.0.1:8000/img/logo.png" width="25"  alt="">
<b>Driver : ${location?.user_name}</b></br>` + location?.location_address
            )
            .openPopup();

        //  how to remove a marker based on id
        circleDriverMarker.value = Leaflet.circle(
            [
                parseFloat(location?.location_latitude),
                parseFloat(location?.location_longitude),
            ],
            {
                color: "red",
                fillColor: "#f03",
                fillOpacity: 0.5,
                radius: 500,
            }
        ).addTo(map.value);

      }else{
          //start circle code
      Leaflet.marker([
            parseFloat(location?.location_latitude),
            parseFloat(location?.location_longitude),
        ])
            .addTo(map.value)
            .bindPopup(
                `<img src="http://127.0.0.1:8000/img/logo.png" width="25"  alt="">
<b>Driver : ${location?.user_name}</b></br>` + location?.location_address
            )
            .openPopup();

        //  how to remove a marker based on id
       Leaflet.circle(
            [
                parseFloat(location?.location_latitude),
                parseFloat(location?.location_longitude),
            ],
            {
                color: "red",
                fillColor: "#f03",
                fillOpacity: 0.5,
                radius: 500,
            }
        ).addTo(map.value);
      }
      
    });

    //   location_latitude     | 34.95307000
    // location_longitude    | -120.43597000
      setTimeout(async ()=>{
      console.log('goo....')
          driverMarker.value.slideTo( [  customerTripData.value.location_latitude,
          customerTripData.value.location_longitude,], {
          duration: 10000,
        });
        circleDriverMarker.value.slideTo( [  customerTripData.value.location_latitude,
        customerTripData.value.location_longitude,], {
          duration: 10000,
        });

        //http req: trip started
      await  mapStore.tripStarted(customerTripData.value)
     },5000)

    //  destination_latitude  | 34.20261800
    // destination_longitude | -118.22693000
    //destination coordinates

     setTimeout(async()=>{
      console.log('goo....')
      driverMarker.value.slideTo( [ customerTripData.value.destination_latitude,
      customerTripData.value.destination_longitude], {
      duration: 10000,
    });
    circleDriverMarker.value.slideTo( [customerTripData.value.destination_latitude,
    customerTripData.value.destination_longitude], {
      duration: 10000,
    });
     //http req: trip completed
     await  mapStore.tripCompleted(customerTripData.value)
    },15000)
    console.log('this is  the nearest driver',nearestDriver)
});
</script>
<template>
    <div class="h-screen w-full">
        <div
            class="mt-5 right-4 absolute max-w-[400px] z-[10000] bg-white p-3 rounded-md shadow-lg"
        >
            <div class="flex flex-col mb-2">
                <div class="flex flex-col">
                    <div>
                        <span class="font-bold">Location</span> :
                        {{ customerTripData.location_address }}
                        <span class="font-bold">Destination</span> :
                        {{ customerTripData.destination_address }}
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
