import React from "react";
import styled from "styled-components";

import { Palette, ThemeColor, ThemeSize } from "styles/Pallete";

import Button from "components/common/items/Button";

interface BoardWriteProps {
  data: string;
}
const BoardWrite: React.FC<BoardWriteProps> = ({ data }) => {
  return (
    <BoardWriteBlock>
      <div className="main">
        <div className="header">
          <h2 className="title">글 작성하기</h2>
          <div className="option">
            <select className="category" disabled>
              <option>{data}</option>
            </select>
            <select className="tag">
              <option>말머리 없음?</option>
            </select>
          </div>
          <div className="option">
            <input placeholder="제목을 입력해주세요" />
          </div>
        </div>
        <div>asfdasfd</div>
        <div className="footer">
          <Button theme={ThemeColor.first} size={ThemeSize.large}>
            저장하기
          </Button>
        </div>
      </div>
    </BoardWriteBlock>
  );
};

const BoardWriteBlock = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & > .main {
    width: 100%;
    height: 768px;

    padding: 16px 0;
    display: flex;
    flex-direction: column;
    & > .header {
      height: 20vh;
      color: #797979;

      padding: 16px 0;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      & > .title {
        color: ${Palette.primary};

        font-size: 24px;
        font-weight: 700;
      }
      & > .option {
        display: flex;
        gap: 8px;
        padding: 8px 0;
        & > select {
          border: 1px solid #e7e7e7;
          height: 42px;
        }
        & > .category {
          width: 80%;
        }
        & > .tag {
          width: 20%;
        }
        & > input {
          width: 100%;
          height: 42px;

          border: 1px solid #b8b7b7;
          padding-left: 8px;
          margin-bottom: 16px;
        }
      }
    }
    & > .footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
`;

export default BoardWrite;
