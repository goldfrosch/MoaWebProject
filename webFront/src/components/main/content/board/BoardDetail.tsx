import React, { useState } from "react";
import styled from "styled-components";
import DateUtils from "utils/DateUtils";

import { IBoardDetailData } from "modules/board/type";
import Button from "components/common/items/Button";
import { ThemeColor, ThemeSize } from "styles/Pallete";
interface BoardDetailProps {
  data: IBoardDetailData;
}
const BoardDetail: React.FC<BoardDetailProps> = ({ data }) => {
  const [comment, setComment] = useState<string>("");
  return (
    <BoardDetailBlock>
      <div className="header">
        <div className="text">
          <span className="prefix">
            {data.prefix !== "" ? <>[ {data.prefix} ]</> : data.prefix}
          </span>
          <span className="title">{data.title}</span>
        </div>
        <div className="profile">
          <img src={`https://mc-heads.net/avatar/${data.uuid}`} alt="" />
          <span className="nick">{data.nickName}</span>
          <span className="time">
            {DateUtils.getPrevTime(data.createdDate)}
          </span>
        </div>
      </div>
      <div
        className="board"
        dangerouslySetInnerHTML={{
          __html: data.content
        }}
      ></div>
      <div className="footer">
        <textarea
          value={comment}
          onChange={(e: any) => setComment(e.target.value)}
          placeholder="댓글을 작성해주세요"
        />
        <div className="commentOption">
          <Button theme={ThemeColor.first} size={ThemeSize.large}>
            댓글 작성
          </Button>
        </div>
      </div>
    </BoardDetailBlock>
  );
};

const BoardDetailBlock = styled.div`
  padding: 32px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  & > .header {
    width: 100%;
    border-bottom: 1px solid #e9e9e9;

    margin-bottom: 24px;

    padding: 24px;

    display: flex;
    justify-content: space-between;
    @media (max-width: 800px) {
      padding: 8px;

      flex-direction: column;
    }
    & > .text {
      padding: 16px 0;
      & > .title {
        font-weight: 600;
        font-size: 20px;
        color: #787878;

        padding: 0 8px;
      }
      & > .prefix {
        font-size: 14px;
      }
    }
    & > .profile {
      display: flex;
      align-items: flex-end;

      padding: 16px 4px;
      & > img {
        width: 16px;
        height: 16px;
      }
      & > .nick {
        font-size: 12px;
        font-weight: 500;

        padding: 0 4px;
      }
      & > .time {
        color: #575757;

        padding-left: 8px;

        font-size: 8px;
        font-weight: 500;
      }
    }
  }
  & > .board {
    width: 100%;

    padding: 16px;
    margin-bottom: 16px;

    overflow: auto;
  }
  & > .footer {
    width: 100%;
    border-top: 1px solid #e9e9e9;
    padding: 16px 0;
    & > textarea {
      width: 100%;
      height: 128px;

      background-color: none;
      border: none;
      border-bottom: 1px solid #e9e9e9;
      font-size: 14px;

      padding: 12px;

      resize: none;
    }
    & > .commentOption {
      width: 100%;

      display: flex;
      align-items: flex-end;
      justify-content: flex-end;

      & > span {
        font-size: 14px;
        font-weight: 500;
        padding-right: 12px;
        padding-bottom: 5px;
      }
    }
    & > .comment {
      width: 100%;
      border-bottom: 1px solid #e9e9e9;
    }
  }
  & > .commentList {
  }
`;
export default BoardDetail;
