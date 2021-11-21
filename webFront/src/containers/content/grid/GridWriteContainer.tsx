import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";

import { AxiosResponse } from "axios";
import * as BoardAPI from "api/board";

import GridWrite from "components/main/content/grid/GridWrite";

interface GridWriteContainerProps {}
const GridWriteContainer: React.FC<
  RouteComponentProps<GridWriteContainerProps>
> = ({ location }) => {
  const [data, setData] = useState<string>("");
  const [boardTag, setBoardTag] = useState<string[]>([]);

  const getBoardWriteData = () => {
    BoardAPI.getBoardTag(
      String(
        new URLSearchParams(location.search).get("category")?.toUpperCase()
      )
    )
      .then((res: AxiosResponse) => {
        setBoardTag(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    setData(String(new URLSearchParams(location.search).get("category") ?? ""));
    getBoardWriteData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, data]);

  return <GridWrite data={data} boardTag={boardTag} />;
};

export default GridWriteContainer;
