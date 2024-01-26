import mongoose from "mongoose"


const Schema = mongoose.Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    when_register: {
        type: String,
        require: true
    },
}, {
    collection : "users",
    strict: true,
    strictQuery: "throw"

})

export {
    UserSchema
}