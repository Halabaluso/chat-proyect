<template>
  <div v-show="alertStore.show" class="toast">
    <div class="alert" :class = "alertStore.type">
      <span>{{ alertStore.msg }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { alert } from "../../stores/alert"
const alertStore = alert()
</script>
