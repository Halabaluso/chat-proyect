
import mongoose from "mongoose"
const user = process.env.USER
const password = process.env.PASSWORD
const uri = `mongodb+srv://${user}:${password}@mycluster.cbncbaq.mongodb.net/chatapp?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version


interface ConnectResponse {
    err: boolean, 
    msg: string,
    code: string
}

const ConnectFunction = async () => {
    try {
        await mongoose.connect(uri);
        let response: ConnectResponse = {
            err: false, 
            msg: "Conexión realizada",
            code: "200"
        }
        return response
    } catch (error: any) {
        let response: ConnectResponse = {
            err: true, 
            msg: "Conexión fallida",
            code: error.code
        }
        console.log(error)
        return response
    }
}

export {
    ConnectFunction,
    mongoose
}