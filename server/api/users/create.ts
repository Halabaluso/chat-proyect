import { mongoose, ConnectFunction } from "../../mongo/connect"
import { UserSchema } from "../../mongo/schemas/UserSchema"

interface BodyInterface {
        name: String,
        lastname: String,
        email: String,
        password: String,
        when_register: String,
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
            const User = mongoose.model('users', UserSchema);
            const newUser = new User(body);
            await newUser.save();
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