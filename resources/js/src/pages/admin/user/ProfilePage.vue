<script setup>
import { ADMIN_ROLE, CUSTOMER_ROLE } from '../../../constants/roles';
import { getUserData } from '../../../helper/utils';

const userData=getUserData()

function showDriverStatus(){
    const role=userData?.user?.role

    if(role===ADMIN_ROLE||role===CUSTOMER_ROLE) return false
    return true
}

</script>
<template>
    <div class="h-screen w-full bg-white">
        <div class="flex flex-col ml-14">
            <div></div>
            <div></div>

            <div>
                <h1 class="text-2xl mb-10 mt-10 font-semibold">Profile</h1>

                <div class="flex flex-col gap-4 text-gray-700 mb-4">
                  <span>Name : {{userData?.user?.name}}</span>
                  <span>E-mail : <a href="" class="text-indigo-700 font-semibold">
                    {{userData?.user?.email}}
                  </a> </span>
                  <span>Role : {{userData?.user?.role}}</span>
                  
                  <div v-show="showDriverStatus()">Status : <span class="text-gray-800 font-bold py-1 px-2 rounded-md"></span></div>

                </div>
                <hr v-show="showDriverStatus()" class="w-[25%]  py-2">

                <div v-show="showDriverStatus()">
                    <select
                    class="w-[25%] focus:ring focus:ring-blue-300 mb-3 border rounded-md py-2 px-2"
                    name=""
                    id=""
                >
                    <option value="">Status</option>
                    <option value="">AVAILABLE</option>
                    <option value="">NOT_AVAILABLE</option>
                </select>

                <button
                    class="flex justify-center text-white bg-indigo-700 font-semibold rounded-lg px-4 py-2"
                >
                    <span>Change Status</span>
                </button>
                </div>
            </div>
        </div>
    </div>
</template>