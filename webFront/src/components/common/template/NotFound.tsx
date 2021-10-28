import React from "react";
import styled from "styled-components";

import NotFoundImage from "assets/image/notFound.gif";

interface NotFoundProps {}
const NotFound: React.FC<NotFoundProps> = () => {
  return (
    <NotFoundBlock>
      <img src={NotFoundImage} alt="" />
      <h2>준비중이거나, 존재하지 않는</h2>
      <h2>사이트입니다. 다시 확인해주세요</h2>
    </NotFoundBlock>
  );
};

const NotFoundBlock = styled.div`
  width: 100%;
  height: 90vh;

  padding: 32px 16px;

  display: flex;
  flex-direction: column;
  align-items: center;

  & > img {
    width: 80%;
    height: 50%;

    margin-bottom: 32px;
  }
  & > h2 {
    font-size: 24px;
    font-weight: 600;
    @media (max-width: 800px) {
      font-size: 16px;
    }
  }
`;

export default NotFound;
