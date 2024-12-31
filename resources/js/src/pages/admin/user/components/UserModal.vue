<script setup>
const props = defineProps(["show", "roles"]);
const emit = defineEmits(["toggleModal"]);
</script>
<template>
    <BaseModal>
        <template #title>Edit Role</template>
        <template #body>
            <select name="" class="mb-2 border rounded-md py-2 px-2" id="">
                <option value="">Select a role</option>
                <option value="" v-for="role in roles" :key="role">
                    {{ role }}
                </option>
            </select>
        </template>
        <template #footer>
            <button
                class="mb-2 text-gray-700 border border-indigo-700 py-2 px-2 rounded-md shadow-sm"
            >
                close
            </button>
            <button
                class="mb-2 bg-indigo-700 text-white py-2 px-2 rounded-md shadow-sm"
            >
                save
            </button>
        </template>
    </BaseModal>
</template>
