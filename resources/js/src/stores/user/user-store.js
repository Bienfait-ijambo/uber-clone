import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { getData, postData } from "../../helper/http";
import { showError, successMsg } from "../../helper/utils";

export const useUserStore = defineStore("user-store", () => {
    const userData = ref({});
    const loading = ref(false);
    const roles=ref(['ADMIN','CUSTOMER','DRIVER'])
    const userId=ref(null)
   
    const modalVal=ref(false)

    function toggleModal(id){
        modalVal.value=!modalVal.value
        userId.value=id
    }

    

    async function modifyRole(role) {
        try {
            loading.value = true;
            const data = await postData(`/users/modify-role`,{
                role:role,
                userId:userId.value
            });
            successMsg(data?.message)
            loading.value = false;
            getUsers()
        } catch (errors) {
            loading.value = false;
            for (const message of errors) {
                showError(message);
            }
        }
    }

   

    async function getUsers(page = 1, query = "") {
        try {
            loading.value = true;
            const data = await getData(`/users?page=${page}&query=${query}`);
            userData.value = data;
            loading.value = false;
        } catch (errors) {
            loading.value = false;
            for (const message of errors) {
                showError(message);
            }
        }
    }

    return {
       roles,
       toggleModal,
       modalVal,
       modifyRole,
        getUsers,
        userData,
        loading,
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}