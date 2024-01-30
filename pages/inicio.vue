<template>
    <div>
        <CommonsTabs :slots=slots>
            <template v-slot:newchat>
                <FormsNewChat />
            </template>
            <template v-slot:list>
                <Suspense>
                <ListsGeneralList />
            </Suspense>
            </template>
        </CommonsTabs>

    </div>
</template>

<script setup lang="ts">
import copy from 'copy-text-to-clipboard';
import { chats } from "../stores/chat"
import { alert } from "../stores/alert"
import { loading } from "../stores/loading"
import { table } from "../stores/table"
import { useReadTable } from "../components/composables/ListComposable"
import type { MsgModel } from "../stores/StoresInterfaces"
import type { ChatConnectDb } from "../dbconnect/interfaces/DbInterfaces"
const slots = [{slot: "newchat",name: "Nuevo chat"},{slot: "list",name: "Chats"}]
chats().GetSimpleChatsFromDb()
const row = ["Nombre", "ID chat", "Contraseña"]
let actionsTable = [
    {
        name: "",
        class: "btn-primary",
        icon: "material-symbols:share",
        action: (indexArray: number) => {
            table().SetData(indexArray)
            const object = table().selectedData
            let url = `?_id=${object._id}&password=${object.password}`
            copy(url)
            let toast:MsgModel = {
                msg: "Link copiado 📣.",
                type: "alert-success",
                time: 3000
            }
            alert().ShowToast(toast)
            
        }
    },
    {
        name: "",
        class: "btn-error",
        icon: "material-symbols:delete-outline",
        action: async (indexArray: number) => {
            loading().ShowLoader()
            table().SetData(indexArray)
            const object = table().selectedData
            await chats().DeleteChatFromDb(object._id)
            let toast:MsgModel = {
                msg: "Chat eliminado.",
                type: "alert-warning",
                time: 3000
            }
            chats().GetSimpleChatsFromDb()
            table().UploadRows(chats().simpleChats)
            alert().ShowToast(toast)
            loading().ShowLoader()
        }
    }
]
useReadTable(chats().simpleChats, row, actionsTable)
</script>

<style></style>