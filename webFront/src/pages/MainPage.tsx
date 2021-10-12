import BaseTemplate from "components/base/BaseTemplate";
import { Route, Switch } from "react-router";

import NotFound from "components/common/template/NotFound";

import HomeContainer from "containers/home/HomeContainer";
import LoginContainer from "containers/auth/LoginContainer";
import RegisterContainer from "containers/auth/RegisterContainer";

import NoticeContainer from "containers/content/notice/NoticeContainer";
import TestWrite from "components/main/content/notice/TestWrite";

const MainPage = () => {
  return (
    <Switch>
      <BaseTemplate>
        <Route exact path="/" component={HomeContainer} />
        <Route exact path="/login" component={LoginContainer} />
        <Route exact path="/register" component={RegisterContainer} />

        <Route exact path="/notice/notice" component={NoticeContainer} />

        <Route exact path="/test" component={TestWrite} />
      </BaseTemplate>
      <Route exact path="/notfound" component={NotFound} />
    </Switch>
  );
};

export default MainPage;
