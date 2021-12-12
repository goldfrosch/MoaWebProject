import { useEffect } from "react";
import BaseTemplate from "components/base/BaseTemplate";
import { Route, Switch } from "react-router";

import { IRootState } from "modules";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { setMessageClearAction } from "modules/snackbar/snackbar";

import HomeContainer from "containers/home/HomeContainer";
import LoginContainer from "containers/auth/LoginContainer";
import NotForbidden from "components/common/template/NotForbidden";
import NotFound from "components/common/template/NotFound";

import UserPage from "./UserPage";

const MainPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const snack = useSelector((state: IRootState) => state.snackbar);

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

  return (
    <BaseTemplate>
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route exact path="/login" component={LoginContainer} />
        <Route path="/user" component={UserPage} />
        {/* Error Page */}
        <Route exact path="/forbidden" component={NotForbidden} />
        <Route path={"*"} component={NotFound} />
      </Switch>
    </BaseTemplate>
  );
};

export default MainPage;
