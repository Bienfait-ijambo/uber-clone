import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { getData, postData } from "../../helper/http";
import { showError, successMsg } from "../../helper/utils";

export const useVehicleStore = defineStore("vehicle-store", () => {
    const vehicleData = ref({});
    const loading = ref(false);
  
    // const modalVal=ref(false)

    // function toggleModal(id){
    //     modalVal.value=!modalVal.value
    //     userId.value=id
    // }


    // async function modifyRole(role) {
    //     try {
    //         loading.value = true;
    //         const data = await postData(`/users/modify-role`,{
    //             role:role,
    //             userId:userId.value
    //         });
    //         successMsg(data?.message)
    //         loading.value = false;
    //         getUsers()
    //     } catch (errors) {
    //         loading.value = false;
    //         for (const message of errors) {
    //             showError(message);
    //         }
    //     }
    // }

   

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
       
        getVehicles,
        vehicleData,
        loading,
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useVehicleStore, import.meta.hot));
}
