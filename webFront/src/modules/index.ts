import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import auth, { AuthSaga } from "./auth/auth";
import snackbar from "./snackbar/snackbar";

import { IAuthState } from "./auth/type";
import { ISnackMsgState } from "./snackbar/type";

export interface IRootState {
  auth: IAuthState;
  snackbar: ISnackMsgState;
}

const rootStore = combineReducers({
  auth,
  snackbar,
});

export function* rootSaga() {
  yield all([
    AuthSaga(),
  ]);
}

export default rootStore;