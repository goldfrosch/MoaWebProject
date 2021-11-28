import UserInfo from "components/main/auth/UserInfo";
import { IRootState } from "modules";
import { authGetProfileAction } from "modules/auth/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as AuthAPI from "api/auth";
import { AxiosResponse } from "axios";
import { setMessageSuccessAction } from "modules/snackbar/snackbar";

interface UserInfoContainerProps {}
const UserInfoContainer: React.FC<UserInfoContainerProps> = () => {
  const data = useSelector((state: IRootState) => state.auth.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authGetProfileAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uploadProfile = async (data: any) => {
    try {
      const res: AxiosResponse = await AuthAPI.updateProfile(data);
      dispatch(setMessageSuccessAction(res.data));
    } catch (e) {
      console.log(e);
    }
  };

  return <UserInfo data={data} uploadProfile={uploadProfile} />;
};

export default UserInfoContainer;
