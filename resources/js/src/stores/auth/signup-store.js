import { defineStore ,acceptHMRUpdate} from "pinia";
import { ref } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

export const useSignUpStore = defineStore("signup-store", () => {
    const currentStep = ref("currentStep");

    const step1 = ref("step1");
    const step2 = ref("step2");
    const step3 = ref("step2");

    const step1Input=ref({name:'ben',email:'ben@gmail.com'})
    const step2Input=ref({password:''})
    const step3Input=ref({otp_code:''})


    const rulesStep1Input={
        name:{required},
        email:{required,email},
    }
    const rulesStep2Input={
        password:{required},
    }
    const rulesStep3Input={
        otp_code:{required},
    }


    const vStep1$= useVuelidate(rulesStep1Input,step1Input)
    const vStep2$= useVuelidate(rulesStep2Input,step2Input)
    const vStep3$= useVuelidate(rulesStep3Input,step3Input)



   


    async function moveStep2() {
        const valid=await vStep1$.value.$validate()
        if(!valid) return
        currentStep.value = step2.value;
    }

   async function moveStep1() {
   
        currentStep.value = step1.value;
    }
// change to step3
   async function moveStep3() {
        const valid=await vStep2$.value.$validate()
        if(!valid) return
        currentStep.value = step3.value;
    }

    async function signupUser(){

        const valid=await vStep3$.value.$validate()
        if(!valid) return

        // try {

        //     const res=await fetch(App.apiBaseUrl+'/users/verify-email')
        //     const data=await res.json()
        //     console.log(data)
            
        // } catch (error) {
            
        // }
    }


    return {
        step1,
        step2,
        step3,
        step1Input,
        step2Input,
        step3Input,
        vStep1$,
        vStep2$,
        vStep3$,
        signupUser,


        moveStep1,
        moveStep2,
        moveStep3,
        currentStep,
    };
});



if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useSignUpStore,import.meta.hot))
}import { App } from './../../api/api';
