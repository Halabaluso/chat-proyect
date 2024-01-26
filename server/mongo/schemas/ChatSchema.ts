import mongoose from "mongoose"


const Schema = mongoose.Schema
const ChatSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    chats: {
        type: Object
    },
    userId: {
        type: String, 
        required: true
    },
    when_created: {
        type: String,
        require: true
    },
    when_created_id: {
        type: String,
        require: true
    },
}, {
    collection : "chats",
    strict: true,
    strictQuery: "throw"

})

export {
    ChatSchema
}