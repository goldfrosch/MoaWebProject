import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";

import BoardList from "components/main/content/board/BoardList";
export interface IBoardData {
  type: string;
  page: number;
  search: string;
  query: string;
}

interface BoardContainerProps {}
const BoardContainer: React.FC<RouteComponentProps<BoardContainerProps>> = ({
  location
}) => {
  const [data, setData] = useState<IBoardData>({
    type: String(new URLSearchParams(location.search).get("type") ?? ""),
    page: Number(new URLSearchParams(location.search).get("page") ?? 1),
    search: String(new URLSearchParams(location.search).get("search") ?? ""),
    query: String(new URLSearchParams(location.search).get("query") ?? "")
  });

  useEffect(() => {
    setData({
      type: String(new URLSearchParams(location.search).get("type") ?? ""),
      page: Number(new URLSearchParams(location.search).get("page") ?? 1),
      search: String(new URLSearchParams(location.search).get("search") ?? ""),
      query: String(new URLSearchParams(location.search).get("query") ?? "")
    });
  }, [location.search]);
  return <BoardList data={data} />;
};

export default BoardContainer;
