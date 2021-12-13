import React from "react";
import styled from "styled-components";

interface IMobileNotFormProps {}
const MobileNotForm: React.FC<IMobileNotFormProps> = ({ children }) => {
  return (
    <MobileNotFormBlock>
      <div className="main">{children}</div>
      <div className="notMobile">
        <span>모바일 지원 안합니다</span>
      </div>
    </MobileNotFormBlock>
  );
};

const MobileNotFormBlock = styled.div`
  & > .main {
    display: block;
    @media (max-width: 768px) {
      display: none;
    }
  }
  & > .notMobile {
    display: none;
    @media (max-width: 768px) {
      display: block;
    }
  }
`;

export default MobileNotForm;
