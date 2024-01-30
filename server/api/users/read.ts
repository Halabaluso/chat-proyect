import { mongoose, ConnectFunction } from "../../mongo/connect"
import { UserSchema } from "../../mongo/schemas/UserSchema"

interface BodyInterface {
    email: string,
    password: string
}

interface ServerResponse {
    err: boolean, 
    code: string, 
    msg: string,
    object: string
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
            const User = mongoose.model('users', UserSchema);
            const responsedb = await User.find({email: body.email, password: body.password}).exec()
            response.object = JSON.stringify(responsedb)
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