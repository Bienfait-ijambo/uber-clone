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
                <td class="border border-gray-300 py-2 px-4" >Actions</td>
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

                <td class="border 0 border-gray-300 px-2 ">
               
        <!-- <button  @click="emit('uploadImage', vehicle?.id)" class="border  border-gray-200 hover:bg-gray-300 rounded-sm px-2 py-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                        </svg>
        </button> -->
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


