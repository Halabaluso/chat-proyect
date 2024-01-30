import { defineStore } from "pinia"
import { GetUserDb, SetUserDb } from "../dbconnect/UserConnect"
import type { UserConnectDb } from "../dbconnect/interfaces/DbInterfaces"

const user = defineStore("login", {
    state() {
        return {
            user: {} as UserConnectDb,
            changeForm: false as boolean
        }
    },
    actions:{
        SetUser(email: string, password: string){
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
            if(response?.err === false){
                const stringJson = JSON.parse(response?.serverResponse?.response.object as string)
                this.user = stringJson[0]
            }
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