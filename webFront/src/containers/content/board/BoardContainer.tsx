import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import BoardList from "components/main/content/board/Board";

export interface BoardPageParams {
  type: string;
  page: number;
  search: string;
  query: string;
}

interface BoardContainerProps {}
const BoardContainer: React.FC<RouteComponentProps<BoardContainerProps>> = ({
  location
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState<BoardPageParams>({
    type: String(new URLSearchParams(location.search).get("type") ?? "free"),
    page: Number(new URLSearchParams(location.search).get("page") ?? 1),
    search: String(new URLSearchParams(location.search).get("search") ?? ""),
    query: String(new URLSearchParams(location.search).get("query") ?? "")
  });

  return <BoardList data={data} />;
};

export default BoardContainer;
