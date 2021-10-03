import BaseTemplate from "components/base/BaseTemplate";
import {Route, Switch} from "react-router";

import HomeContainer from "containers/home/HomeContainer";
import LoginContainer from "containers/auth/LoginContainer";

const MainPage = () => {
    return (
        <BaseTemplate>
            <Switch>
                <Route exact path="/" component={HomeContainer}/>
                <Route exact path="/login" component={LoginContainer}/>
            </Switch>
        </BaseTemplate>
    );
};

export default MainPage;
