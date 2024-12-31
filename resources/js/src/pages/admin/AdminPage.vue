<script setup>
import SideBar from "./components/SideBar.vue";
</script>
<template>
    <div class="flex">
        <SideBar>
            <template #main>
                <RouterView />
            </template>
        </SideBar>
    </div>
</template>
