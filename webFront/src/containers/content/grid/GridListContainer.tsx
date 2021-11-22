import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";

import { AxiosResponse } from "axios";
import * as BoardAPI from "api/board";

import GridList, { IScrollOption } from "components/main/content/grid/GridList";

import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "modules";
import history from "utils/HistoryUtils";
import {
  setMessageClearAction,
  setMessageWarningAction
} from "modules/snackbar/snackbar";
import { IBoardDesc, IBoardListData } from "modules/board/type";
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

const fakeFetch = () => new Promise(res => setTimeout(res, 1000));

interface GridContainerProps {}
const GridContainer: React.FC<RouteComponentProps<GridContainerProps>> = ({
  location
}) => {
  const userData = useSelector((state: IRootState) => state.auth.profile);
  const dispatch = useDispatch();

  const [data, setData] = useState<IGridData>({
    category: String(
      new URLSearchParams(location.search)
        .get("category")
        ?.toLocaleUpperCase() ?? ""
    ),
    type: String(new URLSearchParams(location.search).get("type") ?? ""),
    query: String(new URLSearchParams(location.search).get("query") ?? "")
  });
  const [desc, setDesc] = useState<IBoardDesc>({
    title: "",
    context: ""
  });
  const [list, setList] = useState<IBoardListData[]>([]);
  const [listOption, setListOption] = useState<IScrollOption>({
    page: 1,
    isLoading: false,
    isStop: false
  });

  //List 추가함수
  const fetchItems = async () => {
    setListOption(prev => ({ ...prev, isLoading: true }));
    await fakeFetch();
    //기존 데이터
    let lists: IBoardListData[] = list;
    let listOptionData: IScrollOption = listOption;

    //axios 실행
    await BoardAPI.getBoards({
      category: String(
        new URLSearchParams(location.search).get("category") ?? ""
      ).toUpperCase(),
      page: listOptionData.page,
      type: String(new URLSearchParams(location.search).get("type") ?? ""),
      query: String(new URLSearchParams(location.search).get("query") ?? "")
    })
      .then(async (res: AxiosResponse) => {
        if (res.data.list.empty === true) {
          listOptionData.isLoading = false;
          listOptionData.isStop = true;
        } else {
          lists.push(...res.data.list.results);
          setList([...lists]);

          listOptionData.isLoading = false;
          listOptionData.page = listOptionData.page + 1;
        }
        setListOption({ ...listOption, ...listOptionData });
      })
      .catch(error => {
        console.log(error);
      });
  };

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
    setList([]);
    setListOption({ ...listOption, page: 1, isLoading: false, isStop: false });
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

    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);
  return (
    <GridList
      data={data}
      desc={desc}
      list={list}
      listOption={listOption}
      checkLogin={checkLogin}
      fetchItems={fetchItems}
    />
  );
};

export default GridContainer;
