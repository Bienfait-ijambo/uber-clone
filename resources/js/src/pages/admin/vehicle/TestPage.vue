<script setup>
import { App } from "../../../api/api";
</script>
<template>
    <div class="bg-white flex ">
        <div class="pr-16">
            <img :src="App.baseUrl + '/taxi/cab-booking.png'" alt="" />
        </div>
           

            <div class="flex flex-col mr-14">
                <h1 class="text-2xl mb-10 m-5 font-semibold">
                Trust the leading and the most reliable <br/> US taxi operator.
            </h1>
                <select class="mb-2 border rounded-md py-2 px-2" name="" id="">
                    <option value="">Select a Type</option>
                    <option value="">model 1</option>
                    <option value="">Select 2</option>
                </select>
                <input
                    placeholder="Pick a location"
                    type="text"
                    class="mb-2 border rounded-md py-2 px-2"
                />
                <input
                    placeholder="Pick a destination"
                    type="text"
                    class="mb-2 border rounded-md py-2 px-2"
                />
                <button
                    class="flex justify-center bg-yellow-400 font-semibold rounded-lg px-4 py-2"
                >
                    <span>Book Taxi Now </span>
                    <ArrowRightIcon class="mt-1 ml-2" />
                </button>
            </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-3 p-10">
        <div class="bg-white shadow-md rounded-md">
            <div align="center">
                <img :src="App.baseUrl + '/taxi/cab_booking1.png'" alt="" />
                <h1 class="flex justify-center text-1xl font-semibold">
                    BMW M5 2019 Model
                </h1>
                <span class="flex justify-center text-yellow-400 font-semibold"
                    >$1.25/Km</span
                >
            </div>
            <div class="flex justify-center p-4">
                <button
                    class="flex bg-yellow-400 font-semibold rounded-lg px-4 py-2"
                >
                    <span>Book Taxi Now </span>
                    <ArrowRightIcon class="mt-1 ml-2" />
                </button>
            </div>
        </div>
        <div class="bg-white shadow-md rounded-md">
            <div align="center">
                <img :src="App.baseUrl + '/taxi/cab_booking4.png'" alt="" />
                <h1 class="flex justify-center text-1xl font-semibold">
                    BMW M5 2019 Model
                </h1>
                <span class="flex justify-center text-yellow-400 font-semibold"
                    >$1.25/Km</span
                >
            </div>
            <div class="flex justify-center p-4">
                <button
                    class="flex bg-yellow-400 font-semibold rounded-lg px-4 py-2"
                >
                    <span>Book Taxi Now </span>
                    <ArrowRightIcon class="mt-1 ml-2" />
                </button>
            </div>
        </div>
        <div class="bg-white shadow-md rounded-md">
            <div align="center">
                <img :src="App.baseUrl + '/taxi/cab_booking6.png'" alt="" />
                <h1 class="flex justify-center text-1xl font-semibold">
                    BMW M5 2019 Model
                </h1>
                <span class="flex justify-center text-yellow-400 font-semibold"
                    >$1.25/Km</span
                >
            </div>
            <div class="flex justify-center p-4">
                <button
                    class="flex bg-yellow-400 font-semibold rounded-lg px-4 py-2"
                >
                    <span>Book Taxi Now </span>
                    <ArrowRightIcon class="mt-1 ml-2" />
                </button>
            </div>
        </div>
        <div class="bg-white shadow-md rounded-md">
            <div align="center">
                <img :src="App.baseUrl + '/taxi/cab_booking5.png'" alt="" />
                <h1 class="flex justify-center text-1xl font-semibold">
                    BMW M5 2019 Model
                </h1>
                <span class="flex justify-center text-yellow-400 font-semibold"
                    >$1.25/Km</span
                >
            </div>
            <div class="flex justify-center p-4">
                <button
                    class="flex bg-yellow-400 font-semibold rounded-lg px-4 py-2"
                >
                    <span>Book Taxi Now </span>
                    <ArrowRightIcon class="mt-1 ml-2" />
                </button>
            </div>
        </div>
    </div>
</template>




