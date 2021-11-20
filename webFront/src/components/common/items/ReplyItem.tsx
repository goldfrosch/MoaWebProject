import { IProfile } from "modules/auth/type";
import { IBoardReply } from "modules/board/type";
import React, { useState } from "react";
import styled from "styled-components";
import { ThemeColor, ThemeSize } from "styles/Pallete";
import BoardProfile from "./BoardProfile";
import Button from "./Button";

interface ReplyItemProps {
  reply: IBoardReply;
  profile: IProfile;
  deleteComment: (id: number) => void;
  putComment: (id: number, context: string) => void;
}
const ReplyItem: React.FC<ReplyItemProps> = ({
  reply,
  profile,
  deleteComment,
  putComment
}) => {
  const [isNotEdit, setIsNotEdit] = useState<boolean>(true);
  const [editReply, setEditReply] = useState<string>("");
  return (
    <ReplyItemBlock>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between"
        }}
      >
        <BoardProfile
          nickName={reply.nickName}
          uuid={reply.uuid}
          createdDate={reply.createdDate}
        />
        <div>
          {isNotEdit ? (
            reply.uuid === profile.uuid && (
              <>
                <Button
                  theme={ThemeColor.first}
                  size={ThemeSize.small}
                  onClick={() => setIsNotEdit(!isNotEdit)}
                >
                  수정
                </Button>

                <span> </span>
                {(reply.uuid === profile.uuid || profile.rank >= 5) && (
                  <Button
                    theme={ThemeColor.first}
                    size={ThemeSize.small}
                    onClick={() => deleteComment(reply.id)}
                  >
                    삭제
                  </Button>
                )}
              </>
            )
          ) : (
            <>
              <Button
                theme={ThemeColor.first}
                size={ThemeSize.small}
                onClick={() => putComment(reply.id, editReply)}
              >
                저장
              </Button>

              <span> </span>
              {(reply.uuid === profile.uuid || profile.rank >= 5) && (
                <Button
                  theme={ThemeColor.first}
                  size={ThemeSize.small}
                  onClick={() => setIsNotEdit(!isNotEdit)}
                >
                  취소
                </Button>
              )}
            </>
          )}
        </div>
      </div>
      <textarea
        defaultValue={reply.comment}
        disabled={isNotEdit}
        onChange={(e: any) => setEditReply(e.target.value)}
      />
    </ReplyItemBlock>
  );
};

const ReplyItemBlock = styled.div`
  padding-left: 8px;
  padding-left: 24px;
  textarea {
    width: 100%;

    border: 2px solid #e9e9e9;
    border-radius: 8px;

    padding: 8px;

    resize: none;
  }
  textarea:disabled {
    background-color: white;
    color: #898989;
  }
`;

export default ReplyItem;
