import Pagination from "components/common/items/Pagination";
import React from "react";
import styled from "styled-components";
import { Palette } from "styles/Pallete";

export interface BoardListProps {
  title: string;
  context: string;
}
const BoardList: React.FC<BoardListProps> = ({ title, context }) => {
  const testClick = (id: number) => {
    console.log(id);
  };
  return (
    <BoardListBlock>
      <div className="main">
        <div className="header">
          <h2 className="title">{title}</h2>
          <span>{context}</span>
        </div>
        <div className="content">
          <div className="importantItem"></div>
          <div className="importantItem"></div>
          <div className="importantItem"></div>
          <div className="importantItem"></div>
          <div className="importantItem"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
        </div>
        <div className="footer">
          <Pagination
            nowPage={1}
            movePage={() => testClick(1)}
            totalCounts={500}
          />
        </div>
      </div>
    </BoardListBlock>
  );
};

const BoardListBlock = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  & > .main {
    width: 100%;

    padding: 16px 0;

    display: flex;
    flex-direction: column;
    & > .header {
      height: 18vh;
      color: #797979;

      border-bottom: 1px solid #e7e7e7;

      padding: 16px 0;

      & > .title {
        color: ${Palette.primary};

        font-size: 24px;
        font-weight: 700;
      }
    }

    & > .content {
      flex: 1;

      display: flex;
      flex-direction: column;
      align-items: center;
      & > .importantItem {
        width: 100%;
        height: 48px;
        background-color: #f6f6f6;
        border-bottom: 1px solid #e7e7e7;
      }
      & > .item {
        width: 100%;
        height: 56px;
        border-bottom: 1px solid #e7e7e7;
      }
    }

    & > .footer {
      height: 12vh;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  @media (max-width: 800px) {
    padding: 0;
  }
`;

export default BoardList;
