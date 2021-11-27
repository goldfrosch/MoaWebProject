import React, { useEffect, useState } from "react";

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

interface match<P> {
  params: P;
  isExact: boolean;
  path: string;
  url: string;
}

interface RouteComponentProps<P> {
  match: match<P>;
  location: any;
}

export interface IGridData {
  category: string;
  type: string;
  query: string;
}

interface GridContainerProps {
  category: string;
}

const GridContainer: React.FC<RouteComponentProps<GridContainerProps>> = ({
  location,
  match
}) => {
  const userData = useSelector((state: IRootState) => state.auth.profile);
  const dispatch = useDispatch();

  const [data, setData] = useState<IGridData>({
    category: match.params.category,
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
      if (data.category === "donate") {
        if (userData.rank > 4) {
          history.push(link);
        } else {
          dispatch(setMessageWarningAction("권한이 부족합니다"));
        }
      } else {
        if (userData.rank > 0) {
          history.push(link);
        } else {
          dispatch(setMessageWarningAction("권한이 부족합니다"));
        }
      }
    } else {
      dispatch(setMessageClearAction());
      dispatch(setMessageWarningAction("로그인이 필요한 서비스입니다."));
      history.push("/login");
    }
  };

  useEffect(() => {
    setData({
      category: match.params.category,
      type: String(new URLSearchParams(location.search).get("type") ?? ""),
      query: String(new URLSearchParams(location.search).get("query") ?? "")
    });
    setDesc({
      title: DescUtils.SetBoardTitle(match.params.category),
      context: DescUtils.SetBoardContext(match.params.category)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.category, location]);
  return (
    <GridList
      data={data}
      desc={desc}
      location={location}
      params={match.params}
      checkLogin={checkLogin}
    />
  );
};

export default GridContainer;
