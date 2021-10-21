import { ISnackBarAction, ISnackMsgState } from "./type";

const GET_MESSAGE = "GET_MESSAGE" as const;

const SET_MESSAGE_SUCCESS = "SET_MESSAGE_SUCCESS" as const;
const SET_MESSAGE_ERROR = "SET_MESSAGE_ERROR" as const;
const SET_MESSAGE_INFO = "SET_MESSAGE_INFO" as const;
const SET_MESSAGE_WARNING = "SET_MESSAGE_WARNING" as const;
const SET_MESSAGE_CLEAR = "SET_MESSAGE_CLEAR" as const;

export const getMessageAction = () => ({
  type: GET_MESSAGE
});

export const setMessageSuccessAction = (msg: string) => ({
  type: SET_MESSAGE_SUCCESS,
  msg
});

export const setMessageErrorAction = (msg: string) => ({
  type: SET_MESSAGE_ERROR,
  msg
});

export const setMessageInfoAction = (msg: string) => ({
  type: SET_MESSAGE_INFO,
  msg
});

export const setMessageWarningAction = (msg: string) => ({
  type: SET_MESSAGE_WARNING,
  msg
});

export const setMessageClearAction = () => ({
  type: SET_MESSAGE_CLEAR
});

const initialState: ISnackMsgState = {
  msg: "",
  types: "info"
};

export default function snackbar(
  state: ISnackMsgState = initialState,
  action: ISnackBarAction
) {
  switch (action.type) {
    case GET_MESSAGE:
      return state;
    case SET_MESSAGE_SUCCESS:
      return {
        ...state,
        msg: action.msg,
        types: "success"
      };
    case SET_MESSAGE_ERROR:
      return {
        ...state,
        msg: action.msg,
        types: "error"
      };
    case SET_MESSAGE_INFO:
      return {
        ...state,
        msg: action.msg,
        types: "info"
      };
    case SET_MESSAGE_WARNING:
      return {
        ...state,
        msg: action.msg,
        types: "warning"
      };
    case SET_MESSAGE_CLEAR:
      return initialState;
    default:
      return state;
  }
}
