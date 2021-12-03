import React from "react";
import Login from "components/main/auth/Login";

import { useDispatch } from "react-redux";
import { IUserLogin } from "modules/auth/type";
import { authLoginAction } from "modules/auth/auth";
import { setMessageClearAction } from "modules/snackbar/snackbar";

import * as AuthAPI from "api/auth";
import { AxiosResponse } from "axios";

interface LoginContainerProps {}

const LoginContainer: React.FC<LoginContainerProps> = () => {
  const dispatch = useDispatch();

  const LoginAction = (data: IUserLogin) => {
    dispatch(setMessageClearAction());
    dispatch(authLoginAction(data));
  };

  const resetPass = async (email: string): Promise<string> => {
    try {
      const res: AxiosResponse = await AuthAPI.resetPassword(email);

      return res.data;
    } catch (e) {
      console.log(e);
      return "";
    }
  };

  return <Login LoginAction={LoginAction} resetPass={resetPass} />;
};

export default LoginContainer;
