import { find } from "cypress/types/lodash"
import { mongoose, ConnectFunction } from "../../mongo/connect"
import { ChatSchema } from "../../mongo/schemas/ChatSchema"

interface ChatMsg{
    dayFormat: string,
    whenFormat: string,
    whenNumber: number,
    from: "admin" | "user",
    msg: string,
    id: string
}

interface BodyInterface {
    _id: string,
    object: ChatMsg
}

interface ChatModel {
    name: string,
    password: string,
    chats?: Array<ChatMsg>,
    userId: string,
    when_created: string,
    when_created_id: string,
    _id: string,
}

interface ServerResponse {
    err: boolean, 
    code: string, 
    msg: string,
    object?: ChatModel
}

export default defineEventHandler(async (event) => {
    try {
        const response:ServerResponse = {
            err: false, 
            msg: "Object updated",
            code: "200",
        }

        const bodyString:string = await readBody(event)
        console.log(bodyString)
        const body:BodyInterface = JSON.parse(bodyString)
        console.log(body.object)
        const connectDb = await ConnectFunction()
        if(connectDb.err === false){
            const Chat = mongoose.model('chats', ChatSchema);
            await Chat.findOneAndUpdate({_id: body._id}, {$push: {chats: body.object}}).then(() => {
                response.msg = "Chat updated"
            })
            .catch(() => {
                response.err = true
                response.msg = "Error al hacer update de mensaje"
            })
        }else{
            response.err = true
            response.msg = "Error de conexión a servidor"
        }
        return{
            response
        }   
    } catch (error: any) {
        console.log(error)
        const response:ServerResponse = {
            err: true, 
            msg: error.toString(),
            code: "400"
        }
        return{
            response
        }   
    }
})