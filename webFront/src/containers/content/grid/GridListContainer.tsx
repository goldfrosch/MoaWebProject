import React, { useEffect, useState } from "react";

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

export interface IGridStatus {
  isLoading: boolean;
  isDone: boolean;
}

const fakeFetch = () => new Promise(res => setTimeout(res, 1000));

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
  const [list, setList] = useState<IBoardListData[]>([]);
  const [listOption, setListOption] = useState<IScrollOption>({
    page: 1,
    isLoading: false,
    isStop: false
  });

  //List 추가함수
  const fetchItems = async (page?: number) => {
    setListOption(prev => ({ ...prev, isLoading: true }));
    await fakeFetch();
    //기존 데이터
    let lists: IBoardListData[];

    if (page && page === 1) {
      lists = [];
    } else {
      lists = list;
    }

    let listOptionData: IScrollOption = listOption;

    //axios 실행
    await BoardAPI.getBoards({
      category: match.params.category.toUpperCase(),
      page: page || listOptionData.page,
      type: data.type,
      query: data.query
    })
      .then((res: AxiosResponse) => {
        if (res.data.list.empty === true) {
          listOptionData.isLoading = false;
          listOptionData.isStop = true;
        } else {
          lists.push(...res.data.list.results);
          setList([...lists]);

          listOptionData.isLoading = false;
          listOptionData.page = listOptionData.page + 1;
          listOptionData.isStop = false;
        }
        setListOption(prev => ({
          ...prev,
          page: listOptionData.page,
          isLoading: listOptionData.isLoading,
          isStop: listOptionData.isStop
        }));
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
      category: match.params.category,
      type: String(new URLSearchParams(location.search).get("type") ?? ""),
      query: String(new URLSearchParams(location.search).get("query") ?? "")
    });
    setDesc({
      title: DescUtils.SetBoardTitle(match.params.category),
      context: DescUtils.SetBoardContext(match.params.category)
    });
    fetchItems(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.category, location]);
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
