<template>
    <form @submit.prevent="SendMsg">
        <div class="bg-neutral p-5">
            <div class="flex flex-row justify-between gap-2">
                <input v-model="state.msg" type="text" placeholder="Escribe un mensaje"
                    class="input input-bordered w-full" />
                <button type="submit" class="btn">
                    <Icon name="mingcute:send-plane-fill" class="text-2xl"/>
                </button>
            </div>
        </div>
    </form>
</template>
<script setup lang = "ts">
import type { ChatMsg } from "../../dbconnect/interfaces/DbInterfaces"
import type { MsgModel } from "../../stores/StoresInterfaces"
import { chats } from "../../stores/chat"
import { alert } from "../../stores/alert"
import moment from "moment"
import { nanoid } from "nanoid"
const state = reactive({
    msg: "" as string
})
const alertState = alert()
const chatState = chats()
const SendMsg = async () => {
    if(state.msg.length > 0){
        const object: ChatMsg = {
            dayFormat: moment().format("DD-MM-YYYY"),
            whenFormat: moment().format("HH:mm:ss"),
            whenNumber: Date.now(),
            from: "admin",
            msg: state.msg,
            id: nanoid()
        }
        const response = await chatState.UpdateChatMsg(chatState.chat._id, object)
        console.log(response)
    }else{
        const toast:MsgModel = {
            msg: "Campo vacío.", 
            time: 1500,
            type: "alert-warning"
        }
        alertState.ShowToast(toast)
    }
}
</script>