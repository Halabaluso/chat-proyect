import { mongoose, ConnectFunction } from "../../mongo/connect"
import { ChatSchema } from "../../mongo/schemas/ChatSchema"

interface BodyInterface {
    _id?: string
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
            Chat.deleteOne({_id : body._id})
                .then(() => {
                    response.err = false
                    response.msg = "Chat borrado"
                })
                .catch(() => {
                    response.err = true
                    response.msg = "Error al borrar chat"
                })
            
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