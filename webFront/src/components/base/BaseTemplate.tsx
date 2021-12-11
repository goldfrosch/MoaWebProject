import React from "react";
import styled from "styled-components";

import Footer from "components/common/footer/Footer";
import HeaderContainer from "containers/common/HeaderContainer";

interface BaseTemplateProps {}

const BaseTemplate: React.FC<BaseTemplateProps> = ({ children }) => {
  return (
    <BaseTemplateBlock>
      <HeaderContainer />
      <div className="content">{children}</div>
      <Footer />
    </BaseTemplateBlock>
  );
};

const BaseTemplateBlock = styled.div`
  display: flex;
  flex-direction: column;

  & > .content {
    min-height: 90vh;

    display: flex;
    justify-content: center;
  }
`;
export default BaseTemplate;
