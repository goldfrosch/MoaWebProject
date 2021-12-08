import React, { useState } from "react";
import styled from "styled-components";

import BoardProfile from "components/common/items/BoardProfile";
import { IBoardCommentsItem } from "modules/board/type";
import Button from "../Button";
import { Palette, ThemeColor, ThemeSize } from "styles/Pallete";
import { IProfile } from "modules/auth/type";
import ReplyItem from "./ReplyItem";
import OptionList from "../optionMenu/Option";
import OptionItem from "../optionMenu/OptionItem";

interface CommentProps {
  item: IBoardCommentsItem;
  profile: IProfile;
  deleteComment: (id: number) => void;
  postComment: (comment: string, parentNum: number) => void;
  putComment: (id: number, context: string) => void;
}
const Comment: React.FC<CommentProps> = ({
  item,
  profile,
  deleteComment,
  postComment,
  putComment
}) => {
  const [edit, setEdit] = useState<boolean>(true);
  const [context, setContext] = useState<string>("");
  const [reply, setReply] = useState<boolean>(false);
  const [newReply, setNewReply] = useState<string>("");
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
              profile={item.comment.profile}
              nickName={item.comment.nickName}
              uuid={item.comment.uuid}
              createdDate={item.comment.createdDate}
            />
          )}
          {!item.comment.isDeleted && (
            <>
              {(item.comment.uuid === profile.uuid || profile.rank >= 5) && (
                <OptionList>
                  {edit ? (
                    (item.comment.uuid === profile.uuid ||
                      profile.rank >= 5) && (
                      <>
                        {item.comment.uuid === profile.uuid && (
                          <OptionItem onClick={() => setEdit(!edit)}>
                            <span>수정</span>
                          </OptionItem>
                        )}
                        <OptionItem
                          onClick={() => deleteComment(item.comment.id)}
                        >
                          <span>삭제</span>
                        </OptionItem>
                      </>
                    )
                  ) : (
                    <>
                      <OptionItem
                        onClick={() => putComment(item.comment.id, context)}
                      >
                        <span>저장</span>
                      </OptionItem>
                      <OptionItem onClick={() => setEdit(!edit)}>
                        <span>취소</span>
                      </OptionItem>
                    </>
                  )}
                </OptionList>
              )}
            </>
          )}
        </div>
        {item.comment.isDeleted ? (
          <span>삭제된 게시글 입니다</span>
        ) : edit ? (
          <span style={{ wordBreak: "keep-all" }}>{item.comment.comment}</span>
        ) : (
          <textarea
            defaultValue={item.comment.comment}
            disabled={edit}
            onChange={(e: any) => setContext(e.target.value)}
          />
        )}
      </div>
      <span onClick={() => setReply(!reply)}>
        답글보기{item.replyList.length > 0 && <> ({item.replyList.length}개)</>}
      </span>
      {reply && (
        <div style={{ padding: "16px 0" }}>
          {item.replyList.map((reply, index) => (
            <ReplyItem
              reply={reply}
              profile={profile}
              deleteComment={deleteComment}
              putComment={putComment}
              key={index}
            />
          ))}
          <div style={{ width: "100%", paddingLeft: "24px" }}>
            <textarea
              defaultValue={newReply}
              placeholder={
                profile.email !== ""
                  ? "답글을 입력해주세요"
                  : "로그인 후 댓글을 작성하세요"
              }
              onChange={(e: any) => {
                if (e.target.value.length <= 300) {
                  setNewReply(e.target.value);
                }
              }}
              disabled={profile.email !== "" ? false : true}
            />
          </div>
          {profile.email !== "" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end"
              }}
            >
              <span style={{ paddingRight: "8px" }}>
                글자 수 제한: {newReply.length} / 300
              </span>
              <Button
                theme={ThemeColor.first}
                size={ThemeSize.small}
                onClick={() => postComment(newReply, item.comment.id)}
              >
                등록
              </Button>
            </div>
          )}
        </div>
      )}
    </CommentBlock>
  );
};

const CommentBlock = styled.div`
  width: 100%;
  & > .item {
    margin: 24px 0;
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

    border: 2px solid ${Palette.borderGray};
    border-radius: 8px;

    padding: 8px;

    resize: none;
  }
  textarea:disabled {
    background-color: white;
    color: #898989;
  }
  & > span {
    color: #979797;
    cursor: pointer;
  }
`;

export default Comment;
