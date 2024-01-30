
import type { data } from 'cypress/types/jquery';
<template>
    <div class="overflow-x-auto">
        <table class="table">
            <!-- head -->
            <thead>
                <tr>
                    <template v-for="data in tableStore.head" :key="data">
                        <th>{{ data }}</th>
                    </template>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <!-- row 1 -->
                <template v-for="(row, i) in tableStore.row" :key="row">
                    <template v-if="i > state.startRowsTable && i < state.endRowsTable">
                        <tr>
                            <template v-for="data in row" :key="data">
                                <th>
                                    <p class="font-normal">{{ data }}</p>
                                </th>
                            </template>
                            <th class="flex flex-row gap-2">
                                <template v-for="actions in tableStore.actions" :key="actions">
                                    <button @click="actions.action(i)" class="btn" :class="actions.class">
                                        <Icon :name="actions.icon" />{{ actions.name }}
                                    </button>
                                </template>
                            </th>
                        </tr>
                    </template>
                </template>

                <!-- row 2 -->
            </tbody>
        </table>
        <div class="flex flex-row justify-center items-center mt-5">
            <button @click="BackPage" class="join-item btn btn-primary">«</button>
            <button class="join-item btn btn-ghost">Página {{ state.page }}</button>
            <button @click="NextPage" class="join-item btn btn-primary">»</button>
        </div>
    </div>
</template>
<script setup lang = "ts">
import { table } from "../../stores/table";
const tableStore = table();
const state = reactive({
    page: 1,
    startRowsTable: 0,
    endRowsTable: 10,
    showRowsPerPage: 10,
})

const NextPage = () => {
    if ((tableStore.row.length - 10) > (state.startRowsTable)) {
        state.page = state.page + 1
        state.startRowsTable = state.startRowsTable + state.showRowsPerPage
    }
}
const BackPage = () => {
    if (state.page > 1) {
        state.page = state.page - 1
        state.startRowsTable = state.endRowsTable - state.showRowsPerPage
    }
}
</script>
