import React from "react";
import styled from "styled-components";

import Footer from "components/common/footer/Footer";
import Header from "components/common/header/Header";

interface BaseTemplateProps {}

const BaseTemplate: React.FC<BaseTemplateProps> = ({ children }) => {
  return (
    <BaseTemplateBlock>
      <Header />
      <div className="content">
        <div className="side" />
        <div className="main">{children}</div>
        <div className="side" />
      </div>
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

    display: flex;
    & > .side {
      min-height: 90vh;
      flex: 1;
    }
    & > .main {
      width: 1080px;
      @media (max-width: 1080px) {
        width: 90%;
      }
      @media (max-width: 800px) {
        width: 100%;
      }
    }
  }
`;
export default BaseTemplate;
