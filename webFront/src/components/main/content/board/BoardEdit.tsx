import React, { useEffect, useState } from "react";
import styled from "styled-components";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

import { AxiosResponse } from "axios";
import * as BoardAPI from "api/board";

import { Palette, ThemeColor, ThemeSize } from "styles/Pallete";

import Button from "components/common/items/Button";

import { IBoardData, IBoardDetail } from "modules/board/type";
import { useDispatch } from "react-redux";
import {
  setMessageClearAction,
  setMessageErrorAction,
  setMessageSuccessAction
} from "modules/snackbar/snackbar";
import history from "utils/HistoryUtils";
import DescUtils from "utils/DescUtils";
import SwitchItem from "components/common/items/SwitchItem";
import { IProfile } from "modules/auth/type";

interface BoardEditProps {
  data: IBoardDetail;
  profile: IProfile;
  boardTag: string[];
}
const BoardEdit: React.FC<BoardEditProps> = ({ data, profile, boardTag }) => {
  const dispatch = useDispatch();

  const [datas, setDatas] = useState<IBoardData>({
    category: "",
    content: "",
    isComment: false,
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
    if (datas.title === "") {
      return dispatch(setMessageErrorAction("제목이 비어있습니다"));
    } else if (contents === "") {
      return dispatch(setMessageErrorAction("내용이 비어있습니다"));
    }

    let formData = new FormData();

    formData.append(
      "data",
      new Blob(
        [
          JSON.stringify({
            ...datas,
            category: datas.category.toUpperCase(),
            content: contents
          })
        ],
        { type: "application/json" }
      )
    );
    BoardAPI.editBoard(data.detail.id, formData)
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          dispatch(setMessageSuccessAction("성공적으로 수정했습니다"));
          history.goBack();
        }
      })
      .catch(error => {
        console.log(error);
        dispatch(setMessageErrorAction("글 수정 중 문제가 발생했습니다"));
      });
  };

  const handleChangeComment = () => {
    setDatas({
      ...datas,
      isComment: !datas.isComment
    });
  };

  useEffect(() => {
    setDatas({
      category: data.detail.category,
      content: data.detail.content,
      isComment: data.detail.isComment,
      prefix: data.detail.prefix,
      title: data.detail.title
    });
    setContents(data.detail.content);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <BoardEditBlock>
      <div className="main">
        {profile.uuid !== data.detail.uuid ? (
          <div className="header">
            <h2 className="title">권한이 없는 게시물입니다</h2>
          </div>
        ) : (
          <>
            <div className="header">
              <h2 className="title">글 작성하기</h2>
              <div className="option">
                <select className="category" disabled>
                  <option>
                    {DescUtils.SetBoardTitle(
                      data.detail.category.toLocaleLowerCase()
                    )}
                  </option>
                </select>
                <select
                  className="tag"
                  value={datas.prefix}
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
                  defaultValue={datas.title}
                  onChange={(e: any) => {
                    setDatas(prev => ({ ...prev, title: e.target.value }));
                  }}
                />
              </div>
            </div>
            {datas.content !== "" && (
              <div>
                <SunEditor
                  autoFocus={true}
                  lang="ko"
                  setDefaultStyle="z-index: 0"
                  width="100%"
                  height="600px"
                  defaultValue={datas.content}
                  onChange={setContents}
                  setOptions={Option}
                />
              </div>
            )}
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
          </>
        )}
      </div>
    </BoardEditBlock>
  );
};

const BoardEditBlock = styled.div`
  width: 100%;
  height: 110vh;
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

export default BoardEdit;
