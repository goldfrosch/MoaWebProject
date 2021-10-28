import React, { useEffect, useState } from "react";

import BoardDetail from "components/main/content/board/BoardDetail";

import { AxiosResponse } from "axios";
import * as BoardAPI from "api/board";
import { IBoardListData } from "modules/board/type";

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

const BoardDetailContainer: React.FC<RouteComponentProps<MatchParams>> = ({
  match
}) => {
  const [data, setData] = useState<IBoardListData>({
    id: 0,
    category: "",
    count: 0,
    content: "",
    createdDate: new Date(),
    isLove: 0,
    nickName: "",
    prefix: "",
    rank: 0,
    title: "",
    uuid: ""
  });

  useEffect(() => {
    BoardAPI.getBoard(match.params.id)
      .then((res: AxiosResponse) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [match.params.id]);
  return <BoardDetail data={data} />;
};

export default BoardDetailContainer;
