<script setup>
import { _debounce } from '../../../../helper/utils';
import { ref } from 'vue';
const props = defineProps(["users"]);

const emit=defineEmits(['getUsers'])
const query=ref('')
const page=ref(1)

const searchUsers=_debounce(function(){
    
emit('getUsers',page.value,query.value)
},200)
</script>
<template>
    <div class="flex">
        <input
        @keydown="searchUsers"
        v-model="query"
            placeholder="Search..."
            type="text"
            class="mb-2 border rounded-md py-2 px-2 shadow-md"
        />
    </div>

    <table class="bg-white rounded-md w-full shadow-md border border-gray-300">
        <thead>
            <tr class="bg-gray-100 text-left">
                <td class="border border-gray-300 py-2 px-4">#</td>
                <td class="border border-gray-300 py-2 px-4">Name</td>
                <td class="border border-gray-300 py-2 px-4">Email</td>
                <td class="border border-gray-300 py-2 px-4">Role</td>
                <td class="border border-gray-300 py-2 px-4">Actions</td>
            </tr>
        </thead>

        <tbody>
            <tr class="text-left" v-for="(user,index) in users" :key="user?.id">
                <td class="border border-gray-300 py-2 px-4">
                    {{ index+1 }}
                </td>
                <td class="border border-gray-300 py-2 px-4">
                    {{ user?.name }}
                </td>
                <td class="border border-gray-300 py-2 px-4">
                   <a :href="'mailto:'+user?.email" class="text-indigo-700">
                    {{ user?.email }}
                   </a>
                </td>
                <td class="border border-gray-300 py-2 px-4">
                    {{ user?.role }}
                </td>
                <td class="border border-gray-300 py-2 px-4">
                    <a href="">Edit</a>
                </td>
            </tr>
        </tbody>
    </table>
</template>
