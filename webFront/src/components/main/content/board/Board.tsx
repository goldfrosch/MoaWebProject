import React, { useState } from "react";
import styled from "styled-components";

import { Palette, ThemeColor, ThemeSize } from "styles/Pallete";

import noticePhone from "assets/icon/megaphone.png";
import Button from "components/common/items/Button";
import Search from "components/common/items/Search";

import { Pagination } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { BoardPageParams } from "containers/content/board/BoardContainer";
import history from "utils/HistoryUtils";

export interface BoardListProps {
  data: BoardPageParams;
}

const BoardList: React.FC<BoardListProps> = ({ children, data }) => {
  const [searchData, setSearchData] = useState<BoardPageParams>({ ...data });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(searchData);
  };

  const handleHistory = () => {
    history.push("/board/write?type=" + searchData.type);
  };

  return (
    <BoardListBlock>
      <div className="main">
        <div className="header">
          <h2 className="title">공지사항</h2>
          <span>서버 내부, 외부에 관련된 공지를 확인 가능합니다</span>
        </div>
        <div className="option">
          <div className="search">
            {/* 검색 타입 */}
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120, height: 60, color: "#e9e9e9" }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                검색 타입
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={searchData.search}
                onChange={(e: any) =>
                  setSearchData({
                    ...searchData,
                    search: e.target.value
                  })
                }
                label="type"
              >
                <MenuItem value="NICKNAME">닉네임</MenuItem>
                <MenuItem value="TITLE">제목</MenuItem>
              </Select>
            </FormControl>
            <Search
              value=""
              onChange={(e: any) =>
                setSearchData({
                  ...searchData,
                  query: e.target.value
                })
              }
              onSubmit={(e: any) => handleSubmit(e)}
            />
          </div>
          <Button
            theme={ThemeColor.first}
            size={ThemeSize.large}
            onClick={handleHistory}
          >
            글쓰기
          </Button>
        </div>
        <div className="content">
          <div className="importantItem">
            <img src={noticePhone} alt="" />
            <span>123</span>
          </div>
          <div className="importantItem">
            <img src={noticePhone} alt="" />
            <span>123</span>
          </div>
          <div className="item">123</div>
          <div className="item">123</div>
          <div className="item">123</div>
          <div className="item">123</div>
        </div>
        <div className="footer">
          <Pagination count={10} showFirstButton showLastButton />
        </div>
      </div>
    </BoardListBlock>
  );
};

const BoardListBlock = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  & > .main {
    width: 100%;

    padding: 16px 0;

    display: flex;
    flex-direction: column;
    & > .header {
      height: 18vh;
      color: #797979;

      padding: 16px 0;

      & > .title {
        color: ${Palette.primary};

        font-size: 24px;
        font-weight: 700;
      }
    }
    & > .option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .search {
        padding: 0 16px;

        display: flex;
        align-items: center;

        gap: 8px;
      }
    }
    & > .content {
      flex: 1;

      display: flex;
      flex-direction: column;
      align-items: center;
      & > .importantItem {
        width: 100%;
        height: 48px;
        background-color: #f6f6f6;
        border-bottom: 1px solid #e7e7e7;

        padding: 0 16px;

        display: flex;
        align-items: center;

        gap: 8px;

        & > img {
          width: 24px;
          height: 24px;
        }
      }
      & > .item {
        width: 100%;
        height: 56px;
        border-bottom: 1px solid #e7e7e7;

        padding: 0 16px;

        display: flex;
        align-items: center;
      }
    }

    & > .footer {
      height: 12vh;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  @media (max-width: 800px) {
    padding: 0;
  }
`;

export default BoardList;
