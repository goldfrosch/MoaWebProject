import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";

import { AxiosResponse } from "axios";
import * as BoardAPI from "api/board";

import { useSnackbar } from "notistack";

import BoardList from "components/main/content/board/BoardList";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "modules";
import history from "utils/HistoryUtils";
import {
  setMessageClearAction,
  setMessageWarningAction
} from "modules/snackbar/snackbar";
import { IBoard, IBoardDesc } from "modules/board/type";
import DescUtils from "utils/DescUtils";

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
  const { enqueueSnackbar } = useSnackbar();

  const userData = useSelector((state: IRootState) => state.auth.profile);
  const snack = useSelector((state: IRootState) => state.snackbar);
  const dispatch = useDispatch();

  const [data, setData] = useState<IBoardData>({
    category: String(
      new URLSearchParams(location.search).get("category") ?? ""
    ),
    page: Number(new URLSearchParams(location.search).get("page") ?? 1),
    type: String(new URLSearchParams(location.search).get("type") ?? ""),
    query: String(new URLSearchParams(location.search).get("query") ?? "")
  });
  const [desc, setDesc] = useState<IBoardDesc>({
    title: "",
    context: ""
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

  const checkLogin = (link: string) => {
    dispatch(setMessageClearAction());
    if (userData.nickName) {
      if (
        data.category === "notice" ||
        data.category === "event" ||
        data.category === "update" ||
        data.category === "donate"
      ) {
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
      dispatch(setMessageWarningAction("로그인이 필요한 서비스입니다."));
      history.push("/login");
    }
  };

  const getBoardsData = () => {
    setBoard({
      newNotice: [],
      list: {
        empty: true,
        limit: 10,
        offset: 0,
        total: 0,

        results: []
      }
    });
    BoardAPI.getBoards({
      category: String(
        new URLSearchParams(location.search).get("category") ?? ""
      ).toUpperCase(),
      page: Number(new URLSearchParams(location.search).get("page") ?? 1),
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
      page: Number(new URLSearchParams(location.search).get("page") ?? 1),
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
    getBoardsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

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
    <BoardList
      board={board}
      data={data}
      desc={desc}
      checkLogin={checkLogin}
      getBoardsData={getBoardsData}
    />
  );
};

export default BoardContainer;
