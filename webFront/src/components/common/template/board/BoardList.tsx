// import Pagination from "components/common/items/Pagination";
import React, { useState } from "react";
import styled from "styled-components";
import { Palette, ThemeColor, ThemeSize } from "styles/Pallete";

import { Pagination } from "@mui/material";
import noticePhone from "assets/icon/megaphone.png";
import Button from "components/common/items/Button";
import Search from "components/common/items/Search";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export interface ISearch {
  type?: string;
  query: string;
}

export interface BoardListProps {
  title: string;
  context: string;
  notice: any[];
}

const BoardList: React.FC<BoardListProps> = ({
  title,
  context,
  notice,
  children,
}) => {
  const [search, setSearch] = useState<ISearch>({
    type: "",
    query: "",
  });
  return (
    <BoardListBlock>
      <div className="main">
        <div className="header">
          <h2 className="title">{title}</h2>
          <span>{context}</span>
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
                defaultValue={search.type}
                onChange={(e: any) =>
                  setSearch({
                    ...search,
                    type: e.target.value,
                  })
                }
                label="type"
              >
                <MenuItem value="">
                  <em>없음</em>
                </MenuItem>
                <MenuItem value="NICKNAME">닉네임</MenuItem>
                <MenuItem value="TITLE">제목</MenuItem>
              </Select>
            </FormControl>
            <form>
              <Search value="" />
            </form>
          </div>
          <Button theme={ThemeColor.first} size={ThemeSize.large}>
            글쓰기
          </Button>
        </div>
        <div className="content">
          {notice.map((data, key) => (
            <div className="importantItem" key={key}>
              <img src={noticePhone} alt="" />
              <span>{data}</span>
            </div>
          ))}
          {children}
        </div>
        <div className="footer">
          <Pagination count={10} showFirstButton showLastButton />
          {/* const [page, setPage] = React.useState(1);
          const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
            setPage(value);
          };

          return (
            <Stack spacing={2}>
              <Typography>Page: {page}</Typography>
              <Pagination count={10} page={page} onChange={handleChange} />
            </Stack>
          ); */}
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
      }
      & > .item {
        width: 100%;
        height: 56px;
        border-bottom: 1px solid #e7e7e7;

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
