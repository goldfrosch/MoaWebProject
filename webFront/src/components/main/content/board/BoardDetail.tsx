import { IBoardListData } from "modules/board/type";
import React from "react";
import styled from "styled-components";
import DateUtils from "utils/DateUtils";

interface BoardDetailProps {
  data: IBoardListData;
}
const BoardDetail: React.FC<BoardDetailProps> = ({ data }) => {
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
          __html: data?.content ? data.content : ""
        }}
      ></div>
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

    padding: 0 16px;

    display: flex;
    justify-content: space-between;
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
    height: 360px;
    border: 1px solid #e9e9e9;

    padding: 16px;

    overflow-y: auto;
  }
`;
export default BoardDetail;
