<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { App } from "../../../../api/api";
import { showError } from "../../../../helper/utils";
import { useUploadVehicleImageStore } from "../../../../stores/vehicle/upload-vehicle-image-store";

const uploadVehicleImageStore = useUploadVehicleImageStore();


const { uploadImageInput, loading,modalVal } = storeToRefs(uploadVehicleImageStore);

function selectImage(event) {
    const selectedImage = event.target.files[0];
    const output = document.querySelector("#outputImage");
    output.src = URL.createObjectURL(selectedImage);
    output.onload = function () {
        URL.revokeObjectURL(selectedImage);
    };
    uploadImageInput.value.image = selectedImage;
}

const props = defineProps(["show"]);
const emit=defineEmits(['getVehicles'])
async function uploadImage() {
    const payload = await uploadVehicleImageStore.uploadVehicleImage();
    loading.value = true;
    fetch(App.apiBaseUrl + "/vehicles/image", payload)
        .then((response) => response.json())
        .then(async(result) => {
            document.querySelector("#outputImage").src = "";
            document.querySelector('#imageInput').value=''
            
            loading.value = false;
            modalVal.value=false
           await emit('getVehicles')

        })
        .catch((error) => {
            showError(error?.message);
            loading.value = false;
        });
}
</script>
<template>
    <BaseModal :show="props.show">
        <template #title>
            <div class="text-2xl font-semibold">Upload Image</div>
        </template>
        <template #body>
            <img style="height: 150px" alt="image" id="outputImage" />
            <label for="">Select image</label>
            <input type="file" id="imageInput"  @change="selectImage" />
        </template>
        <template #footer>
            <button
                @click="modalVal=false"
                class="mb-2 text-gray-700 border border-indigo-700 py-2 px-2 rounded-md shadow-sm"
            >
                close
            </button>
            <button
                :disabled="loading"
                @click="uploadImage"
                class="mb-2 text-white border bg-indigo-700 py-2 px-2 rounded-md shadow-sm"
            >
                {{ loading ? "Uploading..." : "Upload" }}
            </button>
        </template>
    </BaseModal>
</template>
