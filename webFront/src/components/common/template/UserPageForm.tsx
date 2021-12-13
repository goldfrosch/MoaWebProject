import React from "react";
import styled from "styled-components";

interface IUserPageFormProps {}
const UserPageForm: React.FC<IUserPageFormProps> = ({ children }) => {
  return <UserPageFormBlock>{children}</UserPageFormBlock>;
};

const UserPageFormBlock = styled.div`
  width: 100%;
  max-width: 1080px;

  @media (max-width: 1080px) {
    max-width: 90%;
    min-width: 750px;
  }
  @media (max-width: 768px) {
    max-width: 100%;
    min-width: 100%;
  }
`;

export default UserPageForm;
