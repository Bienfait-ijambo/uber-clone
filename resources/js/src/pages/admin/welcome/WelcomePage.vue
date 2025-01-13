<script setup>
import { App } from "../../../api/api";
import AutocompleteInput from './components/AutoCompleteInput.vue'

</script>
<template>
    <div class="bg-white flex flex-col  p-2">
        <div class="flex">
            <div class="mr-20">
                <img :src="App.baseUrl + '/taxi/cab-booking.png'" alt="" />
            </div>
            <div class="ml-20">
                <h1 class="text-2xl mb-10 mt-10 font-semibold">
                    Trust the leading and the most reliable <br />
                    US taxi operator.
                </h1>
                <div class="flex flex-col mb-2">
                    <select
                        name=""
                        id=""
                        class="mb-2 border rounded-md py-2 px-2 w-[100%]"
                    >
                        <option value="">Select Taxi</option>
                        <option value="">Tax 1</option>
                        <option value="">Taxi</option>
                    </select>
                    <div class="flex">
                        <AutocompleteInput
                          
                        />
                        <input
                            type="text"
                            placeholder="Type Destion"
                            class="mb-2 border rounded-md py-2 px-2 w-[100%]"
                        />
                    </div>
                </div>
                <button
                    class="flex justify-center font-semibold rounded-md bg-indigo-700 text-white px-2 py-2 w-[100%]"
                >
                    <span class="">Book taxi now</span>
                    <ArrowRightIcon class="pt-1" />
                </button>
            </div>
        </div>

        <div
            class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
            <div
                class="flex flex-col shadow-md"
                v-for="car in [1, 2, 3, 4]"
                :key="car"
            >
                <div align="center">
                    <img
                        :src="App.baseUrl + '/taxi/cab_booking1.png'"
                        alt="taxi"
                    />
                    <div>
                        <span class="text-xl text-gray-700">Tesla model Y</span>
                    </div>
                    <div>
                        <span>12$/Km</span>
                    </div>
                </div>
                <div class="flex justify-center p-2 mb-2">
                    <button
                        class="flex gap-2 rounded-md border border-indigo-700 text-gray-800 px-2 py-2 hover:bg-indigo-700 hover:text-white font-semibold text-sm"
                    >
                        <span class="">Book taxi now</span>
                        <ArrowRightIcon />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
