
<template>
    <div class="overflow-x-auto ">
        <select class="select select-bordered w-full max-w-xs">
            <option disabled selected>Acciones</option>
            <option>Eliminar</option>
            <option v-for="(actions, i) in props.actions" :key="i"></option>
        </select>
        <table class="table">

            <!-- head -->
            <thead>
                <tr>
                    <th><input type="checkbox" checked="checked" class="checkbox" /></th>
                    <template v-for="option in props.options" :key="option">
                        <th>{{ option.name }}</th>
                    </template>
                </tr>
            </thead>
            <tbody>
                <!-- row 1 -->
                <template v-if="showTable">
                    <template v-for="(tableData, i) in state.tableData" :key="i">
                        <tr>
                            <th><input type="checkbox" class="checkbox items-center" /></th>
                            <th v-for="data in tableData" :key="data._id">
                                <p class="font-normal">{{ data }}</p>
                            </th>
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
interface ActionProp{
    name: string,
    action: Function
}
const props = defineProps({
    options: Array<OptionProp>,
    data: Function,
    actions: Array<ActionProp>
})

const state = reactive({
    tableData: [] as Array<any>
})

onMounted(async () => {
    await ReadTableData()
})

const ReadTableData = async () => {
    if (props.data !== undefined) {
        const response = await props.data()
        state.tableData = response
    }
}
const showTable = computed(() => {
    let response = false
    if (state.tableData.length > 0) {
        response = true
    }
    return response
})
</script>
