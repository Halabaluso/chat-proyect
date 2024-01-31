<template>
    <div class="text-sm breadcrumbs mb-5">
      <ul>
        <li v-for="bread in props.breadArray" :key="bread.name" class="text-secondary"><Icon :name="bread.icon" class="mr-2"/>{{ bread.name }}</li>
      </ul>
    </div>
</template>
<script setup lang = "ts">
interface Bread {
    name: string,
    icon: string
}
const props = defineProps({
    breadArray: Array<Bread>
})
</script>