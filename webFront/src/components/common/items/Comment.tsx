import React, { useState } from "react";
import styled from "styled-components";

import BoardProfile from "components/common/items/BoardProfile";
import { IBoardCommentsItem } from "modules/board/type";
import Button from "./Button";
import { ThemeColor, ThemeSize } from "styles/Pallete";
import { IProfile } from "modules/auth/type";

interface CommentProps {
  item: IBoardCommentsItem;
  profile: IProfile;
  deleteComment: (id: number) => void;
}
const Comment: React.FC<CommentProps> = ({ item, profile, deleteComment }) => {
  const [edit, setEdit] = useState<boolean>(true);
  const [reply, setReply] = useState<boolean>(false);
  return (
    <CommentBlock>
      <div className="item">
        <div className="profile">
          {item.comment.isDeleted ? (
            <BoardProfile
              nickName={"삭제됨"}
              uuid={"7b216089b1f644a4ac76bf711009df0e"}
              createdDate={item.comment.createdDate}
            />
          ) : (
            <BoardProfile
              nickName={item.comment.nickName}
              uuid={item.comment.uuid}
              createdDate={item.comment.createdDate}
            />
          )}
          {edit ? (
            <div>
              {item.comment.uuid === profile.uuid && (
                <Button
                  theme={ThemeColor.first}
                  size={ThemeSize.small}
                  onClick={() => setEdit(!edit)}
                >
                  수정
                </Button>
              )}
              <span> </span>
              {(item.comment.uuid === profile.uuid || profile.rank >= 5) && (
                <Button
                  theme={ThemeColor.first}
                  size={ThemeSize.small}
                  onClick={() => deleteComment(item.comment.id)}
                >
                  삭제
                </Button>
              )}
            </div>
          ) : (
            <div>
              <Button theme={ThemeColor.first} size={ThemeSize.small}>
                저장
              </Button>
              <span> </span>
              <Button
                theme={ThemeColor.first}
                size={ThemeSize.small}
                onClick={() => setEdit(!edit)}
              >
                취소
              </Button>
            </div>
          )}
        </div>
        {item.comment.isDeleted ? (
          <textarea
            value="삭제된 게시글 입니다"
            disabled={true}
            style={{ color: "gray" }}
          />
        ) : (
          <textarea defaultValue={item.comment.comment} disabled={edit} />
        )}
      </div>
      <span onClick={() => setReply(!reply)}>답글보기</span>
    </CommentBlock>
  );
};

const CommentBlock = styled.div`
  width: 100%;
  & > .item {
    & > .profile {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    & > .replyList {
      padding-left: 8px;
      & > span {
        color: #979797;
        cursor: pointer;
      }
      & > .reply {
        padding-left: 24px;
      }
    }
  }
  textarea {
    width: 100%;

    border: 2px solid #e9e9e9;
    border-radius: 8px;

    padding: 8px;

    resize: none;
  }
  textarea:disabled {
    background-color: white;
  }
  & > span {
    color: #979797;
    cursor: pointer;
  }
`;

export default Comment;
