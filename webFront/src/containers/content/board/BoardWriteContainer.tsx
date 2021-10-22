import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";

import BoardWrite from "components/main/content/board/BoardWrite";

interface BoardWriteContainerProps {}
const BoardWriteContainer: React.FC<
  RouteComponentProps<BoardWriteContainerProps>
> = ({ location }) => {
  const [data, setData] = useState<string>("");

  useEffect(() => {
    setData(String(new URLSearchParams(location.search).get("type") ?? ""));
  }, [location, data]);

  return <BoardWrite data={data} />;
};

export default BoardWriteContainer;
