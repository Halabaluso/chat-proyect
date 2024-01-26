<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <form @submit.prevent="login" class="flex flex-col gap-2">
      <h1 class="text-center text-4xl font-bold">Chatstore</h1>
      <p class="text-center text-primary mb-5">Iniciar sesión</p>
      <div>
        <div class="label">
          <span class="label-text">Email</span>
        </div>
        <input v-model="state.email" type="text" placeholder="Introduzca su email"
          class="input input-bordered w-full max-w-xs" />
      </div>
      <div>
        <div class="label">
          <span class="label-text">Contraseña</span>
        </div>
        <input v-model="state.password" type="password" placeholder="Introduzca su email"
          class="input input-bordered w-full max-w-xs" />
      </div>
      <div class="flex flex-col gap-2 mt-5">
        <button type="submit" class="btn btn-primary">
          <Icon name="material-symbols:chat-paste-go-outline-rounded" class="text-xl"></Icon>Acceder
        </button>
        <button @click="userStore.SetChangeForm(true)" type="button" class="btn">
          <Icon name="ic:round-app-registration" class="text-xl"></Icon>Registro
        </button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
//Import de modulos
import { user } from "../../stores/user";
import { alert } from "../../stores/alert";
import { loading } from "../../stores/loading"
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";

//Import de tipos
import type { MsgModel } from "../../stores/StoresInterfaces";


//Variables
const state = reactive({
  email: "" as string,
  password: "" as string,
});

const rulesForm = {
  email: {
    required,
    email,
  },
  password: {
    required,
    minLength: minLength(8),
  },
};
const alertMsg: MsgModel = {
  msg: "",
  time: 0,
  type: "alert-success",
};
const v$ = useVuelidate(rulesForm, state);
const router = useRouter()
const userStore = user();
const alertStore = alert();
const loadingStore = loading();

//Functions
//Functions login
const login = async () => {
  const validateForm = await v$.value.$validate();
  if (validateForm) {
    loadingStore.ShowLoader()
    const response = await userStore.GetUserFromDb(state.email, state.password)
    if(response?.err === false){
      loadingStore.ShowLoader()
      alertMsg.msg = "Bienvenido";
      alertMsg.type = "alert-success"
      alertMsg.time = 3000;
      if(response?.serverResponse?.response.object !== undefined){
        const userJson = JSON.parse(response?.serverResponse?.response.object)
        userStore.user = userJson[0]
      }
      alertStore.ShowToast(alertMsg);
      router.push("/inicio")
    }else{
      loadingStore.ShowLoader()
      alertMsg.msg = "Usuario no encontrado";
      alertMsg.type = "alert-error"
      alertMsg.time = 3000;
      alertStore.ShowToast(alertMsg);
    }
  } else {
    alertMsg.msg = "Campos incorrectos";
    alertMsg.type = "alert-warning"
    alertMsg.time = 3000;
    alertStore.ShowToast(alertMsg);
  }
};
</script>
