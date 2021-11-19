import React from "react";
import styled from "styled-components";

interface ReplyItemProps {}
const ReplyItem: React.FC<ReplyItemProps> = () => {
  return <ReplyItemBlock></ReplyItemBlock>;
};

const ReplyItemBlock = styled.div`
  padding-left: 8px;
  & > .reply {
    padding-left: 24px;
  }
`;

export default ReplyItem;
