<template>
  <section>
    <slot name = "title"></slot>
    <h1 class="font-bold text-lg text-primary">
      <Icon
        name="material-symbols-light:business-messages-outline-rounded"
        class="text-2xl"
      />
      Nuevo chat
    </h1>
    <form @submit.prevent="SendFormData">
      <div class="grid grid-cols-2 gap-5">
        <div>
          <div class="label">
            <span class="label-text">
              <Icon name="material-symbols:drive-file-rename-outline-outline" />
              Nombre de chat
            </span>
          </div>
          <input
          id = "chatname"
            v-model="state.name"
            type="text"
            placeholder="Introduzca su email"
            class="input input-bordered w-full"
          />
        </div>
        <div>
          <div class="label">
            <span class="label-text">
              <Icon name="material-symbols:password"></Icon> Contraseña
            </span>
          </div>
          <div class="flex flex-row items-center gap-2">
            <input
            id = "chatpassword"
              v-model="state.password"
              type="text"
              placeholder="Introduzca su email"
              class="input input-bordered w-full"
            />
            <button type="button" @click="CreatePass" class="btn">
              <Icon name="solar:password-minimalistic-input-linear"></Icon>
            </button>
          </div>
        </div>
      </div>
      <div class="mt-2">
        <div class="label">
          <span class="label-text">
            <Icon name="material-symbols:android-messages" /> Mensaje inicial
          </span>
        </div>
        <textarea
        id = "chatconversation"
          v-model="state.msg"
          class="textarea textarea-bordered textarea-lg w-full"
          placeholder="Comienza tu mensaje de chat aquí"
        ></textarea>
      </div>
      <div class="grid grid-cols-2 gap-5 mt-5">
        <button type="submit" class="btn w-full btn-primary">
          Comenzar chat
          <Icon name="tabler:message-2-share" />
        </button>
        <button
          type="button"
          @click="ResetData"
          class="btn w-full btn-secondary"
        >
          Resetear
          <Icon name="material-symbols:cancel-presentation-outline" />
        </button>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
//Imports
import { nanoid } from "nanoid";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { chats } from "../../stores/chat";
import { table } from "../../stores/table";
import { user } from "../../stores/user";
import { alert } from "../../stores/alert";
import { loading } from "../../stores/loading"
import type { MsgModel } from "../../stores/StoresInterfaces";
import type { ChatConnectDb } from "../../dbconnect/interfaces/DbInterfaces";
import moment from "moment";

const state = reactive({
  name: "" as string,
  password: "" as string,
  msg: "" as string,
});
const rulesForm = {
  name: {
    required,
    minLength: minLength(4),
  },
  msg: {
    required,
    minLength: minLength(3),
  },
  password: {
    required,
    minLength: minLength(8),
  },
};
const chatsStore = chats();
const userStore = user();
const toastStore = alert();
const $v = useVuelidate(rulesForm, state);
const msgResponse = computed(() => {
  let response: ChatConnectDb = {
    name: state.name,
    password: state.password,
    userId: userStore.user._id,
    when_created: moment().format(),
    when_created_id: Date.now().toString(),
  };
  return response;
});
let toastMsg: MsgModel = {
  msg: "",
  time: 0, 
  type: "alert-info"
}

//Funciones
const CreatePass = () => {
  state.password = nanoid();
};
const ResetData = () => {
  (state.name = ""), (state.password = ""), (state.msg = "");
};
const SendFormData = async () => {
  const response = await $v.value.$validate();
  if (response) {
    loading().ShowLoader()
    await chatsStore.SetChatFromDb(msgResponse.value);
    toastMsg.msg = "Chat creado correctamente"
    toastMsg.time = 3000
    toastMsg.type = "alert-success"
    toastStore.ShowToast(toastMsg)
    await chatsStore.GetSimpleChatsFromDb()
    table().UploadRows(chats().simpleChats)
    loading().ShowLoader()
  } else {
    toastMsg.msg = "Rellene todos los campos"
    toastMsg.time = 3000
    toastMsg.type = "alert-warning"
    toastStore.ShowToast(toastMsg)
  }
};
</script>

<style></style>