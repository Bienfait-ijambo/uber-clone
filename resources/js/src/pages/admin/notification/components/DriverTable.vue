<script setup>
import {getDriverStatusName} from '../../../../constants/driver-status'
const props = defineProps(["drivers"]);



</script>
<template>
 

    <table class="bg-white rounded-md w-full shadow-md border border-gray-300">
        <thead>
            <tr class="bg-gray-100 text-left">
                <td class="border border-gray-300 py-2 px-4">#</td>
                <td class="border border-gray-300 py-2 px-4">Name</td>
                <td class="border border-gray-300 py-2 px-4">Location</td>
                <td class="border border-gray-300 py-2 px-4">Latitude</td>
                <td class="border border-gray-300 py-2 px-4">Longetutde</td>
                <td class="border border-gray-300 py-2 px-4">Status</td>

                <td class="border border-gray-300 py-2 px-4">Actions</td>
            </tr>
        </thead>
        <!-- "user_id": 8,
        "user_name": "Alice",
        "location_address": "Goleta, California, United States",
        "location_latitude": "34.43601200",
        "location_longitude": "-119.82932000",
        "status": 1 -->
        <tbody>
            <tr
            v-for="(driver,index) in drivers"
            :key="driver.user_id"
              
            >
                <td class="border border-gray-300 py-2 px-4">
                    {{ index+1 }}
                </td>
                
                <td class="border border-gray-300 py-2 px-4">
                    {{ driver?.user_name }}
                </td>
                <td class="border border-gray-300 py-2 px-4">
                    {{ driver?.location_address }}

                </td>
                
                <td class="border border-gray-300 py-2 px-4">
                    {{ driver?.location_latitude }}
                </td>
                <td class="border border-gray-300 py-2 px-4">
                    {{ driver?.location_longitude }}
                </td>
                <td class="border border-gray-300 py-2 px-4">
<span class="bg-yellow-400 px-2 py-1 rounded-md">{{ getDriverStatusName(driver?.status) }}</span>
                </td>
                <td class="border border-gray-300 py-2 px-4">
                   
                    <RouterLink class="text-indigo-600 px-2 py-1 rounded-md   font-semibold hover:bg-indigo-500 hover:text-white"  to="/customer_map">
                        Move to map
                    </RouterLink>
                </td>
                
                
                
                
            </tr>
        </tbody>
    </table>
</template>
