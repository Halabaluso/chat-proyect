<template>
    <div>
        <CommonsTabs :slots=slots>
            <template v-slot:newchat>
                <FormsNewChat />
            </template>
            <template v-slot:list>
                <Suspense>
                <ListsGeneralList :data=ReadTableData :options=optionsList />
            </Suspense>
            </template>
        </CommonsTabs>

    </div>
</template>

<script setup lang="ts">
import { user } from "../stores/user"
import { chats } from "../stores/chat"
import { loading } from "../stores/loading"
import type { ChatConnectDb } from "../dbconnect/interfaces/DbInterfaces"
const slots = [
    {
        slot: "newchat",
        name: "Nuevo chat"
    },
    {
        slot: "list",
        name: "Chats"
    }
]

const optionsList = [
    { name: "Nombre chat" },
    { name: "Identificador" },
    { name: "Contraseña" },
]


const ReadTableData = async () => {
    loading().ShowLoader()
    const userData = user().user
    await chats().GetChatsFromDb(userData._id)
    let objectToSend = TransformObject(chats().chats)
    loading().ShowLoader()
    return objectToSend
}

const TransformObject = async (object: Array<ChatConnectDb>) => {
    let newArray: Array<any> = []
    object.forEach(element => {
        let response: any = {
            Nombre: element.name,
            ID: element._id,
            Contraseña: element.password,
        }
        newArray.push(response)
    })
    return newArray

}


</script>

<style></style>