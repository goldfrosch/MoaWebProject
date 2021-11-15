import React, { useEffect, useState } from "react";

import BoardDetail from "components/main/content/board/BoardDetail";

import { AxiosResponse } from "axios";
import * as BoardAPI from "api/board";

import { IBoardDetail, IComment } from "modules/board/type";
import { useSelector } from "react-redux";
import { IRootState } from "modules";
import history from "utils/HistoryUtils";

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

  const postComment = (comment: string, parentNum: number) => {
    if (comment === "") return alert("댓글이 비어있습니다");
    if (window.confirm("댓글을 등록하시겠습니까?")) {
      let data: IComment = {
        boardNum: match.params.id,
        comment: comment,
        parentNum: parentNum
      };
      console.log(parentNum);
      BoardAPI.postComment(data)
        .then(() => {
          alert("성공적으로 등록되었습니다");
          window.location.reload();
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const deleteComment = (id: number) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      BoardAPI.deleteComment(id)
        .then(() => {
          BoardAPI.getBoard(match.params.id)
            .then((res: AxiosResponse) => {
              setData(res.data);
            })
            .catch(error => {
              console.log(error);
              history.goBack();
            });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    BoardAPI.getBoard(match.params.id)
      .then((res: AxiosResponse) => {
        setData(res.data);
      })
      .catch(error => {
        console.log(error);
        history.goBack();
      });
  }, [match.params.id]);
  return (
    <BoardDetail
      data={data}
      profile={profile}
      deleteComment={deleteComment}
      postComment={postComment}
    />
  );
};

export default BoardDetailContainer;
