import React from "react";
import Login from "components/main/auth/Login";
import { useDispatch } from "react-redux";
import { IUserLogin } from "modules/auth/type";
import { authLoginAction } from "modules/auth/auth";
import { setMessageClearAction } from "modules/snackbar/snackbar";

interface LoginContainerProps {}

const LoginContainer: React.FC<LoginContainerProps> = () => {
  const dispatch = useDispatch();

  const LoginAction = (data: IUserLogin) => {
    dispatch(setMessageClearAction());
    dispatch(authLoginAction(data));
  };

  return <Login LoginAction={LoginAction} />;
};

export default LoginContainer;
