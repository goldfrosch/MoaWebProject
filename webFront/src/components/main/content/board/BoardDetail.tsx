import { IBoardListData } from "modules/board/type";
import React from "react";
import styled from "styled-components";

interface BoardDetailProps {
  data: IBoardListData;
}
const BoardDetail: React.FC<BoardDetailProps> = ({ data }) => {
  return (
    <BoardDetailBlock>
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
  display: flex;
  justify-content: center;
  & > .board {
    width: 80%;
    border: 1px solid #797979;

    padding: 16px;
  }
`;
export default BoardDetail;
