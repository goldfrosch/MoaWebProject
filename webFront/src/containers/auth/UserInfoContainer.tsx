import UserInfo from "components/main/auth/UserInfo";
import { IRootState } from "modules";
import { authGetProfileAction } from "modules/auth/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface UserInfoContainerProps {}
const UserInfoContainer: React.FC<UserInfoContainerProps> = () => {
  const data = useSelector((state: IRootState) => state.auth.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authGetProfileAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <UserInfo data={data} />;
};

export default UserInfoContainer;
