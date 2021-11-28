import React from "react";
import styled from "styled-components";

import { IBoardListData } from "modules/board/type";
import BoardProfile from "components/common/items/BoardProfile";

import Thumbnail from "assets/image/thumbnail.jpg";
import history from "utils/HistoryUtils";

interface ICardData {
  data: IBoardListData;
}
const Card: React.FC<ICardData> = ({ data }) => {
  return (
    <CardBlock onClick={() => history.push(`/board/${data.id}`)}>
      <div className="item">
        <img
          src={
            data.thumbnail !== ""
              ? `http://moasv.co.kr/images/${data.thumbnail}`
              : Thumbnail
          }
          style={{ width: "100%" }}
          alt=""
        />
        <span
          style={{
            padding: "6px",
            color: "#424242",
            fontSize: "16px",
            fontWeight: 500,
            fontFamily: "A17",
            textOverflow: "ellipsis"
          }}
        >
          {data.prefix !== "" && [data.prefix]}
          {data.title}
        </span>
        <BoardProfile
          nickName={data.nickName}
          uuid={data.uuid}
          createdDate={data.createdDate}
        />
      </div>
    </CardBlock>
  );
};

const CardBlock = styled.div`
  & > .item {
    width: 100%;
    height: auto;
    background-color: white;

    border: 1px solid #d7d7d7;
    border-radius: 8px;

    padding: 2.5% 5%;

    display: flex;
    flex-direction: column;
    justify-content: center;

    cursor: pointer;

    & > img {
      width: 90%;
      height: auto;
      object-fit: cover;
    }
  }
  & > .item:hover {
    transform: scale(1.025);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;

export default Card;
