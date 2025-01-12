import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { postData } from "../../helper/http";
import {
    getUserData,
    setUserData,
    showError,
    successMsg,
} from "../../helper/utils";

export const useLoginStore = defineStore("login", () => {
    const currentStep = ref("currentStep");

    const step1 = ref("step1");
    const step2 = ref("step2");
    const loading = ref(false);
    const step1Input = ref({
        email: "",
    });
    const step2Input = ref({
        password: "",
    });

    const rulesStep1Input = {
        email: { required, email },
    };
    const rulesStep2Input = {
        password: { required },
    };

    const vStep1$ = useVuelidate(rulesStep1Input, step1Input);
    const vStep2$ = useVuelidate(rulesStep2Input, step2Input);

    async function next() {
        const valid = await vStep1$.value.$validate();
        if (!valid) return;
        currentStep.value = step2.value;
    }

    function previous() {
        currentStep.value = step1.value;
    }

    async function logout() {
        try {
            const userData = getUserData();
            loading.value = true;
            const data = await postData("/logout", {
                userId: userData?.user?.id,
            });
            //http
            localStorage.clear();
            window.location.href = "/app/login";
            //cookie
            successMsg(data?.message);

            loading.value = false;
        } catch (errors) {
            loading.value = false;
            for (const message of errors) {
                showError(message);
            }
        }
    }

    async function signin() {
        const valid = await vStep2$.value.$validate();
        if (!valid) return;
        try {
            loading.value = true;
            const data = await postData("/login", {
                ...step1Input.value,
                ...step2Input.value,
            });
            //http
            setUserData(data);
            window.location.href = "/app/welcome";
            //cookie
            successMsg(data?.message);

            loading.value = false;
        } catch (errors) {
            console.log('error :',errors);
            loading.value = false;
            for (const message of errors) {
                showError(message);
            }
        }
    }

    return {
        step1Input,
        step2Input,
        vStep1$,
        vStep2$,
        signin,
        logout,

        loading,
        signin,
        step1,
        step2,
        next,
        previous,
        currentStep,
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useLoginStore, import.meta.hot));
}
