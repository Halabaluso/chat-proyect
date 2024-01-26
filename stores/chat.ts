import { defineStore } from "pinia";
import { SetChatDb } from "../dbconnect/ChatConnect";
import type { ChatConnectDb } from "../dbconnect/interfaces/DbInterfaces";

const chats = defineStore("chats", {
  state() {
    return {
      chat: {} as any,
      allChats: {} as any,
    };
  },
  actions: {
    async SetChatFromDb(object: ChatConnectDb) {
      const response = SetChatDb(object);
      return response;
    },
  },
});

export { chats };
