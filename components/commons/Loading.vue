<template>
    <div class="h-screen w-screen flex flex-col items-center justify-center">
        <span class="loading loading-ring loading-lg"></span>
    </div>
</template>

<script setup lang = "ts">
    import { loading } from "../../stores/loading"
    const loadStore = loading()
</script>

<style>

</style>

