import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";

import BoardWrite from "components/main/content/board/BoardWrite";
import { useSelector } from "react-redux";
import { IRootState } from "modules";

interface BoardWriteContainerProps {}
const BoardWriteContainer: React.FC<
  RouteComponentProps<BoardWriteContainerProps>
> = ({ location }) => {
  const userData = useSelector((state: IRootState) => state.auth.profile);

  const [data, setData] = useState<string>("");

  useEffect(() => {
    setData(String(new URLSearchParams(location.search).get("category") ?? ""));
  }, [location, data]);

  return <BoardWrite data={data} userData={userData} />;
};

export default BoardWriteContainer;
