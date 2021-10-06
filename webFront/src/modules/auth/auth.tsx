import { AxiosResponse } from "axios";
import * as AuthAPI from "api/auth";
import { call, put, takeEvery } from "redux-saga/effects";
import { IAuthState, IUserAction, IUserRegister } from "./type";

const AUTH_REGISTER = "AUTH_REGISTER" as const;
const AUTH_REGISTER_SUCCESS = "AUTH_REGISTER_SUCCESS" as const;

export const authRegisterAction = (data: IUserRegister) => ({
  type: AUTH_REGISTER,
  data,
});

export const authRegisterSuccessAction = () => ({
  type: AUTH_REGISTER_SUCCESS,
});

function* registerSaga(action: ReturnType<typeof authRegisterAction>) {
  try {
    const { status, data }: AxiosResponse = yield call(
      AuthAPI.userRegister,
      action.data
    );
    console.log(status, data);
    yield put(authRegisterSuccessAction());
  } catch (e) {
    console.log(e);
  }
}

export function* AuthSaga() {
  yield takeEvery(AUTH_REGISTER, registerSaga);
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
