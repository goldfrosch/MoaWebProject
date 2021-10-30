import React, { useState } from "react";
import styled from "styled-components";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

import { AxiosResponse } from "axios";
import * as BoardAPI from "api/board";

import { Palette, ThemeColor, ThemeSize } from "styles/Pallete";

import Button from "components/common/items/Button";

import { IBoardData } from "modules/board/type";
import { useDispatch } from "react-redux";
import {
  setMessageClearAction,
  setMessageErrorAction,
  setMessageSuccessAction
} from "modules/snackbar/snackbar";
import history from "utils/HistoryUtils";
import DescUtils from "utils/DescUtils";

interface BoardWriteProps {
  data: string;
  boardTag: string[];
}
const BoardWrite: React.FC<BoardWriteProps> = ({ data, boardTag }) => {
  const dispatch = useDispatch();

  const [datas, setDatas] = useState<IBoardData>({
    category: data,
    content: "",
    isComment: true,
    prefix: "",
    title: ""
  });
  const [contents, setContents] = useState("");

  const Option = {
    buttonList: [
      ["bold", "underline", "italic", "strike", "align", "formatBlock"],
      [
        "font",
        "fontSize",
        "fontColor",
        "hiliteColor",
        "table",
        "link",
        "image",
        "video"
      ]
    ]
  };

  const handleSave = () => {
    dispatch(setMessageClearAction());
    console.log({
      ...datas,
      category: data.toUpperCase(),
      content: contents
    });
    BoardAPI.postBoard({
      ...datas,
      category: data.toUpperCase(),
      content: contents
    })
      .then((res: AxiosResponse) => {
        if (res.data) {
          dispatch(setMessageSuccessAction("성공적으로 작성했습니다"));
          history.goBack();
        }
      })
      .catch(error => {
        console.log(error);
        dispatch(setMessageErrorAction("글 작성 중 문제가 발생했습니다"));
      });
  };

  return (
    <BoardWriteBlock>
      <div className="main">
        <div className="header">
          <h2 className="title">글 작성하기</h2>
          <div className="option">
            <select className="category" disabled>
              <option>{DescUtils.SetTitle(data)}</option>
            </select>
            <select
              className="tag"
              onChange={(e: any) =>
                setDatas({ ...datas, prefix: e.target.value })
              }
            >
              <option value="">말머리 없음</option>
              {boardTag.map((data, key) => (
                <option value={data} key={key}>
                  {data}
                </option>
              ))}
            </select>
          </div>
          <div className="option">
            <input
              placeholder="제목을 입력해주세요"
              value={datas.title}
              onChange={(e: any) => {
                setDatas({ ...datas, title: e.target.value });
              }}
            />
          </div>
        </div>
        <div>
          <SunEditor
            autoFocus={true}
            lang="ko"
            setDefaultStyle="z-index: 0"
            width="100%"
            height="600px"
            defaultValue={contents}
            onChange={setContents}
            setOptions={Option}
          />
        </div>
        <div className="footer">
          <Button
            theme={ThemeColor.first}
            size={ThemeSize.large}
            onClick={handleSave}
          >
            저장하기
          </Button>
        </div>
      </div>
    </BoardWriteBlock>
  );
};

const BoardWriteBlock = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;

  @media (max-width: 800px) {
    height: 160vh;
  }
  @media (max-height: 600px) {
    height: 180vh;
  }

  & > .main {
    width: 100%;
    height: 768px;

    padding: 16px 0;
    display: flex;
    flex-direction: column;

    position: relative;
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
          @media (max-width: 800px) {
            width: 60%;
          }
        }
        & > .tag {
          width: 20%;
          @media (max-width: 800px) {
            width: 40%;
          }
        }
        & > input {
          width: 100%;
          height: 42px;

          border: 1px solid #b8b7b7;
          padding-left: 8px;
        }
      }
      @media (max-height: 780px) {
        margin-bottom: 15%;
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
