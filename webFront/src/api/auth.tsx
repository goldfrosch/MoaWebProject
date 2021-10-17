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
