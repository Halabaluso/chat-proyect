//Interfaces import
import type { GeneralResponse, GeneralServerResponse, ChatConnectDb, ChatMsg} from "./interfaces/DbInterfaces";

const url = "/api/chats/create";
const url1 = "/api/chats/read";
const url2 = "/api/chats/delete";
const url3 = "/api/messages/update"
const url4 = "/api/messages/read"

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


const GetChatsDb = async (userId: string) => {
  try {
    let response: null | GeneralResponse = null;
      await fetch(url1, {
        method: "POST", 
        body: JSON.stringify({userId: userId})
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

const GetChatDb = async (_id: string) => {
  try {
    let response: null | GeneralResponse = null;
      await fetch(url4, {
        method: "POST", 
        body: JSON.stringify({_id: _id})
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

const DeleteChatDb = async (_id: string) => {
  try {
    let response: GeneralResponse = {
      err: false,
      serverMsg: "",
    };
    await fetch(url2, {
      method: "POST",
      body: JSON.stringify({_id: _id}),
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
}

const UpdateChatDb = async (_id: string, chat: ChatMsg) => {
  try {
    let response: GeneralResponse = {
      err: false,
      serverMsg: "",
    };
    await fetch(url3, {
      method: "POST",
      body: JSON.stringify({_id: _id, object: chat}),
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
}

export { GetChatsDb, SetChatDb, DeleteChatDb, UpdateChatDb, GetChatDb };