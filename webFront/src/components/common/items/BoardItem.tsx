import React from "react";
import styled from "styled-components";

interface BoardItemProps {}
const BoardItem: React.FC<BoardItemProps> = ({ children }) => {
  return <BoardItemBlock>{children}</BoardItemBlock>;
};

const BoardItemBlock = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border: 1px solid #e9e9e9;
  & > .borderHead {
    padding: 12px 8px;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  & > .borderBody {
    padding: 8px 12px;
    border-top: 1px solid #e9e9e9;

    :hover {
      background-color: #f7f7f7;
    }
  }
`;

export default BoardItem;
