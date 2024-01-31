import { defineStore } from "pinia";
import { SetChatDb, GetChatsDb, DeleteChatDb, UpdateChatDb } from "../dbconnect/ChatConnect";
import { user } from "./user"
import type { ChatConnectDb, ChatMsg } from "../dbconnect/interfaces/DbInterfaces";

interface SimpleChat{
  name: string,
  _id: string, 
  password: string
}

type WhereSearchChat = "simple" | "normal"

const chats = defineStore("chats", {
  state() {
    return {
      chat: {} as ChatConnectDb,
      chats: [] as Array<ChatConnectDb>,
      simpleChat: {} as SimpleChat,
      simpleChats: [] as Array<SimpleChat>
    };
  },
  actions: {
    async SetChat(object: SimpleChat){
      this.simpleChat = object
    },
    async SetChatFromDb(object: ChatConnectDb) {
      const response = SetChatDb(object);
      return response;
    },
    async GetChatSelected(id: number, from: WhereSearchChat){
      if(from === "simple"){
          this.chat = this.chats[id]
      }
      if(from === "normal"){
        const findElement = this.chats.find((element, i) => i == id)
        if(findElement !== undefined){
          this.chat = findElement
        }
      }
    },
    async GetChatsFromDb() {
      this.chats = []
      const response = await GetChatsDb(user().user._id);
      if(response?.err === false){
        const chatsString = response.serverResponse?.response.object as string
        this.chats = JSON.parse(chatsString)
      }else{
        this.chats = []
      }
      return response;
    },
    async GetSimpleChatsFromDb(){
      const response = await this.GetChatsFromDb()
      if(response?.err === false){
        this.chats.forEach(element => {
          let object:SimpleChat = {
            name: element.name,
            _id: element._id,
            password: element.password
          }
          this.simpleChats.push(object)
        })
        
      }else{
        this.simpleChats = []
      }
      return response;
    },
    async UpdateChatMsg(id: string, object: ChatMsg){
      const response = UpdateChatDb(id, object)
      return response
    },
    async DeleteChatFromDb(_id: string){
      let response = await DeleteChatDb(_id)
      console.log(response)
      return response 
    },
  },
});

export { chats };
