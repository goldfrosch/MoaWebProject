import React from "react";
import styled from "styled-components";

interface NotFoundProps {}
const NotFound: React.FC<NotFoundProps> = () => {
  return <NotFoundBlock>123</NotFoundBlock>;
};

const NotFoundBlock = styled.div`
  width: 100%;
  height: 100vh;

  background-color: yellow;
`;

export default NotFound;
