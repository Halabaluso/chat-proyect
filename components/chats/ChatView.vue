<template>
    <template v-for="chat in chatStore.chat.chats" :key="chat.id">
        <div v-if="chat.from === `admin`" class="chat chat-start">
            <div class="chat-image avatar">
                <div class="w-10 rounded-full">
                    <Icon name = "material-symbols:shield-person" class="text-4xl"/>
                </div>
            </div>
            <div class="chat-header">
                Tú
                <time class="text-xs opacity-50"> - {{ chat.whenFormat }}</time>
            </div>
            <div class="chat-bubble">{{ chat.msg }}</div>
        </div>
        <div v-if="chat.from !== `admin`" class="chat chat-end">
            <div class="chat-image avatar">
                <div class="w-10 rounded-full">
                    <Icon name = "material-symbols:shield-person-outline-rounded" class="text-4xl"/>
                </div>
            </div>
            <div class="chat-header">
                Anakin
                <time class="text-xs opacity-50">12:46</time>
            </div>
            <div class="chat-bubble">I hate you!</div>
        </div>
    </template>
</template>
<script setup lang = "ts">
    import { chats } from "../../stores/chat"
    const chatStore = chats()
</script>