<script setup>
import { onMounted } from "vue";
import VehicleTable from "./components/VehicleTable.vue";
import { useVehicleStore } from "../../../stores/vehicle/vehicle-store";
import { storeToRefs } from "pinia";
import VehicleModal from "./components/VehicleModal.vue";
import { confirmDelation } from "../../../helper/utils";
import UploadImageModal from "./components/UploadImageModal.vue";
import { useUploadVehicleImageStore } from "../../../stores/vehicle/upload-vehicle-image-store";
const vehicleStore = useVehicleStore();
const { vehicleData, modalVal, edit, vehicleInput } = storeToRefs(vehicleStore);

const uploadVehicleImageStore = useUploadVehicleImageStore();
const { modalVal: uploadImageVehicleModal, uploadImageInput } = storeToRefs(
    uploadVehicleImageStore
);

function editVehicle(vehicle) {
    vehicleInput.value = vehicle;
    modalVal.value = true;
    edit.value = true;
}

function removeVehicle(id) {
    confirmDelation().then(async () => {
        await vehicleStore.deleteVehicle(id);
        vehicleStore.getVehicles();
    });
}

function uploadImage(id) {
    // ...
    uploadImageInput.value.id = id;
    uploadImageVehicleModal.value = true;
}

onMounted(async () => {
    await vehicleStore.getVehicles();
});
</script>
<template>
    <div class="ml-4 mr-4">
        <h1 class="text-2xl mb-4">Taxies</h1>

        <UploadImageModal
            @getVehicles="vehicleStore.getVehicles()"
            :show="uploadImageVehicleModal"
        />
        <VehicleModal
            @toggleModal="vehicleStore.toggleModal"
            :show="modalVal"
        />

        <VehicleTable
            @removeVehicle="removeVehicle"
            @editVehicle="editVehicle"
            @toggleModal="vehicleStore.toggleModal"
            :vehicles="vehicleData"
            @uploadImage="uploadImage"
        />
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
