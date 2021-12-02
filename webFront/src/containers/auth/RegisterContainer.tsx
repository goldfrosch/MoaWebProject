import React from "react";
import Register from "components/main/auth/Register";
import { useDispatch } from "react-redux";
import { IUserRegister } from "modules/auth/type";
import { authRegisterAction } from "modules/auth/auth";

interface RegisterContainerProps {}

const RegisterContainer: React.FC<RegisterContainerProps> = () => {
  const dispatch = useDispatch();

  const register = (data: IUserRegister) => {
    dispatch(authRegisterAction(data));
  };

  return <Register register={register} />;
};

export default RegisterContainer;
