import { defineStore } from "pinia"
import type { MsgModel, TypeAlert } from "./StoresInterfaces"

const alert = defineStore("alert", {
    state: () => ({
        msg: "",
        show: false,
        time: 2000, 
        type: "alert-info" as TypeAlert
    } as MsgModel),
    actions:{
        ShowToast(object: MsgModel){
            this.msg = object.msg,
            this.show = true
            this.time = object.time
            this.type = object.type

            setTimeout(() => {
                this.show = false
            }, object.time)
        }
    }
})

export {
    alert
}