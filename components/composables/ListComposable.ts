import { table } from "../../stores/table"
import { onMounted, onUpdated } from "vue"

const useReadTable = (row: Array<any>, head: Array<any>, actions: Array<any>) => {
    onMounted(async () => {
        await ReadListData()
        await DefineActionsChatData()
    })

    const ReadListData = async () => {
        table().SetTableData(head, row)
    }

    const DefineActionsChatData = async () => {
        table().SetActions(actions)
    }
}

export {
    useReadTable
}