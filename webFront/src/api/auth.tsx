import axios from "api/defaultClient";
import { IUserRegister } from "modules/auth/type";

export const userRegister = (data: IUserRegister) => {
  return axios.post("/member/register", data);
};
