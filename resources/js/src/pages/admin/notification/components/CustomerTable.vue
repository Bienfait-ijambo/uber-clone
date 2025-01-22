<script setup>

const props = defineProps(["customers"]);




</script>
<template>
    

    <table class="bg-white rounded-md w-full shadow-md border border-gray-300">
        <thead>
            <tr class="bg-gray-100 text-left">
                <td class="border border-gray-300 py-2 px-4">#</td>
                <td class="border border-gray-300 py-2 px-4">Name</td>
                <td class="border border-gray-300 py-2 px-4">Location</td>
                <td class="border border-gray-300 py-2 px-4">Destination</td>
                <td class="border border-gray-300 py-2 px-4">Taxi</td>
                <td class="border border-gray-300 py-2 px-4">Model</td>

                <td class="border border-gray-300 py-2 px-4">Distance</td>
                <td class="border border-gray-300 py-2 px-4">Total Price</td>
                <td class="border border-gray-300 py-2 px-4">Trip Status</td>


                <td class="border border-gray-300 py-2 px-4">Actions</td>
            </tr>
        </thead>



        <tbody>
            <tr
              v-for="(customer,index) in customers" :key="customer.id"
            >
                <td class="border border-gray-300 py-2 px-4">
                    {{ index+1 }}
                </td>
                <td class="border border-gray-300 py-2 px-4">
                    {{ customer?.user_name }}
                </td>
                <td class="border border-gray-300 py-2 px-4">
                    {{ customer?.location_address }}
                </td>
                <td class="border border-gray-300 py-2 px-4">
                    {{ customer?.destination_address }}
                </td>
                <td class="border border-gray-300 py-2 px-4">
                    {{ customer?.taxi_name }}
                </td>
                <td class="border border-gray-300 py-2 px-4">
                    {{ customer?.taxi_model }}
                </td>
                <td class="border border-gray-300 py-2 px-4">
                    {{ customer?.distance }} Km

                </td>
                
                <td class="border border-gray-300 py-2 px-4">
                    {{ customer?.total_price }} $

                </td>
                <td class="border border-gray-300 py-2 px-4">
                   <span class="bg-yellow-400 px-2 py-1 rounded-md"> {{ customer?.trip_status }}</span>
                </td>
                <td class="border border-gray-300 py-2 px-4">
                </td>
                
                
                
                
            </tr>
        </tbody>
    </table>
</template>
