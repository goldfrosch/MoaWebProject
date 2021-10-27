import React, { useEffect } from "react";

import BoardDetail from "components/main/content/board/BoardDetail";

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
  useEffect(() => {
    console.log(match.params.id);
  });
  return <BoardDetail />;
};

export default BoardDetailContainer;
