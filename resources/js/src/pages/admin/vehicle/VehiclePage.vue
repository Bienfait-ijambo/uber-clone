<script setup>
import { onMounted } from "vue";
import VehicleTable from "./components/VehicleTable.vue";
import { useVehicleStore } from "../../../stores/vehicle/vehicle-store";
import { storeToRefs } from "pinia";
import VehicleModal from "./components/VehicleModal.vue";
const vehicleStore = useVehicleStore();
const { vehicleData,modalVal,edit,vehicleInput } = storeToRefs(vehicleStore);

function editVehicle(vehicle){
    vehicleInput.value=vehicle
    modalVal.value=true
    edit.value=true
}




onMounted(async () => {
    await vehicleStore.getVehicles();
});
</script>
<template>
    <div class="ml-4 mr-4">
        {{ vehicleData }}


        <h1 class="text-2xl mb-4">Taxies</h1>

        <VehicleModal @toggleModal="vehicleStore.toggleModal"   :show="modalVal"/>

        <VehicleTable
         @editVehicle="editVehicle" 
         @toggleModal="vehicleStore.toggleModal" 
         :vehicles="vehicleData" />
    </div>
</template>
<style scoped>
/* If you pagination doesnt looks good use this */
button.relative.inline-flex.items-center.px-4.py-2.text-sm.font-medium.border.focus\:z-20.bg-blue-50.border-blue-500.text-blue-600.z-30 {
    background: #4f46e5;
    color: white;
    /* border-radius: 5px; */
}
</style>
