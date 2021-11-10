import React from "react";
import styled from "styled-components";

import Button from "components/common/items/Button";
import { ThemeColor, ThemeSize } from "styles/Pallete";
import HistoryUtils from "utils/HistoryUtils";

interface NotForbiddenProps {}
const NotForbidden: React.FC<NotForbiddenProps> = () => {
  return (
    <NotForbiddenBlock>
      <div className="form">
        <h1>권한이 없습니다</h1>
        <Button
          theme={ThemeColor.first}
          size={ThemeSize.large}
          onClick={() => HistoryUtils.goBack()}
        >
          뒤로가기
        </Button>
      </div>
    </NotForbiddenBlock>
  );
};

const NotForbiddenBlock = styled.div`
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  & > .form {
    width: 600px;
    height: 350px;

    border: 1px solid #979797;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 16px;
    & > h1 {
      font-size: 24px;
      padding: 32px;
    }
    @media (max-width: 800px) {
      width: 100%;
    }
  }
`;

export default NotForbidden;
