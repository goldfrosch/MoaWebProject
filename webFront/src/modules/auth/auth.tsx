import axios from "api/defaultClient";

import { AxiosResponse } from "axios";
import * as AuthAPI from "api/auth";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  IAuthState,
  IProfile,
  IUserAction,
  IUserLogin,
  IUserRegister,
} from "./type";
import history from "utils/HistoryUtils";

const AUTH_REGISTER = "AUTH_REGISTER" as const;
const AUTH_REGISTER_SUCCESS = "AUTH_REGISTER_SUCCESS" as const;

const AUTH_LOGIN = "AUTH_LOGIN" as const;
const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS" as const;

const AUTH_LOGOUT = "AUTH_LOGOUT" as const;

const AUTH_GET_PROFILE = "AUTH_GET_PROFILE" as const;
const AUTH_GET_PROFILE_SUCCESS = "AUTH_GET_PROFILE_SUCCESS" as const;

export const authRegisterAction = (data: IUserRegister) => ({
  type: AUTH_REGISTER,
  data,
});

export const authRegisterSuccessAction = () => ({
  type: AUTH_REGISTER_SUCCESS,
});

export const authLoginAction = (datas: IUserLogin) => ({
  type: AUTH_LOGIN,
  datas,
});

export const authLoginSuccessAction = () => ({
  type: AUTH_LOGIN_SUCCESS,
});

export const authLogoutAction = () => ({
  type: AUTH_LOGOUT,
});

export const authGetProfileAction = () => ({
  type: AUTH_GET_PROFILE,
});

export const authGetProfileSuccessAction = (data: IProfile) => ({
  type: AUTH_GET_PROFILE_SUCCESS,
  data,
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
    const { data, status }: AxiosResponse = yield call(
      AuthAPI.userLogin,
      action.datas
    );
    if (status !== 200) return alert("문제 발생, 관리자에게 무늬바람");
    let token: any = data;
    localStorage.setItem("CURRENT_USER", token);
    //axios.defaults.headers.common['Authorization'] 으로 기본 헤더값 설정
    axios.defaults.headers.common["Authorization"] = token;
    yield put(authLoginSuccessAction());
    yield put(authGetProfileAction());
    history.push("/");
  } catch (e) {
    console.log(e);
    return alert("아이디 or 비번을 확인해주세요");
  }
}

function* profileSaga(action: ReturnType<typeof authGetProfileAction>) {
  try {
    if (localStorage.getItem("CURRENT_USER")) {
      const token = localStorage.getItem("CURRENT_USER");
      axios.defaults.headers.common["Authorization"] = String(token);

      const { data, status }: AxiosResponse = yield call(AuthAPI.userProfile);
      let datas: any = data;
      if (status !== 200)
        return alert("페이지 로딩중 문제 발생. 로그인을 다시 해주세요");
      yield put(authGetProfileSuccessAction(datas));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* AuthSaga() {
  yield takeEvery(AUTH_REGISTER, registerSaga);
  yield takeEvery(AUTH_LOGIN, loginSaga);
  yield takeEvery(AUTH_GET_PROFILE, profileSaga);
}

const initialState: IAuthState = {
  profile: {
    email: "",
    nickName: null,
    profile: null,
    rank: 0,
    uuid: null,
  },
};

export default function auth(
  state: IAuthState = initialState,
  action: IUserAction
) {
  switch (action.type) {
    case AUTH_REGISTER_SUCCESS:
      return { ...state };
    case AUTH_LOGIN_SUCCESS:
      return { ...state };
    case AUTH_LOGOUT:
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("CURRENT_USER");
      history.push("/");
      return initialState;
    case AUTH_GET_PROFILE_SUCCESS:
      return { ...state, profile: { ...action.data } };
    default:
      return state;
  }
}
