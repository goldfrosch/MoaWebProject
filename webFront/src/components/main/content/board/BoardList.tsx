import React, { useEffect, useState } from "react";
import styled from "styled-components";

import * as BoardAPI from "api/board";

import { Palette, ThemeColor, ThemeSize } from "styles/Pallete";

import noticePhone from "assets/icon/megaphone.png";
import Button from "components/common/items/Button";
import Search from "components/common/items/Search";
import { IBoardData } from "containers/content/board/BoardListContainer";

import { Pagination } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { IBoardListData } from "modules/board/type";
import { AxiosResponse } from "axios";

export interface BoardListProps {
  data: IBoardData;
  checkLogin: (link: string) => void;
}

const BoardList: React.FC<BoardListProps> = ({ data, checkLogin }) => {
  const [searchData, setSearchData] = useState<IBoardData>({
    ...data
  });
  const [board, setBoard] = useState<IBoardListData[]>([]);

  const getBoardsData = () => {
    BoardAPI.getBoards(searchData)
      .then((res: AxiosResponse) => {
        setBoard([...res.data]);
      })
      .catch(error => {
        console.log(error);
      });
  };

  //검색할 쿼리 내용 onChangeEvent
  const handleSearchChange = (e: any) => {
    setSearchData({ ...searchData, query: e.target.value });
  };

  //검색 후 API 로딩
  const handleSubmit = (e: React.ChangeEvent<unknown>) => {
    e.preventDefault();
    getBoardsData();
  };

  //글 작성 페이지로 이동
  const handleWriteBoard = () => {
    checkLogin("/board/write?category=" + searchData.category);
  };

  //페이지네이션 관련
  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    e.preventDefault();
    setSearchData({ ...searchData, page: value });
    getBoardsData();
  };

  useEffect(() => {
    getBoardsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BoardListBlock>
      <div className="main">
        <div className="header">
          <h2 className="title">테스트 제목</h2>
          <span>테스트 설명</span>
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
                value={searchData.type}
                onChange={(e: any) =>
                  setSearchData({
                    ...searchData,
                    type: e.target.value
                  })
                }
                label="type"
              >
                <MenuItem value="NICKNAME">닉네임</MenuItem>
                <MenuItem value="TITLE">제목</MenuItem>
              </Select>
            </FormControl>
            <Search
              value={searchData.query}
              onSubmit={handleSubmit}
              onChange={handleSearchChange}
            />
          </div>
          <Button
            theme={ThemeColor.first}
            size={ThemeSize.large}
            onClick={handleWriteBoard}
          >
            글쓰기
          </Button>
        </div>
        <div className="content">
          <div className="importantItem">
            <img src={noticePhone} alt="" />
            <span>asdfasfds</span>
          </div>
          {board.map((data, key) => (
            <div className="item" key={key}>
              {data.title}
            </div>
          ))}
        </div>
        <div className="footer">
          <Pagination
            count={10}
            showFirstButton
            showLastButton
            page={searchData.page}
            onChange={handlePageChange}
          />
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

        display: flex;
        align-items: center;

        padding: 0 16px;
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
