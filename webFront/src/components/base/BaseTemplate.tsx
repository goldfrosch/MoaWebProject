import React from "react";
import styled from "styled-components";

import Footer from "components/common/footer/Footer";
import HeaderContainer from "containers/common/HeaderContainer";

interface BaseTemplateProps {}

const BaseTemplate: React.FC<BaseTemplateProps> = ({ children }) => {
  return (
    <BaseTemplateBlock>
      <HeaderContainer />
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
  display: flex;
  flex-direction: column;

  & > .content {
    padding: 0 16px;
    min-height: 90vh;

    display: flex;
    justify-content: center;
    & > .main {
      width: 80%;
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
