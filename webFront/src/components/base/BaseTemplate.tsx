import React from "react";
import styled from "styled-components";

import Footer from "components/common/footer/Footer";
import Header from "components/common/header/Header";
interface BaseTemplateProps {}

const BaseTemplate: React.FC<BaseTemplateProps> = ({ children }) => {
  return (
    <BaseTemplateBlock>
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </BaseTemplateBlock>
  );
};

const BaseTemplateBlock = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .content {
    flex: 1;
  }
`;
export default BaseTemplate;
