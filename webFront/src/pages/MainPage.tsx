import BaseTemplate from "components/base/BaseTemplate";
import { Route, Switch } from "react-router";

import NotFound from "components/common/template/NotFound";

import HomeContainer from "containers/home/HomeContainer";
import LoginContainer from "containers/auth/LoginContainer";
import RegisterContainer from "containers/auth/RegisterContainer";

import BoardContainer from "containers/content/board/BoardListContainer";
import BoardWriteContainer from "containers/content/board/BoardWriteContainer";
import BoardDetailContainer from "containers/content/board/BoardDetailContainer";

import GridContainer from "containers/content/grid/GridListContainer";
import GridWriteContainer from "containers/content/grid/GridWriteContainer";

const MainPage = () => {
  return (
    <BaseTemplate>
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route exact path="/login" component={LoginContainer} />
        <Route exact path="/register" component={RegisterContainer} />
        {/* 보드 형식 게시판 */}
        <Route exact path="/board" component={BoardContainer} />
        <Route exact path="/board/write" component={BoardWriteContainer} />
        <Route exact path="/board/:id" component={BoardDetailContainer} />
        {/* 그리드 형식 게시판 */}
        <Route exact path="/grid" component={GridContainer} />
        <Route exact path="/grid/write" component={GridWriteContainer} />
        {/* Error Page */}
        <Route component={NotFound} />
      </Switch>
    </BaseTemplate>
  );
};

export default MainPage;
