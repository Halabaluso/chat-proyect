//Interfaces import
import type { GeneralResponse, GeneralServerResponse, ChatConnectDb } from "./interfaces/DbInterfaces";

const url = "/api/chats/create";
const url1 = "/api/users/read";

const SetChatDb = async (object: ChatConnectDb) => {
  try {
    let response: GeneralResponse = {
      err: false,
      serverMsg: "",
    };
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(object),
    })
      .then((data) => {
        return data.json();
      })
      .then((data: GeneralServerResponse) => {
        response.err = data.response.err
        response.serverMsg = data.response.msg
        response.serverResponse = data
      })
      .catch(() => {
        response.err = true;
        response.serverMsg = "Conexión no realizada.";
      });
    return response;
  } catch (error) {
    let response: GeneralResponse = {
      err: true,
      serverMsg: "Problema al conectar con servidor.",
    };
    return response;
  }
};

const GetChatDb = async (chatid: string) => {
  try {
    let response: null | GeneralResponse = null;
      await fetch(url1, {
        method: "POST", 
        body: JSON.stringify({chatid: chatid})
      })
    .then((data) => {
      return data.json()
    })
    .then((data:GeneralServerResponse) => {
      if(data !== null){
        response = {
          err: data.response.err,
          serverMsg: data.response.msg,
          serverResponse: data
        }
      }
    })
    .catch(() => {
      response = {
        err: true,
        serverMsg: "Error de conexión",
      }
    })
    return response
  } catch (error) {
    let response:GeneralResponse = {
      err: true,
      serverMsg: "Error de conexión",
    }
    return response
  }
}
export { GetChatDb, SetChatDb };