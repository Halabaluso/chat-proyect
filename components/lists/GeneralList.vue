
import type { data } from 'cypress/types/jquery';
<template>
    <div class="overflow-x-auto">
        <table class="table">
            <!-- head -->
            <thead>
                <tr>
                    <template v-for="option in props.options" :key="option">
                        <th>{{ option.name }}</th>
                    </template>
                </tr>
            </thead>
            <tbody>
                <!-- row 1 -->
                <template>
                    <template v-for="(tableData, i) in state.tableData" :key="i">
                        <tr>
                            <th v-for="data in tableData" :key="data._id">{{ data }}</th>
                        </tr>
                    </template>
                </template>
            </tbody>
        </table>
    </div>
</template>
<script setup lang="ts">
interface OptionProp {
    name: string
}
const props = defineProps({
    options: Array<OptionProp>,
    data: Function
})

const state = reactive({
    tableData: [] as Array<any>
})

onMounted(async() => {
    await ReadTableData()
})

const ReadTableData = async () => {
    if(props.data !== undefined){
        const response = await props.data()
        console.log(response)
        state.tableData = response
    }
}
</script>
