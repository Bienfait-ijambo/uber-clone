<script setup>
import { onMounted } from "vue";
import { useSignUpStore } from "../../../stores/auth/signup-store";
import { storeToRefs } from "pinia";

const signupStore = useSignUpStore();

const { vStep1$, step1Input } = storeToRefs(signupStore);

onMounted(() => {
    console.log("render step 1");
});
</script>
<template>

    <InputError :errors="vStep1$.name.$errors">
        <input
            v-model="step1Input.name"
            placeholder="Enter Name"
            type="text"
            class="mb-2 border rounded-md py-2 px-2 w-[100%]"
        />
    </InputError>
    <InputError :errors="vStep1$.email.$errors">
        <input
            v-model="step1Input.email"
            placeholder="E-mail"
            type="text"
            class="mb-2 border rounded-md py-2 px-2 w-[100%]"
        />
    </InputError>

  
    <button
        @click="signupStore.moveStep2"
        class="mb-2 bg-indigo-700 text-white py-2 px-2 rounded-md shadow-sm w-[100%]"
    >
        Next
    </button>
</template>
