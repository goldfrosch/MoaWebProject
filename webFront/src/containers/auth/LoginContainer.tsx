import React, { useEffect } from "react";
import Login from "components/main/auth/Login";
import { useDispatch, useSelector } from "react-redux";
import { IUserLogin } from "modules/auth/type";
import { authLoginAction } from "modules/auth/auth";

import { useSnackbar } from "notistack";
import { IRootState } from "modules";
import { setMessageClearAction } from "modules/snackbar/snackbar";

interface LoginContainerProps {}

const LoginContainer: React.FC<LoginContainerProps> = () => {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const snack = useSelector((state: IRootState) => state.snackbar);

  const LoginAction = (data: IUserLogin) => {
    dispatch(setMessageClearAction());
    dispatch(authLoginAction(data));
  };

  useEffect(() => {
    if (snack.msg !== "") {
      enqueueSnackbar(snack.msg, { variant: snack.types });
    }
  }, [enqueueSnackbar, snack]);

  useEffect(() => {
    dispatch(setMessageClearAction());
    return () => {
      dispatch(setMessageClearAction());
    };
  });

  return <Login LoginAction={LoginAction} />;
};

export default LoginContainer;
