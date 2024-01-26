import { mongoose, ConnectFunction } from "../../mongo/connect"
import { ChatSchema } from "../../mongo/schemas/ChatSchema"

interface BodyInterface {
    name: string,
    password: string,
    chats?: object,
    userId: string,
    when_created: string,
    when_created_id: string
}

interface ServerResponse {
    err: boolean, 
    code: string, 
    msg: string
}

export default defineEventHandler(async (event) => {
    try {
        const response:ServerResponse = {
            err: false, 
            msg: "Object created",
            code: "200"
        }

        const bodyString:string = await readBody(event)
        const body:BodyInterface = JSON.parse(bodyString)
        const connectDb = await ConnectFunction()
        if(connectDb.err === false){
            const Chat = mongoose.model('chats', ChatSchema);
            const newChat = new Chat(body);
            await newChat.save();
        }else{
            response.err = true,
            response.msg = "Error de conexión a servidor"
        }
        return{
            response
        }   
    } catch (error: any) {
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