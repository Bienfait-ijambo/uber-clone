import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { getData, postData } from "../../helper/http";
import { showError, successMsg } from "../../helper/utils";

export const useProfileStore = defineStore("profile-store", () => {
   const loading=ref(false)

   const driverStatus=ref([{
    value:0,
    name:'BUSY'
   },{
    value:1,
    name:'AVAILABLE'
   }])

  

    async function modifyDriverStatus(input) {
        try {
            loading.value = true;
            const data = await postData(`/driver/status`,{
                ...input
            });
            successMsg(data?.message)
            loading.value = false;
        } catch (errors) {
            loading.value = false;
            for (const message of errors) {
                showError(message);
            }
        }
    }

   


    return {
        modifyDriverStatus,
        driverStatus
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useProfileStore, import.meta.hot));
}
