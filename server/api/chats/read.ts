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
    msg: string,
    object: any
}

export default defineEventHandler(async (event) => {
    try {
        const response:ServerResponse = {
            err: false, 
            msg: "Usuario correcto",
            code: "200",
            object: ""
        }
        const bodyString = await readBody(event)
        const body:BodyInterface = JSON.parse(bodyString)
        const connectDb = await ConnectFunction()
        if(connectDb.err === false){
            const Chat = mongoose.model('chats', ChatSchema);
            const responsedb = await Chat.find({userId: body.userId}).exec()
            if(responsedb.length > 0){
                response.object = JSON.stringify(responsedb)
            }else{
                response.err = true
                response.msg = "Ningún usuario encontrado"
            }
        }else{
            response.err = true,
            response.msg = "Error de conexión a servidor"
        }
        return{
            response
        }   
    } catch (error: any) {
        const response:ServerResponse = {
            err: false, 
            msg: error.toString(),
            code: "400",
            object: ""
        }
        return{
            response
        }   
    }
})