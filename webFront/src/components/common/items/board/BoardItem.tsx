import React from "react";
import styled from "styled-components";

import { IBoardListData } from "modules/board/type";

import DateUtils from "utils/DateUtils";
import history from "utils/HistoryUtils";

interface IBoardItemProps {
  data: IBoardListData;
  type: "important" | "normal";
  image?: string;
}
const BoardItem: React.FC<IBoardItemProps> = ({ data, image, type }) => {
  return (
    <BoardItemBlock
      type={type}
      onClick={() => {
        history.push(`/user/board/${data.id}`);
      }}
    >
      <div className="profile">
        {image && <img src={image} alt="" />}
        <div className="form">
          <div className="title">
            <span className="prefix">
              {data.prefix !== "" ? "[ " + data.prefix + " ]" : ""}
            </span>
            <span className="title">{data.title}</span>
            {data.commentCount > 0 && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {" "}
                [ {data.commentCount} ]
              </span>
            )}
          </div>
          <div className="info">
            <img
              src={`https://crafatar.com/renders/head/${
                data.uuid !== ""
                  ? data.uuid
                  : "ec561538-f3fd-461d-aff5-086b22154bce"
              }`}
              alt=""
            />
            <span className="nick">{data.nickName}</span>
          </div>
        </div>
      </div>
      <div className="time">
        <span className="times">{DateUtils.getPrevTime(data.createdDate)}</span>
      </div>
    </BoardItemBlock>
  );
};

type BoardItemBlockProps = {
  type: "important" | "normal";
};
const BoardItemBlock = styled.div<BoardItemBlockProps>`
  width: 100%;
  min-height: 56px;

  background-color: ${props =>
    props.type === "important" ? "#f6f6f6" : "#ffffff"};

  border-bottom: 1px solid #e7e7e7;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 16px;

  cursor: pointer;

  & > .profile {
    display: flex;
    align-items: center;
    & > img {
      width: 24px;
      height: 24px;

      margin-right: 8px;
    }
    & > .form {
      & > .title {
        display: flex;
        & > .prefix {
          font-size: 12px;
          font-weight: 500;
        }
        & > .title {
          padding-left: 6px;
          font-size: 14px;
          font-weight: 400;
        }
      }
      & > .info {
        display: flex;
        align-items: center;
        & > img {
          width: 16px;
          height: 16px;
        }
        & > .nick {
          color: #464646;
          font-size: 12px;
          font-weight: 500;

          padding-left: 6px;
        }
      }
    }
  }
  & > .time {
    display: flex;
    align-items: center;
    & > .times {
      color: #797979;
      font-size: 12px;
    }
  }
  :hover {
    background-color: #e0e0e0;
  }
  @media (max-width: 768px) {
    padding: 0 4px;
    & > .profile .form .title {
      @media (max-width: 360px) {
        flex-direction: column;
      }
      & > .title {
        max-width: 150px;

        display: block;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
`;

export default BoardItem;
