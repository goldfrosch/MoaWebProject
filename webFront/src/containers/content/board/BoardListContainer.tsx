import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";

import BoardList from "components/main/content/board/BoardList";
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
  const [data, setData] = useState<IBoardData>({
    category: String(
      new URLSearchParams(location.search).get("category") ?? ""
    ),
    page: Number(new URLSearchParams(location.search).get("page") ?? 1),
    type: String(new URLSearchParams(location.search).get("type") ?? ""),
    query: String(new URLSearchParams(location.search).get("query") ?? "")
  });

  useEffect(() => {
    setData({
      category: String(
        new URLSearchParams(location.search).get("category") ?? ""
      ),
      page: Number(new URLSearchParams(location.search).get("page") ?? 1),
      type: String(new URLSearchParams(location.search).get("type") ?? ""),
      query: String(new URLSearchParams(location.search).get("query") ?? "")
    });
  }, [location.search]);
  return <BoardList data={data} />;
};

export default BoardContainer;
