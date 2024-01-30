import { defineStore } from "pinia"

interface ActionsObject{
    name: string,
    action: Function
}

const table = defineStore("table", {
    state() {
        return{
            head: [] as Array<any>,
            row: [] as Array<any>,
            actions: [] as Array<ActionsObject>,
            selectedData: {} as any
        }
    },
    actions:{
        SetTableData(head: Array<string>, row: Array<object>){
            this.head = []
            this.row = []
            this.head = head
            this.row = row
        },
        SetActions(actions: Array<ActionsObject>){
            this.actions = []
            this.actions = actions
        },
        SetData(indexArray: number){
            const find = this.row.find((element, i) => i === indexArray)
            this.selectedData = find
        },
        UploadRows(row: Array<object>){
            this.row = []
            this.row = row
        }
    }
})

export { 
    table
 }