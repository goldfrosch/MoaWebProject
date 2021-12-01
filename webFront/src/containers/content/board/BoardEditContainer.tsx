import React, { useEffect, useState } from "react";

import BoardEdit from "components/main/content/board/BoardEdit";

import { AxiosResponse } from "axios";
import * as BoardAPI from "api/board";

import { IBoardDetail } from "modules/board/type";
import history from "utils/HistoryUtils";
import { useSelector } from "react-redux";
import { IRootState } from "modules";

export interface match<P> {
  params: P;
  isExact: boolean;
  path: string;
  url: string;
}

export interface RouteComponentProps<P> {
  match: match<P>;
  location: any;
}

export interface MatchParams {
  id: number;
}

const BoardEditContainer: React.FC<RouteComponentProps<MatchParams>> = ({
  match
}) => {
  const profile = useSelector((state: IRootState) => state.auth.profile);
  const [data, setData] = useState<IBoardDetail>({
    comments: {
      counts: 0,
      list: []
    },
    detail: {
      id: 0,
      category: "",
      count: 0,
      content: "",
      createdDate: new Date(),
      isComment: true,
      isLove: 0,
      nickName: "",
      prefix: "",
      rank: 0,
      title: "",
      uuid: ""
    }
  });
  const [boardTag, setBoardTag] = useState<string[]>([]);

  const getData = (id: number) => {
    BoardAPI.getBoard(id)
      .then((res: AxiosResponse) => {
        setData(res.data);
        getBoardTagData(res.data.detail.category);
      })
      .catch(error => {
        console.log(error);
        history.goBack();
      });
  };

  const getBoardTagData = (tags: string) => {
    BoardAPI.getBoardTag(tags)
      .then((res: AxiosResponse) => {
        setBoardTag(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData(match.params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.id]);
  return <BoardEdit data={data} boardTag={boardTag} profile={profile} />;
};

export default BoardEditContainer;
