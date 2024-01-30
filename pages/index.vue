<template>
    <div>
        <FormsLogin v-show="!userStore.changeForm"/>
        <FormsRegister v-show="userStore.changeForm"/>
    </div>
</template>
<script setup lang="ts">
    import { user } from "../stores/user"
    const userStore = user()
</script>
