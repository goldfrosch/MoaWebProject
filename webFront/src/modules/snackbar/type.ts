import { getMessageAction, setMessageClearAction, setMessageErrorAction, setMessageInfoAction, setMessageSuccessAction, setMessageWarningAction } from './snackbar';

export interface ISnackMsgState {
  msg: string,
  types: "success" | "error" | "warning" | "info"
}

export type ISnackBarAction =
  | ReturnType<typeof getMessageAction>
  | ReturnType<typeof setMessageSuccessAction>
  | ReturnType<typeof setMessageErrorAction>
  | ReturnType<typeof setMessageInfoAction>
  | ReturnType<typeof setMessageWarningAction>
  | ReturnType<typeof setMessageClearAction>