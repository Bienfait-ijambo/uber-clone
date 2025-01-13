<template>
    <div class="relative w-full max-w-sm">
        <div>
            <span>
                <!-- icon -->
            </span>
            <input
                type="text"
                placeholder="Type Location"
                class="mb-2 border rounded-md ring focus:ring-blue-200 py-2 px-2 w-[100%]"
            />
        </div>
        <ul class="w-full z-10 rouned-md shadow-lg bg-white boder border-gray-200 min-h-48 absolute 
         overflow-y-auto">
            <li class="py-4 px-2 hover:bg-blue-100">
                new York
            </li>
            <li class="py-4 px-2 hover:bg-blue-100">
                Seattle
            </li>
        </ul>
    </div>
</template>
