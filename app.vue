<template>

  <div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle"/>
    <div class="drawer-content">
      <!-- Page content here -->
      <main v-show="!loadStore.show">
        <CommonsHeader v-if="userStore.user.email !== undefined"/>
        <NuxtPage class="p-5" />
        <ToastGeneralToast />
      </main>
      <CommonsLoading v-show="loadStore.show" />
    </div>
    <div class="drawer-side">
      <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <!-- Sidebar content here -->
        <CommonsMenu/>
      </ul>
    </div>
  </div>
</template>
<script setup lang = "ts">
import { loading } from "./stores/loading"
import { user } from "./stores/user"
const userStore = user()
const loadStore = loading()
const router = useRouter()
onMounted(() => {
  if(userStore.user.email === undefined){
    router.push("/")
  }
})
</script>

