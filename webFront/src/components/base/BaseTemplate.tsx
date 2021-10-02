import Header from "components/common/header/Header";
import React from "react";
import styled from "styled-components";

interface BaseTemplateProps {}

const BaseTemplate: React.FC<BaseTemplateProps> = ({ children }) => {
  return (
    <BaseTemplateBlock>
      <Header />
      <div className="content">{children}</div>
    </BaseTemplateBlock>
  );
};

const BaseTemplateBlock = styled.div`
  display: flex;
  flex-direction: column;

  .content {
    flex: 1;
  }
`;
export default BaseTemplate;
