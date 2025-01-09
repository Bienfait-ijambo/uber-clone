import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { getData, postData, putData } from "../../helper/http";
import { showError, successMsg } from "../../helper/utils";
import { useVuelidate } from "@vuelidate/core";
import { required,numeric } from "@vuelidate/validators";
export const useVehicleStore = defineStore("vehicle-store", () => {
    const vehicleData = ref({});
    const vehicleInput=ref({name:"",model:"",price:""})
    const modalVal=ref(false)
    const edit=ref(false)

    const loading = ref(false);

    function toggleModal(){
        edit.value=false
        modalVal.value=!modalVal.value
    }



    const rules = {
        name: { required },
        model: { required },
        price: { required,numeric },

    };

    const vehicleValidation$ = useVuelidate(rules, vehicleInput);

    async function createOrUpdateVehicle() {
        const valid = await vehicleValidation$.value.$validate();
        if (!valid) return;

        try {
            loading.value = true;
            const data = edit.value ?
            await putData(`/vehicles`,{...vehicleInput.value})
            : await postData(`/vehicles`,{...vehicleInput.value});
            vehicleValidation$.value.$reset()
            vehicleInput.value={}
            modalVal.value=false
            edit.value=false
           successMsg(data?.message)
            loading.value = false;
        } catch (errors) {
            loading.value = false;
            for (const message of errors) {
                showError(message);
            }
        }
       
    }

    

    async function getVehicles(page = 1, query = "") {
        try {
            loading.value = true;
            const data = await getData(`/vehicles`);
            vehicleData.value = data;
            loading.value = false;
        } catch (errors) {
            loading.value = false;
            for (const message of errors) {
                showError(message);
            }
        }
    }

    return {
       
        createOrUpdateVehicle,
       toggleModal,
       modalVal,
       edit,
       vehicleInput,
       vehicleValidation$,
        getVehicles,
        vehicleData,
        loading,
    
        
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useVehicleStore, import.meta.hot));
}
