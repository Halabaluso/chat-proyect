<template>
  <div class="flex flex-col items-center justify-center w-screen min-h-screen">
    <form @submit.prevent="Login" class="flex flex-col gap-2 p-5">
      <h1 class="text-center text-4xl font-bold">Chatstore</h1>
      <p class="text-center text-primary mb-5">Registro en Chatstore</p>
      <!--Email-->
      <div>
        <div class="label">
          <span class="label-text">Email</span>
        </div>
        <input
          id = "email"
          v-model="state.email"
          type="text"
          placeholder="Introduzca su email"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <!--Nombre-->
      <div>
        <div class="label">
          <span class="label-text">Nombre</span>
        </div>
        <input
        id = "name"
          v-model="state.name"
          type="text"
          placeholder="Introduzca su nombre"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <!--Apellidos-->
      <div>
        <div class="label">
          <span class="label-text">Apellidos</span>
        </div>
        <input
        id = "lastname"
          v-model="state.lastname"
          type="text"
          placeholder="Introduzca sus apellidos"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <!--Contraseñas-->
      <div>
        <div class="label">
          <span class="label-text">Contraseña</span>
        </div>
        <input
        id = "password"
          v-model="state.password"
          type="password"
          placeholder="Introduzca su email"
          class="input input-bordered w-full max-w-xs"
        />
        <div class="label">
          <span class="label-text">Repetir contraseña</span>
        </div>
        <input
        id = "repeatpassword"
          v-model="state.repeatPassword"
          type="password"
          placeholder="Introduzca su email"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <div class="flex flex-col gap-2 mt-5">
        <button type="submit" class="btn btn-primary">
          <Icon
            name="material-symbols:chat-paste-go-outline-rounded"
            class="text-xl"
          ></Icon
          >Registrarse
        </button>
        <button
          @click="userStore.SetChangeForm(false)"
          type="button"
          class="btn"
        >
          <Icon name="ic:round-app-registration" class="text-xl"></Icon>Atrás
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
//Imports
import { user } from "../../stores/user";
import { alert } from "../../stores/alert";
import { loading } from "../../stores/loading"
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";



//Types imports
import type { MsgModel } from "../../stores/StoresInterfaces";
import type { UserConnectDb } from "../../dbconnect/interfaces/DbInterfaces";

//Variables
const router = useRouter()
const userStore = user();
const alertStore = alert();
const loadStore = loading()
const state = reactive({
  email: "",
  name: "",
  lastname: "",
  password: "",
  repeatPassword: "",
});

const rulesForm = {
  email: { required, email },
  name: {
    required,
    minLength: minLength(2),
  },
  lastname: {
    required,
    minLength: minLength(3),
  },
  password: {
    required,
    minLength: minLength(8),
  },
  repeatPassword: {
    required,
    minLength: minLength(8),
    sameAs: sameAs(computed(() => state.repeatPassword)),
  },
};

let objectToast: MsgModel = {
  msg: "Usuario registrado.",
  type: "alert-success",
  time: 2000,
};

//Functions
//Function form validation
const v$ = useVuelidate(rulesForm, state);
//Funcion login
const Login = async () => {
  if (await ValidateForm()) {
    loadStore.ShowLoader()
    let object: UserConnectDb = {
      email: state.email,
      lastname: state.lastname,
      name: state.name,
      password: state.password,
      when_register: Date.now().toString(),
    };
    const response = await userStore.SetUserFromDb(object);
    if (response.err === false) {
      loadStore.ShowLoader()
      objectToast.msg = "Usuario registrado";
      userStore.user = object
      router.push("/inicio")
      alertStore.ShowToast(objectToast);
    } else {
      loadStore.ShowLoader()
      objectToast.msg = "Error al registrar usuario.";
      objectToast.type = "alert-error";
      alertStore.ShowToast(objectToast);
    }
  } else {
    loadStore.ShowLoader()
    objectToast.msg = "Complete bien todos los campos";
    objectToast.type = "alert-error";
    alertStore.ShowToast(objectToast);
  }
};

//Validate function
const ValidateForm = async () => {
  const formValidation = await v$.value.$validate();
  return formValidation;
};
</script>

