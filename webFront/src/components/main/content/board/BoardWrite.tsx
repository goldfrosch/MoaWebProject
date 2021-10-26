import React, { useRef, useState, useMemo } from "react";
import styled from "styled-components";

import { AxiosResponse } from "axios";
import * as BoardAPI from "api/board";

import { Palette, ThemeColor, ThemeSize } from "styles/Pallete";

import Button from "components/common/items/Button";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IProfile } from "modules/auth/type";
import { IBoardData } from "modules/board/type";
import { useDispatch } from "react-redux";
import {
  setMessageClearAction,
  setMessageErrorAction,
  setMessageSuccessAction
} from "modules/snackbar/snackbar";
import history from "utils/HistoryUtils";

interface BoardWriteProps {
  data: string;
  userData: IProfile;
}
const BoardWrite: React.FC<BoardWriteProps> = ({ data }) => {
  const dispatch = useDispatch();

  const QuillRef = useRef<ReactQuill>();
  const [datas, setDatas] = useState<IBoardData>({
    category: data,
    content: "",
    isComment: true,
    prefix: "",
    title: ""
  });
  const [contents, setContents] = useState("");

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [
            { font: ["Noto Sans KR", "Gothic"] },
            { header: "1" },
            { header: "2" },
            { size: ["small", false, "large", "huge"] }
          ],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ color: [] }, { background: [] }, { align: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" }
          ],
          ["link", "image", "video"],
          ["clean"]
        ]
      }
    }),
    []
  );
  const handleSave = () => {
    dispatch(setMessageClearAction());
    BoardAPI.postBoard({
      ...datas,
      content: contents
    })
      .then((res: AxiosResponse) => {
        if (res.data) {
          dispatch(setMessageSuccessAction("성공적으로 작성했습니다"));
          history.goBack();
        }
      })
      .catch(error => {
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
              <option>{data}</option>
            </select>
            <select className="tag">
              <option value="">말머리 없음</option>
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
        <ReactQuill
          ref={element => {
            if (element !== null) {
              QuillRef.current = element;
            }
          }}
          value={contents}
          onChange={setContents}
          modules={modules}
          theme="snow"
          placeholder="내용을 입력해주세요."
        />
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
          margin-bottom: 16px;
        }
      }
      @media (max-width: 560px) {
        margin-bottom: 12%;
      }
    }
    & > .content {
      height: 450px;
    }
    & > .footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
`;

export default BoardWrite;
