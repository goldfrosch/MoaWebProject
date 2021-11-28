import { 
  authGetProfileAction,
  authGetProfileSuccessAction,
  authLoginAction,
  authLoginSuccessAction,
  authLogoutAction,
  authRegisterAction,
  authRegisterSuccessAction
} from "./auth";

export interface IUpdatePw {
  newPass: string,
  nowPass: string,
}

export interface IUserRegister {
  email: string,
  password: string,
  nickName: string,
  uuid: string,
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
  nickName: string | null,
  profile: string | null,
  rank: number,
  uuid: string | null,
}

export interface IAuthState {
  profile: IProfile,
}

export type IUserAction =
  | ReturnType<typeof authRegisterAction>
  | ReturnType<typeof authRegisterSuccessAction>
  | ReturnType<typeof authLoginAction>
  | ReturnType<typeof authLoginSuccessAction>
  | ReturnType<typeof authLogoutAction>
  | ReturnType<typeof authGetProfileAction>
  | ReturnType<typeof authGetProfileSuccessAction>