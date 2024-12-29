<script setup>
const props = defineProps(["loading"]);
</script>
<template>
    <div
        class="spinner"
        :style="props.loading ? 'display:block' : 'display:none'"
    >
        <div id="loadingSpinner" class="loading-spinner"></div>
    </div>
</template>
<style scoped>
.spinner {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: aliceblue;
    opacity: 0.8;
    z-index: 100;
}
.loading-spinner {
    position: absolute;
    top: 32%;
    left: 47%;
    margin: 0;
    transform: translate(-50%, -50%);
    border: 8px solid #f3f3f3bf;
    z-index: 1000;
    border-radius: 50%;
    border-top: 8px solid #212121;

    width: 60px;
    height: 60px;
    background-color: rgb(187, 216, 241);
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>