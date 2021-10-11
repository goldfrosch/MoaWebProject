import React from "react";
import styled from "styled-components";

interface BoardWriteProps {}
const BoardWrite: React.FC<BoardWriteProps> = () => {
  return (
    <BoardWriteBlock>
      <div className="main">
        <div>asd</div>
      </div>
    </BoardWriteBlock>
  );
};

const BoardWriteBlock = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  & > .main {
    width: 100%;

    padding: 16px 0;
  }
`;

export default BoardWrite;
