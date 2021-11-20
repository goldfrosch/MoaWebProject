import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";

import GridList from "components/main/content/grid/GridList";

import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "modules";
import history from "utils/HistoryUtils";
import {
  setMessageClearAction,
  setMessageWarningAction
} from "modules/snackbar/snackbar";
import { IBoardDesc } from "modules/board/type";
import DescUtils from "utils/DescUtils";

export interface IGridData {
  category: string;
  type: string;
  query: string;
}

export interface IGridStatus {
  isLoading: boolean;
  isDone: boolean;
}

interface GridContainerProps {}
const GridContainer: React.FC<RouteComponentProps<GridContainerProps>> = ({
  location
}) => {
  const userData = useSelector((state: IRootState) => state.auth.profile);
  const dispatch = useDispatch();

  const [data, setData] = useState<IGridData>({
    category: String(
      new URLSearchParams(location.search).get("category") ?? ""
    ).toUpperCase(),
    type: String(new URLSearchParams(location.search).get("type") ?? ""),
    query: String(new URLSearchParams(location.search).get("query") ?? "")
  });
  const [desc, setDesc] = useState<IBoardDesc>({
    title: "",
    context: ""
  });

  const checkLogin = (link: string) => {
    dispatch(setMessageClearAction());
    if (userData.nickName) {
      history.push(link);
    } else {
      dispatch(setMessageClearAction());
      dispatch(setMessageWarningAction("로그인이 필요한 서비스입니다."));
      history.push("/login");
    }
  };

  useEffect(() => {
    setData({
      category: String(
        new URLSearchParams(location.search).get("category") ?? ""
      ),
      type: String(new URLSearchParams(location.search).get("type") ?? ""),
      query: String(new URLSearchParams(location.search).get("query") ?? "")
    });
    setDesc({
      title: DescUtils.SetBoardTitle(
        String(new URLSearchParams(location.search).get("category") ?? "")
      ),
      context: DescUtils.SetBoardContext(
        String(new URLSearchParams(location.search).get("category") ?? "")
      )
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);
  return <GridList data={data} desc={desc} checkLogin={checkLogin} />;
};

export default GridContainer;
