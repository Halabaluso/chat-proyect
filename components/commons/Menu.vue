<template>
    <div @click="closeBar">
        <li><router-link to="/inicio">Chats</router-link></li>
        <li><a>Sidebar Item 2</a></li>
    </div>
</template>

<script setup lang="ts">
const closeBar = () => {
    const myDrawer = document.querySelector("#drawerbuttom") as any
    myDrawer.click()
}
</script>

<style></style>