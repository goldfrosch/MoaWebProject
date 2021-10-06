import { authRegisterAction, authRegisterSuccessAction } from "./auth";

export interface IAuthState {
  
}

export interface IUserRegister {
  email: string,
  password: string,
  birthday: Date,
  gender: string,
  age: number,
}

export type IUserAction =
  | ReturnType<typeof authRegisterAction>
  | ReturnType<typeof authRegisterSuccessAction>