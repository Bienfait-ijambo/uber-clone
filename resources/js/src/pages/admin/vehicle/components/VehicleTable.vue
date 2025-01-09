<script setup>
const props = defineProps(["vehicles"]);

const emit = defineEmits(["editVehicle", "uploadImage", "removeVehicle","toggleModal"]);
</script>
<template>
    
    <div class="flex justify-end p-2">
       
        <button @click="emit('toggleModal')"  class="text-white px-2 py-1 rounded-md border bg-indigo-700 font-semibold hover:bg-indigo-500 hover:text-white">Create</button>
    </div>
    <table class="bg-white rounded-md w-full shadow-md border border-gray-300">
        <thead>
            <tr class="bg-gray-100 text-left">
                <td class="border border-gray-300 py-2 px-4">#</td>
                <td class="border border-gray-300 py-2 px-4">Image</td>
                <td class="border border-gray-300 py-2 px-4">Name</td>
                <td class="border border-gray-300 py-2 px-4">Model</td>
                <td class="border border-gray-300 py-2 px-4">Price/Km</td>
                <td class="border border-gray-300 py-2 px-4">Upload-image</td>
                <td class="border border-gray-300 py-2 px-4">Actions</td>
            </tr>
        </thead>

        <tbody>
            <tr
                class="text-left"
                v-for="(vehicle, index) in vehicles"
                :key="vehicle?.id"
            >
                <td class="border border-gray-300 py-2 px-4">
                    {{ index + 1 }}
                </td>
                <td class="border border-gray-300 py-2 px-4">
                    <img :src="vehicle?.image" alt="vehicle" class="w-10" />
                </td>
                <td class="border border-gray-300 py-2 px-4">
                    {{ vehicle?.name }}
                </td>
                <td class="border border-gray-300 py-2 px-4">
                    {{ vehicle?.model }}
                </td>
                <td class="border border-gray-300 py-2 px-4">
                    {{ vehicle?.price }} $
                </td>

                <td class="border 0 border-gray-300 py-2 px-4">
                    <a
                        class="text-indigo-600 px-2 py-1 rounded-md border border-indigo-700 font-semibold hover:bg-indigo-500 hover:text-white"
                        @click="emit('uploadImage', vehicle?.id)"
                        href="#"
                        >Upload-Image</a
                    >
                </td>

                <td class=" flex gap-1 border 0 border-gray-300 py-2 px-4 p-2">

                   
                    <a
                        class="text-indigo-600 px-2 py-1 rounded-md border border-indigo-700 font-semibold hover:bg-indigo-500 hover:text-white"
                        @click="emit('editVehicle', vehicle)"
                        href="#"
                        >Edit</a
                    >
                    <a
                        class="text-gray-700 px-2 py-1 rounded-md border border-red-700 font-semibold hover:bg-red-500 hover:text-white"
                        href="#"
                        @click="emit('removeVehicle', vehicle?.id)"
                        >Delete</a
                    >
                </td>
            </tr>
        </tbody>
    </table>
</template>
