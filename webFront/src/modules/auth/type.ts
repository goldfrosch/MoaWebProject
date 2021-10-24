import { 
  authGetProfileAction,
  authGetProfileSuccessAction,
  authLoginAction,
  authLoginSuccessAction,
  authLogoutAction,
  authRegisterAction,
  authRegisterSuccessAction
} from "./auth";

export interface IUserRegister {
  email: string,
  password: string,
  nickName: string,
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