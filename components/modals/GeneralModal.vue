<template>
    <dialog :id="storeModal.id" class="modal modal-bottom sm:modal-middle" :class="{'modal-open': storeModal.show}">
        <div class="modal-box">
            <h3 class="font-bold text-lg">{{ storeModal.modalObject.title }}</h3>
            <div class="py-4">
                
            </div>
            <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button  @click="storeModal.modalObject.action"> {{ storeModal.modalObject.nameAction }} </button>
                    <button @click="storeModal.OpenModal(false)" class="btn">Cerrar</button>
                </form>
            </div>
        </div>
    </dialog>
</template>
<script setup lang = "ts">
    import { modal } from "../../stores/modal"
    const storeModal = modal()
</script>
