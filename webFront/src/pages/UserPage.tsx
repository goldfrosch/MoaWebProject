import { Route, Switch } from "react-router";

import UserPageForm from "components/common/template/UserPageForm";
import BirdItem from "components/common/items/animation/Bird";

import UserInfoContainer from "containers/auth/UserInfoContainer";

import BoardContainer from "containers/content/board/BoardListContainer";
import BoardWriteContainer from "containers/content/board/BoardWriteContainer";
import BoardDetailContainer from "containers/content/board/BoardDetailContainer";
import BoardEditContainer from "containers/content/board/BoardEditContainer";

import GridContainer from "containers/content/grid/GridListContainer";
import GridWriteContainer from "containers/content/grid/GridWriteContainer";
import Minigame from "components/main/etc/minigame/Minigame";
import Canvas from "components/main/content/canvas/Canvas";

interface IUserPageProps {}
const UserPage: React.FC<IUserPageProps> = () => {
  return (
    <UserPageForm>
      <BirdItem speed={3} startHeight={20} />
      <BirdItem speed={1} startHeight={10} />
      <BirdItem speed={6} startHeight={60} />
      <Switch>
        <Route exact path="/user/profile" component={UserInfoContainer} />
        {/* 보드 형식 게시판 */}
        <Route exact path="/user/board" component={BoardContainer} />
        <Route exact path="/user/board/write" component={BoardWriteContainer} />
        <Route exact path="/user/board/:id" component={BoardDetailContainer} />
        <Route
          exact
          path="/user/board/edit/:id"
          component={BoardEditContainer}
        />
        {/* 그리드 형식 게시판 */}
        <Route exact path="/user/grid" component={GridContainer} />
        <Route exact path="/user/grid/write" component={GridWriteContainer} />
        {/* 캔버스 게시판 */}
        <Route exact path="/user/test" component={Canvas} />
        {/* MINIGAME*/}
        <Route exact path="/user/etc/minigame" component={Minigame} />
      </Switch>
    </UserPageForm>
  );
};

export default UserPage;
