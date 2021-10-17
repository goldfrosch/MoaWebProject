import { authGetProfileAction, authGetProfileSuccessAction, authLoginAction, authLoginSuccessAction, authRegisterAction, authRegisterSuccessAction } from "./auth";

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

export interface IProfile {
  email: string,
  nickName: string,
  profile: string,
  rank: number,
  uuid: string
}
export interface IAuthState {
  profile: IProfile | null,
}

export type IUserAction =
  | ReturnType<typeof authRegisterAction>
  | ReturnType<typeof authRegisterSuccessAction>
  | ReturnType<typeof authLoginAction>
  | ReturnType<typeof authLoginSuccessAction>
  | ReturnType<typeof authGetProfileAction>
  | ReturnType<typeof authGetProfileSuccessAction>