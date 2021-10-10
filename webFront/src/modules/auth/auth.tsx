import { AxiosResponse } from "axios";
import * as AuthAPI from "api/auth";
import { call, put, takeEvery } from "redux-saga/effects";
import { IAuthState, IUserAction, IUserLogin, IUserRegister } from "./type";
import history from "utils/HistoryUtils";

const AUTH_REGISTER = "AUTH_REGISTER" as const;
const AUTH_REGISTER_SUCCESS = "AUTH_REGISTER_SUCCESS" as const;

const AUTH_LOGIN = "AUTH_LOGIN" as const;
const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS" as const;

export const authRegisterAction = (data: IUserRegister) => ({
  type: AUTH_REGISTER,
  data,
});

export const authRegisterSuccessAction = () => ({
  type: AUTH_REGISTER_SUCCESS,
});

export const authLoginAction = (data: IUserLogin) => ({
  type: AUTH_LOGIN,
  data,
});

export const authLoginSuccessAction = () => ({
  type: AUTH_LOGIN_SUCCESS,
});

function* registerSaga(action: ReturnType<typeof authRegisterAction>) {
  try {
    const { status }: AxiosResponse = yield call(
      AuthAPI.userRegister,
      action.data
    );
    if (status !== 200) return alert("회원가입 도중 문제가 발생하였습니다");
    alert("회원가입이 완료되었습니다");
    yield put(authRegisterSuccessAction());
    history.push("/login");
  } catch (e) {
    console.log(e);
  }
}

function* loginSaga(action: ReturnType<typeof authLoginAction>) {
  try {
    const { status }: AxiosResponse = yield call(
      AuthAPI.userLogin,
      action.data
    );
    if (status !== 200) return alert("로그인 중 문제가 발생했습니다");
    alert("TEST");
  } catch (e) {
    console.log(e);
  }
}

export function* AuthSaga() {
  yield takeEvery(AUTH_REGISTER, registerSaga);
  yield takeEvery(AUTH_LOGIN, loginSaga);
}

const initialState: IAuthState = {};

export default function auth(
  state: IAuthState = initialState,
  action: IUserAction
) {
  switch (action.type) {
    case AUTH_REGISTER_SUCCESS:
      return { ...state };
    default:
      return state;
  }
}
