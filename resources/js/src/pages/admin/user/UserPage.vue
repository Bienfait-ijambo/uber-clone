<script setup>
import { onMounted } from "vue";
import UserTable from "./components/UserTable.vue";
import { useUserStore } from "../../../stores/user/user-store";
import { storeToRefs } from "pinia";
import { TailwindPagination } from "laravel-vue-pagination";
import UserRoleModal from "./components/UserRoleModal.vue";
const userStore = useUserStore();

const { userData, loading,modalVal,roles,modifyRole } = storeToRefs(userStore);

onMounted(async () => {
    await userStore.getUsers();
});
</script>
<template>
    <div class="ml-4 mr-4">

        <UserRoleModal 
        :show="modalVal" 
        :loading="loading"
        :roles="roles"
        @toggleModal="userStore.toggleModal"
         />

        <h1 class="text-2xl mb-4">User page</h1>
        
        <UserTable 
        @toggleModal="userStore.toggleModal"
        :users="userData?.data"
         @get-users="userStore.getUsers"/>

        <div class="mt-2">
            <TailwindPagination
                :data="userData"
                @pagination-change-page="userStore.getUsers"
            />
        </div>
    </div>
</template>
<style scoped>
/* If you pagination doesnt looks good use this */
button.relative.inline-flex.items-center.px-4.py-2.text-sm.font-medium.border.focus\:z-20.bg-blue-50.border-blue-500.text-blue-600.z-30 {
    background: #4f46e5;
    color: white;
    /* border-radius: 5px; */
}
</style>
