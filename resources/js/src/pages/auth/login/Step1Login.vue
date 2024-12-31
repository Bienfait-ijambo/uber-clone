<script setup>
import { useLoginStore } from "../../../stores/auth/login-store";
import { storeToRefs } from "pinia";

const loginStore = useLoginStore();
const { step1Input, vStep1$ } = storeToRefs(loginStore);
</script>
<template>
    <InputError :errors="vStep1$.email.$errors">
        <input
            v-model="step1Input.email"
            placeholder="Enter Email"
            type="text"
            class="mb-2 border rounded-md py-2 px-2 w-[100%]"
        />
    </InputError>

    <button
        @click="loginStore.next"
        class="mb-2 bg-indigo-700 text-white py-2 px-2 rounded-md shadow-sm w-[100%]"
    >
        Next
    </button>
</template>
