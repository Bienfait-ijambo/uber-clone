<script setup>
import { ref } from "vue";
import { useVehicleStore } from "../../../../stores/vehicle/vehicle-store";
import { storeToRefs } from "pinia";

const vehicleStore = useVehicleStore();
const { vehicleValidation$, vehicleInput, loading,edit } = storeToRefs(vehicleStore);
const saveBtnLabel=ref(edit.value?'Update':'Save');
const props = defineProps(["show"]);
const emit = defineEmits(["toggleModal"]);
</script>
<template>
    <BaseModal :show="props.show">
        <template #title>
            <div class="text-2xl font-semibold">Create Vehicle</div>
        </template>
        <template #body>
            <InputError :errors="vehicleValidation$.name.$errors">
                <label for="Name">Name</label>
                <input
                    v-model="vehicleInput.name"
                    placeholder="Enter Name"
                    type="text"
                    class="mb-2 border rounded-md py-2 px-2 w-[100%]"
                />
            </InputError>
            <InputError :errors="vehicleValidation$.model.$errors">
                <label for="Model">Model</label>
                <input
                    v-model="vehicleInput.model"
                    placeholder=""
                    type="text"
                    class="mb-2 border rounded-md py-2 px-2 w-[100%]"
                />
            </InputError>

            <InputError :errors="vehicleValidation$.price.$errors">
                <label for="Model">Price /Km</label>
                <input
                    v-model="vehicleInput.price"
                    placeholder=""
                    type="text"
                    class="mb-2 border rounded-md py-2 px-2 w-[100%]"
                />
            </InputError>


            
          


            
          
        </template>
        <template #footer>
            <button
                @click="emit('toggleModal')"
                class="mb-2 text-gray-700 border border-indigo-700 py-2 px-2 rounded-md shadow-sm"
            >
                close
            </button>
            <button
                @click="vehicleStore.createOrUpdateVehicle"
                :disabled="loading"
                class="mb-2 text-white border bg-indigo-700 py-2 px-2 rounded-md shadow-sm"
            >
                {{ loading ? "saving..." : saveBtnLabel}}
            </button>
        </template>
    </BaseModal>
</template>
