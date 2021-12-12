import React from "react";
import styled from "styled-components";

import { IBoardListData } from "modules/board/type";
import GridProfile from "components/common/items/grid/GridProfile";

import Thumbnail from "assets/image/thumbnail.jpg";
import history from "utils/HistoryUtils";

interface ICardData {
  data: IBoardListData;
}
const Card: React.FC<ICardData> = ({ data }) => {
  return (
    <CardBlock onClick={() => history.push(`/user/board/${data.id}`)}>
      <div className="item">
        <div className="image">
          <img
            src={
              data.thumbnail !== ""
                ? `http://moasv.co.kr/images/${data.thumbnail}`
                : Thumbnail
            }
            alt=""
          />
        </div>
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
          {data.commentCount > 0 && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {" "}
              [ {data.commentCount} ]
            </span>
          )}
        </span>
        <GridProfile
          profile={data.profile}
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
    height: 100%;
    background-color: white;

    border: 1px solid #d7d7d7;
    border-radius: 8px;

    padding: 2.5% 5%;

    display: flex;
    flex-direction: column;
    justify-content: center;

    cursor: pointer;
    & > .image {
      width: 100%;
      height: 100%;

      display: flex;
      align-items: center;
      & > img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
  & > .item:hover {
    transform: scale(1.025);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;

export default Card;
