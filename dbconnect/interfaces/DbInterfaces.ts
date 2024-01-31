interface GeneralServerResponse {
    response: {
        code: string, 
        err: boolean, 
        msg: string,
        object?: string
    }
}

interface GeneralResponse {
    err: boolean,
    serverResponse?: GeneralServerResponse,
    serverMsg: string
}

interface ChatMsg{
    dayFormat: string,
    whenFormat: string,
    whenNumber: number,
    from: "admin" | "user",
    msg: string,
    id: string
}

interface ChatConnectDb {
    name: string,
    password: string,
    chats?: Array<ChatMsg>,
    userId: string,
    when_created: string,
    when_created_id: string,
    _id: string,
}

interface UserConnectDb {
    name: string,
    lastname: string,
    email: string,
    password: string,
    when_register: string,
    _id: string
}

export type {
    GeneralResponse,
    GeneralServerResponse,
    UserConnectDb,
    ChatConnectDb,
    ChatMsg
}