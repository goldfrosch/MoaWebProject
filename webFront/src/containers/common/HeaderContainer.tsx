import Header from "components/common/header/Header";
import { IRootState } from "modules";
import { authGetProfileAction } from "modules/auth/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface HeaderContainerProps {}
const HeaderContainer: React.FC<HeaderContainerProps> = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: IRootState) => state.auth.profile);

  useEffect(() => {
    dispatch(authGetProfileAction());
  }, [dispatch]);

  return <Header profile={profile} />;
};

export default HeaderContainer;
