import BaseTemplate from "components/base/BaseTemplate";
import { Route, Switch } from "react-router";

import NotFound from "components/common/template/NotFound";

import HomeContainer from "containers/home/HomeContainer";
import LoginContainer from "containers/auth/LoginContainer";
import RegisterContainer from "containers/auth/RegisterContainer";

import BoardContainer from "containers/content/board/BoardListContainer";
import BoardWriteContainer from "containers/content/board/BoardWriteContainer";

const MainPage = () => {
  return (
    <BaseTemplate>
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route exact path="/login" component={LoginContainer} />
        <Route exact path="/register" component={RegisterContainer} />

        <Route exact path="/board" component={BoardContainer} />
        <Route exact path="/board/write" component={BoardWriteContainer} />

        {/* Error Page */}
        <Route component={NotFound} />
      </Switch>
    </BaseTemplate>
  );
};

export default MainPage;
