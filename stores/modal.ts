import { defineStore } from "pinia"


interface ModalObject{
    title: string,
    action: Function,
    nameAction: string
}

const modal = defineStore("modal", {
    state: () => ({
        show: false,
        id: "" as string,
        modalObject: {} as ModalObject
    }),
    actions:{
        OpenModal(open: boolean, id?: string){
            this.show = open
            if(id !== undefined){
                this.id = id
            }
        }
    }
})

export {
    modal
}
