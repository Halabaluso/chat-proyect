interface MsgModel {
  show?: boolean;
  msg: string;
  time: number;
  type: string;
}

interface ModalObject{
  title: string,
  action: Function,
  nameAction: string
  idModal: string
}

type TypeAlert =
  | "alert-info"
  | "alert-error"
  | "alert-success"
  | "alert-warning";

export type { MsgModel, TypeAlert, ModalObject };
