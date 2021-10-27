import React from "react";
import styled from "styled-components";

interface BoardDetailProps {}
const BoardDetail: React.FC<BoardDetailProps> = () => {
  let codes = "<b>123123</b>";
  return (
    <BoardDetailBlock>
      <div dangerouslySetInnerHTML={{ __html: codes }}></div>
    </BoardDetailBlock>
  );
};

const BoardDetailBlock = styled.div``;
export default BoardDetail;
