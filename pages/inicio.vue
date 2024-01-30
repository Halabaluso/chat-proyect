<template>
    <div>
        <CommonsTabs :slots = slots >
            <template v-slot:newchat>
                <FormsNewChat/>
            </template>
        </CommonsTabs>
        
    </div>
</template>

<script setup lang="ts">
const slots = [{
    slot: "newchat",
    name: "Nuevo chat"
}]
</script>

<style>

</style>