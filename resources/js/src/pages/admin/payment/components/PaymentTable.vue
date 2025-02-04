   
<script setup>
const props = defineProps(["payments"]);

const emit = defineEmits(["refund"]);
</script>
<template>
    
   
    <table class="bg-white rounded-md w-full shadow-md border border-gray-300">
        <thead>
            <tr class="bg-gray-100 text-left">
                <td class="border border-gray-300 py-2 px-4">#</td>
                <td class="border border-gray-300 py-2 px-4">Customer-Name</td>
                <td class="border border-gray-300 py-2 px-4">Customer-Email</td>
                <td class="border border-gray-300 py-2 px-4">Location</td>
                <td class="border border-gray-300 py-2 px-4">Destination</td>
                <td class="border border-gray-300 py-2 px-4">Taxi</td>
                <td class="border border-gray-300 py-2 px-4">Model</td>

                <td class="border border-gray-300 py-2 px-4">Total-Price</td>
                <td class="border border-gray-300 py-2 px-4">Payment</td>
                <td class="border border-gray-300 py-2 px-4" >Actions</td>
            </tr>
        </thead>

        <tbody>
            <tr
                class="text-left"
               
            >
                <td class="border border-gray-300 py-2 px-4">
                </td>
                <td class="border border-gray-300 py-2 px-4">
                </td>
                <td class="border border-gray-300 py-2 px-4">
                </td>
                <td class="border border-gray-300 py-2 px-4">
                </td>
                <td class="border border-gray-300 py-2 px-4">
                </td>
                <td class="border border-gray-300 py-2 px-4">
                </td>
                <td class="border border-gray-300 py-2 px-4">
                </td>
                <td class="border border-gray-300 py-2 px-4">
                </td>
                <td class="border border-gray-300 py-2 px-4">
                 <span class="bg-green-300  px-2 py-1 text-green-800 font-semibold rounded-md"> Succeeded</span>
                </td>
              

                <td class=" flex gap-1 border 0 border-gray-300 py-2 px-4 p-2">

                   
                    <a
                        class="text-indigo-600 px-2 py-1 rounded-md border border-indigo-700 font-semibold hover:bg-indigo-500 hover:text-white"
                        href="#"
                        >Refund</a
                    >
                  
                </td>
            </tr>
        </tbody>
    </table>
</template>