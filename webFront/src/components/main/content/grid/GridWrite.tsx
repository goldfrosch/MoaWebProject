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
import SwitchItem from "components/common/items/SwitchItem";

interface IFileData {
  file: File | null;
  preview: string;
  name: string;
}

interface GridWriteProps {
  data: string;
  boardTag: string[];
}
const GridWrite: React.FC<GridWriteProps> = ({ data, boardTag }) => {
  const dispatch = useDispatch();

  const [datas, setDatas] = useState<IBoardData>({
    category: data,
    content: "",
    isComment: true,
    prefix: "",
    title: ""
  });
  const [contents, setContents] = useState("");
  const [fileData, setFileData] = useState<IFileData>({
    file: null,
    preview: "",
    name: ""
  });
  const [isStop, setIsStop] = useState<boolean>(false);
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

  const handleChangeComment = () => {
    setDatas({
      ...datas,
      isComment: !datas.isComment
    });
  };

  const handleSave = () => {
    if (!isStop) {
      dispatch(setMessageClearAction());
      if (datas.title === "") {
        return dispatch(setMessageErrorAction("제목이 비어있습니다"));
      } else if (contents === "") {
        return dispatch(setMessageErrorAction("내용이 비어있습니다"));
      }

      setIsStop(true);
      let formData = new FormData();

      if (fileData.file) {
        formData.append("file", fileData.file);
      }

      formData.append(
        "data",
        new Blob(
          [
            JSON.stringify({
              ...datas,
              category: data.toUpperCase(),
              content: contents
            })
          ],
          { type: "application/json" }
        )
      );
      BoardAPI.postBoard(formData)
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            dispatch(setMessageSuccessAction("성공적으로 작성했습니다"));
            history.goBack();
          }
        })
        .catch(error => {
          console.log(error);
          setIsStop(false);
          dispatch(setMessageErrorAction("글 작성 중 문제가 발생했습니다"));
        });
    }
  };

  return (
    <GridWriteBlock>
      <div className="main">
        <div className="header">
          <h2 className="title">
            글 작성하기.{" "}
            <span style={{ color: "black", fontSize: "12px" }}>
              {DescUtils.SetBoardTitle(data)}
            </span>
          </h2>
          <div className="files">
            <input
              type="file"
              accept=".jpg, .png"
              onChange={(e: any) => {
                setFileData({
                  ...fileData,
                  file: e.target.files[0]
                });
              }}
            />
          </div>
          <div className="option">
            <select className="category" disabled>
              <option>{DescUtils.SetBoardTitle(data)}</option>
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
          <div className="setting">
            <span>댓글 금지: </span>
            <SwitchItem
              checked={datas.isComment}
              onChange={handleChangeComment}
            />
          </div>

          <Button
            theme={ThemeColor.first}
            size={ThemeSize.large}
            onClick={handleSave}
          >
            저장하기
          </Button>
        </div>
      </div>
    </GridWriteBlock>
  );
};

const GridWriteBlock = styled.div`
  width: 100%;
  height: 180vh;
  display: flex;
  justify-content: center;

  @media (max-width: 800px) {
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
      height: 80vh;
      color: #797979;

      padding: 16px 0;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      & > .title {
        color: ${Palette.primary};

        font-size: 20px;
        font-weight: 600;
      }
      & > .files {
        width: 40%;

        border: 2px solid #a9a9a9;
        border-radius: 4px;

        padding: 4px;
        margin: 8px 0;
        & > input {
          width: 220px;
        }
        @media (max-width: 800px) {
          width: 100%;
        }
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
      @media (max-width: 800px) {
        margin-bottom: 15%;
      }
    }
    & > .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;

      & > .setting {
        display: flex;
        align-items: center;
        & > span {
          padding: 0 8px;
          font-size: 18px;
          font-weight: 500;
        }
      }
    }
  }
`;

export default GridWrite;
