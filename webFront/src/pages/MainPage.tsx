import { useEffect } from "react";
import BaseTemplate from "components/base/BaseTemplate";
import { Route, Switch } from "react-router";

import { IRootState } from "modules";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { setMessageClearAction } from "modules/snackbar/snackbar";

import HomeContainer from "containers/home/HomeContainer";
import LoginContainer from "containers/auth/LoginContainer";
import RegisterContainer from "containers/auth/RegisterContainer";
import UserInfoContainer from "containers/auth/UserInfoContainer";

import BoardContainer from "containers/content/board/BoardListContainer";
import BoardWriteContainer from "containers/content/board/BoardWriteContainer";
import BoardDetailContainer from "containers/content/board/BoardDetailContainer";

import GridContainer from "containers/content/grid/GridListContainer";
import GridWriteContainer from "containers/content/grid/GridWriteContainer";
import NotForbidden from "components/common/template/NotForbidden";
import NotFound from "components/common/template/NotFound";

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
        <Route exact path="/register" component={RegisterContainer} />
        <Route exact path="/profile" component={UserInfoContainer} />
        {/* 보드 형식 게시판 */}
        <Route exact path="/board" component={BoardContainer} />
        <Route exact path="/board/write" component={BoardWriteContainer} />
        <Route exact path="/board/:id" component={BoardDetailContainer} />
        {/* 그리드 형식 게시판 */}
        <Route exact path="/grid" component={GridContainer} />
        <Route exact path="/grid/write" component={GridWriteContainer} />
        {/* Error Page */}
        <Route exact path="/forbidden" component={NotForbidden} />
        <Route path={"*"} component={NotFound} />
      </Switch>
    </BaseTemplate>
  );
};

export default MainPage;
