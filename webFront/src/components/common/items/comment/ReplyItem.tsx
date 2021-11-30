import { IProfile } from "modules/auth/type";
import { IBoardReply } from "modules/board/type";
import React, { useState } from "react";
import styled from "styled-components";
import { Palette } from "styles/Pallete";
import BoardProfile from "components/common/items/BoardProfile";
import OptionList from "../optionMenu/Option";
import OptionItem from "../optionMenu/OptionItem";

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
          profile={reply.profile}
          nickName={reply.nickName}
          uuid={reply.uuid}
          createdDate={reply.createdDate}
        />
        <div>
          {(reply.uuid === profile.uuid || profile.rank >= 5) && (
            <OptionList>
              {isNotEdit ? (
                <>
                  {reply.uuid === profile.uuid && (
                    <OptionItem onClick={() => setIsNotEdit(!isNotEdit)}>
                      <span>수정</span>
                    </OptionItem>
                  )}
                  <OptionItem onClick={() => deleteComment(reply.id)}>
                    <span>삭제</span>
                  </OptionItem>
                </>
              ) : (
                <>
                  {reply.uuid === profile.uuid && (
                    <OptionItem onClick={() => putComment(reply.id, editReply)}>
                      <span>저장</span>
                    </OptionItem>
                  )}
                  <OptionItem onClick={() => setIsNotEdit(!isNotEdit)}>
                    <span>취소</span>
                  </OptionItem>
                </>
              )}
            </OptionList>
          )}
        </div>
      </div>
      {isNotEdit ? (
        <div className="replyComment">
          <span>{reply.comment}</span>
        </div>
      ) : (
        <textarea
          defaultValue={reply.comment}
          onChange={(e: any) => setEditReply(e.target.value)}
        />
      )}
    </ReplyItemBlock>
  );
};

const ReplyItemBlock = styled.div`
  padding-left: 24px;
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
  .replyComment {
    margin-bottom: 24px;
  }
`;

export default ReplyItem;
