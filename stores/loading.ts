import { defineStore } from "pinia"

const loading = defineStore("loading", {
    state() {
        return{
            show: false
        }
    },
    actions:{
        ShowLoader(){
            if(this.show === false){
                this.show = true
            }else{
                this.show = false
            }
        }
    }
})

export {
    loading
}