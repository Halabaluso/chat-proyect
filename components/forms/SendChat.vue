<template>
    <form @submit.prevent="SendMsg">
        <div class="bg-neutral p-5">
            <div class="flex flex-row justify-between gap-2">
                <input v-model="state.msg" type="text" placeholder="Escribe un mensaje"
                    class="input input-bordered w-full" />
                <button type="submit" class="btn">
                    <Icon name="mingcute:send-plane-fill" class="text-2xl" />
                </button>
            </div>
        </div>
    </form>
</template>
<script setup lang = "ts">
import type { ChatMsg, ChatConnectDb } from "../../dbconnect/interfaces/DbInterfaces"
import type { MsgModel } from "../../stores/StoresInterfaces"
import { chats } from "../../stores/chat"
import { alert } from "../../stores/alert"
import { loading } from "../../stores/loading"
import moment from "moment"
import { nanoid } from "nanoid"
const state = reactive({
    msg: "" as string
})
const alertState = alert()
const chatState = chats()
const SendMsg = async () => {
    if (state.msg.length > 0) {
        loading().ShowLoader()
        const object: ChatMsg = {
            dayFormat: moment().format("DD-MM-YYYY"),
            whenFormat: moment().format("HH:mm:ss"),
            whenNumber: Date.now(),
            from: "admin",
            msg: state.msg,
            id: nanoid()
        }
        const response = await chatState.UpdateChatMsg(chatState.chat._id, object)
        if (response.err === true) {
            const toast: MsgModel = {
                msg: "Error al enviar mensaje.",
                time: 1500,
                type: "alert-error"
            }
            alertState.ShowToast(toast)
            loading().ShowLoader()
        }else{
            const responseDb = await chatState.GetChatFromDb(chatState.chat._id)
            if(responseDb?.serverResponse?.response.object !== undefined){
                chatState.chat = JSON.parse(responseDb?.serverResponse?.response.object)[0] as ChatConnectDb
                console.log(chatState.chat)
            }
            loading().ShowLoader()
        }
        
    } else {
        const toast: MsgModel = {
            msg: "Campo vacío.",
            time: 1500,
            type: "alert-warning"
        }
        alertState.ShowToast(toast)
    }
}
</script>