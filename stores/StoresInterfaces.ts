interface MsgModel {
  show?: boolean;
  msg: string;
  time: number;
  type: string;
}

type TypeAlert =
  | "alert-info"
  | "alert-error"
  | "alert-success"
  | "alert-warning";

export type { MsgModel, TypeAlert };
