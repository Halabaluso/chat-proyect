import { defineStore } from "pinia"
import { GetUserDb, SetUserDb } from "../dbconnect/UserConnect"
import type { UserConnectDb } from "../dbconnect/interfaces/DbInterfaces"

const user = defineStore("login", {
    state() {
        return {
            user: {} as any,
            changeForm: false as boolean
        }
    },
    actions:{
        SetUser(email: String, password: String){
            this.user.email = email
            this.user.password = password
        },
        GetUserLocal(){
            return this.user
        },
        async SetUserFromDb(user: UserConnectDb){
            const response = await SetUserDb(user)
            return response
        },
        async GetUserFromDb(email: string, password: string){
            const response = await GetUserDb(email, password)
            return response
        },
        SetChangeForm(change: boolean){
            this.changeForm = change
        }
    }
})

export {
    user
}