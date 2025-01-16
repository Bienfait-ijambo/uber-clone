

<script setup>

const props=defineProps(['vehicles',"hideBookButton"])
</script>

<template>
      <div
                class="flex flex-col shadow-md"
                v-for="vehicle in vehicles"
                :key="vehicle.id"
            >
                <div align="center">
                    <img
                        :src="vehicle?.image"
                        alt="taxi"
                    />
                    <div>
                        <span class="text-xl text-gray-700">{{ vehicle?.name }}  - {{ vehicle?.model }} </span>
                    </div>
                    <div>
                        <span>{{ vehicle?.price }} $/Km</span>
                    </div>
                </div>
                <div class="flex justify-center p-2 mb-2">
                    <button
                    v-show="hideBookButton"
                        class="flex gap-2 rounded-md border border-indigo-700 text-gray-800 px-2 py-2 hover:bg-indigo-700 hover:text-white font-semibold text-sm"
                    >
                        <span class="">Book taxi now</span>
                        <ArrowRightIcon />
                    </button>
                </div>
            </div>
</template>