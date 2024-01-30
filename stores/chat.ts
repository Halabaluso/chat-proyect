import { defineStore } from "pinia";
import { SetChatDb, GetChatsDb } from "../dbconnect/ChatConnect";
import type { ChatConnectDb } from "../dbconnect/interfaces/DbInterfaces";

const chats = defineStore("chats", {
  state() {
    return {
      chat: {} as ChatConnectDb,
      chats: [] as Array<ChatConnectDb>,
    };
  },
  actions: {
    async SetChatFromDb(object: ChatConnectDb) {
      const response = SetChatDb(object);
      return response;
    },
    async GetChatsFromDb(id: string) {
      const response = await GetChatsDb(id);
      if(response?.err === false){
        const chatsString = response.serverResponse?.response.object as string
        this.chats = JSON.parse(chatsString)
      }else{
        this.chats = []
      }
      return response;
    },
  },
});

export { chats };
