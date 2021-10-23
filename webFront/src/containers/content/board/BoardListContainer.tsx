import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";

import BoardList from "components/main/content/board/BoardList";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "modules";
import history from "utils/HistoryUtils";
import {
  setMessageClearAction,
  setMessageWarningAction
} from "modules/snackbar/snackbar";
export interface IBoardData {
  category: string;
  page: number;
  type: string;
  query: string;
}

interface BoardContainerProps {}
const BoardContainer: React.FC<RouteComponentProps<BoardContainerProps>> = ({
  location
}) => {
  const userData = useSelector((state: IRootState) => state.auth.profile);
  const dispatch = useDispatch();

  const [data, setData] = useState<IBoardData>({
    category: String(
      new URLSearchParams(location.search).get("category") ?? ""
    ),
    page: Number(new URLSearchParams(location.search).get("page") ?? 1),
    type: String(new URLSearchParams(location.search).get("type") ?? ""),
    query: String(new URLSearchParams(location.search).get("query") ?? "")
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
      page: Number(new URLSearchParams(location.search).get("page") ?? 1),
      type: String(new URLSearchParams(location.search).get("type") ?? ""),
      query: String(new URLSearchParams(location.search).get("query") ?? "")
    });
  }, [location.search]);
  return <BoardList data={data} checkLogin={checkLogin} />;
};

export default BoardContainer;
