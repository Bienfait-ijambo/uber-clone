import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { deleteData, getData, postData, putData } from "../../helper/http";
import { showError, successMsg } from "../../helper/utils";
import { useVuelidate } from "@vuelidate/core";
import { required,numeric } from "@vuelidate/validators";
export const useVehicleStore = defineStore("vehicle-store", () => {

    const vehicleData = ref({});
    const vehicleInput=ref({name:"",model:"",price:""})
    const modalVal=ref(false)
    const edit=ref(false)
    const places=ref({})

    const loading = ref(false);

    function toggleModal(){
        vehicleInput.value={}
        edit.value=false
        modalVal.value=!modalVal.value
    }



    const rules = {
        name: { required },
        model: { required },
        price: { required,numeric },
      
    };

    const vehicleValidation$ = useVuelidate(rules, vehicleInput);


    
    async function editVehicle(){
       const data= await putData(`/vehicles`,{...vehicleInput.value})
        modalVal.value=false
        edit.value=false
        vehicleInput.value={}
        getVehicles
        return data
    }

    async function createVehicle(){
        const data=await postData(`/vehicles`,{...vehicleInput.value});
        vehicleInput.value={}
        edit.value=false
        getVehicles()
        return data
    }


    

   
    async function deleteVehicle(id) {
      
        try {
            loading.value = true;
        const data=await deleteData(`/vehicles`,{id:id});
           successMsg(data?.message)
            loading.value = false;
        } catch (errors) {
            loading.value = false;
            for (const message of errors) {
                showError(message);
            }
        }
       
    }




   
    async function createOrUpdateVehicle() {
        const valid = await vehicleValidation$.value.$validate();
        if (!valid) return;

        try {
            loading.value = true;
            const data = edit.value ?
            await editVehicle()
            : await createVehicle();
            vehicleValidation$.value.$reset()
            
          
           successMsg(data?.message)
            loading.value = false;
        } catch (errors) {
            loading.value = false;
            for (const message of errors) {
                showError(message);
            }
        }
       
    }


    async function getPlaces(query="") {
        try {
            loading.value = true;
            const data = await getData(`/places?query=${query}`);
            // places.value=[]
            places.value = data?.features;
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
            vehicleData.value=[
                
            ]
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
        deleteVehicle,
        places,
        getPlaces
    
        
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useVehicleStore, import.meta.hot));
}
