<template>
    <main class="min-h-screen">
        <div>
            <CommonsHeader/>
            <CommonsBreadcrumbs :breadArray=arrayBread class="p-5 pb-0" />
            <div class="p-5 flex-1 w-full">
                <ChatsChatView />
            </div>
        </div>
        <FormsSendChat class="sticky top-[100vh]"/>
    </main>
</template>
<script setup lang = "ts">
const arrayBread = [
    {
        name: "Inicio",
        icon: "material-symbols:home"
    },
    {
        name: "Mis chats",
        icon: "material-symbols:android-chat-outline"
    },
    {
        name: "Chat",
        icon: "ic:baseline-wechat"
    }
]
</script>