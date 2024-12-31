<script setup>
import { useLoginStore } from "../../../stores/auth/login-store";
import { storeToRefs } from "pinia";

const loginStore = useLoginStore();

const { loading, step2Input, vStep2$ } = storeToRefs(loginStore);
</script>
<template>
    <Loading :loading="loading" />
    <InputError :errors="vStep2$.password.$errors">
        <input
            v-model="step2Input.password"
            placeholder=" password"
            type="password"
            class="mb-2 border rounded-md py-2 px-2 w-[100%]"
        />
    </InputError>
    <div class="flex justify-between">
        <button
            @click="loginStore.previous"
            class="mb-2 border border-indigo-700 text-gray-500 py-2 px-2 rounded-md shadow-sm w-[48%]"
        >
            Previous
        </button>
        <button
        @click="loginStore.signin"
            class="mb-2 bg-indigo-700 text-white py-2 px-2 rounded-md shadow-sm w-[48%]"
        >
            Sign In
        </button>
    </div>
</template>
