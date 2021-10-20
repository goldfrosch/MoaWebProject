import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import auth, { AuthSaga } from "./auth/auth";
import { IAuthState } from "./auth/type";

export interface IRootState {
  auth: IAuthState;
}

export interface ISnackbar {
  type: string,
  message: string,
}

const rootStore = combineReducers<IRootState>({
  auth
});

export function* rootSaga() {
  yield all([
    AuthSaga(),
  ]);
}

export default rootStore;