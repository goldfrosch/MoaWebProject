import axios from "api/defaultClient";
import { IUserLogin, IUserRegister } from "modules/auth/type";

export const userRegister = (data: IUserRegister) => {
  return axios.post(`/register`, data);
};

export const userLogin = (data: IUserLogin) => {
  return axios.post(`/login`, data);
};

export const userProfile = () => {
  return axios.get(`/profile`);
};

export const findEmail = (data: string) => {
  return axios.get(`/find/email?email=${data}`);
};

export const findNickname = (data: string) => {
  return axios.get(`/find/nickname?nickName=${data}`);
};

export const findUUID = (data: string) => {
  return axios.get(`find/uuid?uuid=${data}`);
};
