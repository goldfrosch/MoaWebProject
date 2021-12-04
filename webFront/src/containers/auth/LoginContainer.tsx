import React, { useState } from "react";
import Login from "components/main/auth/Login";

import { useDispatch } from "react-redux";
import { IUserLogin } from "modules/auth/type";
import { authLoginAction } from "modules/auth/auth";

import * as AuthAPI from "api/auth";
import { AxiosResponse } from "axios";

interface LoginContainerProps {}

const LoginContainer: React.FC<LoginContainerProps> = () => {
  const [findMsg, setFindMsg] = useState<string>("");

  const dispatch = useDispatch();

  const LoginAction = (data: IUserLogin) => {
    dispatch(authLoginAction(data));
  };

  const resetPass = async (email: string) => {
    try {
      const res: AxiosResponse = await AuthAPI.resetPassword(email);
      setFindMsg(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Login LoginAction={LoginAction} resetPass={resetPass} msg={findMsg} />
  );
};

export default LoginContainer;
