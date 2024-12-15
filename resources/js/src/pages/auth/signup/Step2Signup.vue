
<script setup>
import { onMounted } from 'vue';
import { useSignUpStore } from '../../../stores/auth/signup-store';


const signupStore=useSignUpStore()
onMounted(()=>{
    console.log('render step 2')
})
</script>
<template>
    <input
                type="text"
                placeholder="Enter password"
                class="mb-2 border rounded-md py-2 px-2 w-[100%]"
            />
           <div class="flex justify-between">
            <button
            @click="signupStore.moveStep1"
                class="mb-2 border border-indigo-700 text-gray-500 py-2 px-2 rounded-md shadow-sm w-[48%]"
            >
                Previous
            </button>
            <button
            @click="signupStore.moveStep3"

                class="mb-2 bg-indigo-700 text-white py-2 px-2 rounded-md shadow-sm w-[48%]"
            >
                Next
            </button>
           </div>
</template>