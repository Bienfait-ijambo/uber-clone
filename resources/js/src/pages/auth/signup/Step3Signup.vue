<script setup>
import { useSignUpStore } from "../../../stores/auth/signup-store";
import { storeToRefs } from "pinia";

const signupStore = useSignUpStore();
const {vStep3$,step3Input,step1Input,loading}=storeToRefs(signupStore)

</script>
<template>
    <Loading :loading="loading"/>

    <span>
        <a href="" class="text-indigo-700 font-semibold">
            {{ step1Input.email }}
        </a>
    </span>
    
    <InputError :errors="vStep3$.otp_code.$errors">
        <input
            v-model="step3Input.otp_code"
            placeholder="Code"
            type="text"
            class="mb-2 mt-2 border rounded-md py-2 px-2 w-[100%]"
        />
    </InputError>
    
  
    <div class="flex justify-between">
        <button
            @click="signupStore.moveStep2"
            class="mb-2 border border-indigo-700 text-gray-500 py-2 px-2 rounded-md shadow-sm w-[48%]"
        >
            Previous
        </button>
        <button
        @click="signupStore.signupUser"
            class="mb-2 bg-indigo-700 text-white py-2 px-2 rounded-md shadow-sm w-[48%]"
        >
            Sign up
        </button>
    </div>
</template>
