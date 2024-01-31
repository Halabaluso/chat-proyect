<template>
    <main class="p-5">
        <FormsLogin v-show="!userStore.changeForm"/>
        <FormsRegister v-show="userStore.changeForm"/>
    </main>
</template>
<script setup lang="ts">
    import { user } from "../stores/user"
    const userStore = user()
</script>
