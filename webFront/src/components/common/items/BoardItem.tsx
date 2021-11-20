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

  & > .borderHead {
    padding: 12px 8px;
    border-bottom: 1px solid #e9e9e9;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  & > .borderBody {
    padding: 8px 12px;

    :hover {
      background-color: #f7f7f7;
      transform: scale(1.025);
    }
  }
`;

export default BoardItem;
