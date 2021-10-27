import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";

import BoardWrite from "components/main/content/board/BoardWrite";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "modules";
import { setMessageClearAction } from "modules/snackbar/snackbar";

interface BoardWriteContainerProps {}
const BoardWriteContainer: React.FC<
  RouteComponentProps<BoardWriteContainerProps>
> = ({ location }) => {
  const [data, setData] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const snack = useSelector((state: IRootState) => state.snackbar);

  useEffect(() => {
    setData(String(new URLSearchParams(location.search).get("category") ?? ""));
  }, [location, data]);

  useEffect(() => {
    if (snack.msg !== "") {
      enqueueSnackbar(snack.msg, { variant: snack.types });
    }
  }, [enqueueSnackbar, snack]);

  useEffect(() => {
    dispatch(setMessageClearAction());
    return () => {
      dispatch(setMessageClearAction());
    };
  });

  return <BoardWrite data={data} />;
};

export default BoardWriteContainer;
