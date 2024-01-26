<template>
  <div class="flex flex-col items-center justify-center w-screen h-screen">
    <div class="flex flex-col">
        <FormsLogin v-show="!userStore.changeForm"/>
        <FormsRegister v-show="userStore.changeForm"/>
    </div>
  </div>
</template>
<script setup lang="ts">
    import { user } from "../stores/user"
    const userStore = user()
</script>
