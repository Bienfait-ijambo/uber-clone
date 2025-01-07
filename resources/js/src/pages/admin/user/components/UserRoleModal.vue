<script setup>
import { ref } from 'vue';
import { useUserStore } from '../../../../stores/user/user-store';


const userStore=useUserStore()
const props = defineProps(["show", "roles","loading"]);

const emit=defineEmits(['toggleModal'])
const role=ref(null)

function changeRole(event){
    console.log(event.target.value)
    role.value=event.target.value
}

async function saveRole(){
    userStore.modifyRole(role.value)
}

</script>
<template>
    <BaseModal :show="props.show">
        <template #title>Edit Role</template>
        <template #body>
            <select @change="changeRole" class="mb-2 border rounded-md py-2 px-2 w-[100%]" id="">
                <option value="">Select a role</option>
                <option v-for="role in roles" :key="role" :value="role" >
                    {{ role }}
                </option>
            </select>
        </template>
        <template #footer>
            <button
            @click="emit('toggleModal')"
                class="mb-2 text-gray-700 border border-indigo-700 py-2 px-2 rounded-md shadow-sm"
            >
                close
            </button>
            <button
            @click="saveRole"
            :disabled="loading"
            class="mb-2 text-white border bg-indigo-700 py-2 px-2 rounded-md shadow-sm"
            >
            {{loading?"saving...":"Save"}}
            </button>
        </template>
    </BaseModal>
</template>
