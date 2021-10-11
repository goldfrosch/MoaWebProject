import { authLoginAction, authLoginSuccessAction, authRegisterAction, authRegisterSuccessAction } from "./auth";

export interface IAuthState {
  
}

export interface IUserRegister {
  email: string,
  password: string,
  birthday: Date,
  gender: string,
  age: number,
}

export interface IUserLogin {
  email: string,
  password: string,
}

export type IUserAction =
  | ReturnType<typeof authRegisterAction>
  | ReturnType<typeof authRegisterSuccessAction>
  | ReturnType<typeof authLoginAction>
  | ReturnType<typeof authLoginSuccessAction>