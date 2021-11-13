import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";

import { AxiosResponse } from "axios";
import * as BoardAPI from "api/board";

import GridList from "components/main/content/grid/GridList";

import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "modules";
import history from "utils/HistoryUtils";
import {
  setMessageClearAction,
  setMessageWarningAction
} from "modules/snackbar/snackbar";
import { IBoard } from "modules/board/type";
// import { IBoardDesc } from "modules/board/type";
// import DescUtils from "utils/DescUtils";

export interface IGridData {
  category: string;
  page: number;
  type: string;
  query: string;
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
    ),
    page: 1,
    type: String(new URLSearchParams(location.search).get("type") ?? ""),
    query: String(new URLSearchParams(location.search).get("query") ?? "")
  });
  const [board, setBoard] = useState<IBoard>({
    newNotice: [],
    list: {
      empty: true,
      limit: 10,
      offset: 0,
      total: 0,

      results: []
    }
  });

  // const [desc, setDesc] = useState<IBoardDesc>({
  //   title: "",
  //   context: ""
  // });

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

  const getGridsData = () => {
    BoardAPI.getBoards({
      category: String(
        new URLSearchParams(location.search).get("category") ?? ""
      ).toUpperCase(),
      page: 1,
      type: String(new URLSearchParams(location.search).get("type") ?? ""),
      query: String(new URLSearchParams(location.search).get("query") ?? "")
    })
      .then((res: AxiosResponse) => {
        setBoard(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    setData({
      category: String(
        new URLSearchParams(location.search).get("category") ?? ""
      ),
      page: 1,
      type: String(new URLSearchParams(location.search).get("type") ?? ""),
      query: String(new URLSearchParams(location.search).get("query") ?? "")
    });
    // setDesc({
    //   title: DescUtils.SetBoardTitle(
    //     String(new URLSearchParams(location.search).get("category") ?? "")
    //   ),
    //   context: DescUtils.SetBoardContext(
    //     String(new URLSearchParams(location.search).get("category") ?? "")
    //   )
    // });
    getGridsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);
  return (
    <GridList
      board={board}
      data={data}
      checkLogin={checkLogin}
      getGridsData={getGridsData}
    />
  );
};

export default GridContainer;
