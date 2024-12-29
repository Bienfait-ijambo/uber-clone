<script setup>
import { onMounted } from "vue";
import { App } from "../../api/api";

import Step1Signup from "./signup/Step1Signup.vue";
import Step2Signup from "./signup/Step2Signup.vue";
import Step3Signup from "./signup/Step3Signup.vue";
import { useSignUpStore } from "../../stores/auth/signup-store";
const signupStore = useSignUpStore();

onMounted(() => {
    signupStore.currentStep = Step1Signup;
    signupStore.step1 = Step1Signup;
    signupStore.step2 = Step2Signup;
    signupStore.step3 = Step3Signup;
});
</script>
<template>
    <div class="flex flex-row justify-between mt-40">
        <div></div>
        <div class="w-[300px]">
            <h1 class="mb-3 text-3xl font-semibold">Sign Up</h1>

            <keep-alive>
                <component :is="signupStore.currentStep" />
            </keep-alive>

            <div class="flex">
                <Router-link to="/login" class="font-medium hover:underline"
                    >Sign in ?</Router-link
                >
            </div>

            <div class="flex mb-2">
                <hr class="h-[1px] bg-black w-[48%] mt-3" />
                <div class="font-semibold">or</div>
                <hr class="h-[1px] bg-black w-[48%] mt-3" />
            </div>
            <button
                class="flex justify-center bg-gray-300 rounded-md py-2 px-2 gap-2 w-[100%]"
            >
                <img :src="App.baseUrl + '/img/google.svg'" alt="logo" />
                <span>Continue with Google</span>
            </button>
        </div>
        <div></div>
    </div>
</template>
