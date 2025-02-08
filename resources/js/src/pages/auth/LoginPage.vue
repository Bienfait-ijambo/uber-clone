<script setup>
import { onMounted } from "vue";
import { App } from "../../api/api";
import Step1 from "./login/Step1Login.vue";
import Step2 from "./login/Step2Login.vue";
import { useLoginStore } from "../../stores/auth/login-store";



function redirectToGoogle(){
    window.location.href='/auth/redirect'
}

const loginStore = useLoginStore();
onMounted(() => {
    loginStore.currentStep = Step1;
    loginStore.step1 = Step1;
    loginStore.step2 = Step2;
});
</script>
<template>
    <div class="flex flex-row justify-between mt-40">
        <div></div>
        <div class="w-[300px]">
            <h1 class="mb-3 text-3xl font-semibold">Sign In</h1>
            <!-- <Step2/> -->
            <keep-alive>
                <component :is="loginStore.currentStep" />
            </keep-alive>

            <div class="flex">
                <Router-link to="/signup" class="font-medium hover:underline"
                    >Sign up ?</Router-link
                >
            </div>

            <div class="flex mb-2">
                <hr class="h-[1px] bg-black w-[48%] mt-3" />
                <div class="font-semibold">or</div>
                <hr class="h-[1px] bg-black w-[48%] mt-3" />
            </div>
            <button 

            @click="redirectToGoogle"
          
                class="flex justify-center bg-gray-300 rounded-md py-2 px-2 gap-2 w-[100%]"
            >
                <img :src="App.baseUrl + '/img/google.svg'" alt="logo" />
                <span>Continue with Google</span>
            </button>
        </div>
        <div></div>
    </div>
</template>
