import React from "react";
import styled from "styled-components";

interface UserInfoProps {}
const UserInfo: React.FC<UserInfoProps> = () => {
  return (
    <UserInfoBlock>
      <div className="title">
        <h2>유저 정보</h2>
      </div>
      <div className="content"></div>
    </UserInfoBlock>
  );
};

const UserInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 32px;
  & > .title {
    width: 100%;
    padding: 8px;
    border-bottom: 1px solid #e9e9e9;
    & > h2 {
      font-size: 24px;
    }
  }
`;

export default UserInfo;
