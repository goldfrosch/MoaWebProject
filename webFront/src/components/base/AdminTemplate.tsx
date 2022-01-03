import React from "react";
import styled from "styled-components";

interface AdminTemplateProps {}

const AdminTemplate: React.FC<AdminTemplateProps> = ({ children }) => {
  return (
    <AdminTemplateBlock>
      <div className="content">asd{children}</div>
    </AdminTemplateBlock>
  );
};

const AdminTemplateBlock = styled.div`
  display: flex;
  flex-direction: column;

  & > .content {
    min-height: 90vh;

    display: flex;
    justify-content: center;
  }
`;
export default AdminTemplate;
