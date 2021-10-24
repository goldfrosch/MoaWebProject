import React, { useEffect } from "react";
import Register from "components/main/auth/Register";
import { useDispatch, useSelector } from "react-redux";
import { IUserRegister } from "modules/auth/type";
import { authRegisterAction } from "modules/auth/auth";
import { useSnackbar } from "notistack";
import { IRootState } from "modules";
import { setMessageClearAction } from "modules/snackbar/snackbar";

interface RegisterContainerProps {}

const RegisterContainer: React.FC<RegisterContainerProps> = () => {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const snack = useSelector((state: IRootState) => state.snackbar);

  const register = (data: IUserRegister) => {
    dispatch(authRegisterAction(data));
  };

  useEffect(() => {
    if (snack.msg !== "") {
      enqueueSnackbar(snack.msg, { variant: snack.types });
    }
  }, [enqueueSnackbar, snack]);

  useEffect(() => {
    dispatch(setMessageClearAction());
  });

  return <Register register={register} />;
};

export default RegisterContainer;
