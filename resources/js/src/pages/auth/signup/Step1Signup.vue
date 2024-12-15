
<script setup>
import { onMounted } from 'vue';
import { useSignUpStore } from '../../../stores/auth/signup-store';


const signupStore=useSignUpStore()

onMounted(()=>{
    console.log('render step 1')
})
</script>
<template>
    <input
                type="text"
                placeholder="Enter E-mail"
                class="mb-2 border rounded-md py-2 px-2 w-[100%]"
            />
            <button
           @click="signupStore.moveStep1"
                class="mb-2 bg-indigo-700 text-white py-2 px-2 rounded-md shadow-sm w-[100%]"
            >
                Next
            </button>
</template>