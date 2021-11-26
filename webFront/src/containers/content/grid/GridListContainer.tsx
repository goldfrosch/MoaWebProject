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
    isLoading: false
  });

  //List 추가함수
  const fetchItems = async (page?: number) => {
    setListOption(prev => ({ ...prev, isLoading: true, isStop: true }));
    await fakeFetch();

    //axios 실행
    try {
      const res: AxiosResponse = await BoardAPI.getBoards({
        category: match.params.category.toUpperCase(),
        page: page || listOption.page,
        type: data.type,
        query: data.query
      });

      //기존 데이터
      if (listOption.page === 1) {
        setList(res.data.list.results);
      } else {
        setList([...list, ...res.data.list.results]);
      }

      if (res.data.list.empty) {
        setListOption(prev => ({
          ...prev,
          page: prev.page + 1,
          isLoading: false
        }));
        return true;
      } else {
        setListOption(prev => ({
          ...prev,
          page: 1,
          isLoading: false
        }));
      }
    } catch (e) {
      console.log(e);
    }
    return false;
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
    setListOption({ page: 1, isLoading: false });
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
