import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Palette, ThemeColor, ThemeSize } from "styles/Pallete";

import Button from "components/common/items/Button";
import Search from "components/common/items/Search";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Skeleton from "@mui/material/Skeleton";

import { IGridData } from "containers/content/grid/GridListContainer";
import { IBoardDesc, IBoardListData } from "modules/board/type";

import Thumbnail from "assets/image/thumbnail.jpg";
import history from "utils/HistoryUtils";
import BoardProfile from "components/common/items/BoardProfile";

interface GridListProps {
  data: IGridData;
  desc: IBoardDesc;
  list: IBoardListData[];
  listOption: IScrollOption;
  checkLogin: (link: string) => void;
  fetchItems: () => void;
}

export interface IScrollOption {
  page: number;
  isLoading: boolean;
  isStop: boolean;
}

const GridList: React.FC<GridListProps> = ({
  data,
  desc,
  list,
  listOption,
  checkLogin,
  fetchItems
}) => {
  /* 타겟 엘리먼트 */
  const target = useRef<any>(null);
  //검색 데이터
  const [searchData, setSearchData] = useState<IGridData>({
    ...data,
    type: "NICKNAME"
  });

  //검색 카테고리 변경 함수
  const handleSearchChange = (e: any) => {
    setSearchData({ ...searchData, query: e.target.value });
  };
  //검색 후 API 로딩
  const handleSubmit = (e: React.ChangeEvent<unknown>) => {
    e.preventDefault();
    history.push(
      `/grid?category=${data.category}&type=${data.type}&query=${data.query}`
    );
  };
  const handleWriteGrid = () => {
    checkLogin("/grid/write?category=" + data.category.toLocaleLowerCase());
  };

  //무한 스크롤 함수
  /* 옵저버 등록 */
  let options = {
    root: null,
    rootMargins: 0,
    threshold: 0.5
  };

  /* 인터섹션 callback */
  const onIntersect = ([entry]: any, observer: any) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      fetchItems();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, options);
    observer.observe(target.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GridListBlock>
      <div className="main">
        <div className="header">
          <h2 className="title">{desc.title}</h2>
          <span>{desc.context}</span>
        </div>
        <div className="option">
          <div className="search">
            {/* 검색 타입 */}
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 60, height: 60, color: "#e9e9e9" }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                검색 타입
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="type"
                value={searchData.type}
                onChange={(e: any) =>
                  setSearchData({
                    ...searchData,
                    type: e.target.value
                  })
                }
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
          <div className="write">
            <Button
              theme={ThemeColor.first}
              size={ThemeSize.large}
              onClick={handleWriteGrid}
            >
              글쓰기
            </Button>
          </div>
        </div>
        <div className="content">
          {list.map((data, key) => (
            <div
              className="item"
              key={key}
              onClick={() => history.push(`/board/${data.id}`)}
            >
              <img
                src={
                  data.thumbnail !== ""
                    ? `http://15.164.18.220/images/${data.thumbnail}`
                    : Thumbnail
                }
                style={{ width: "100%" }}
                alt=""
              />
              <span
                style={{
                  padding: "6px",
                  color: "#424242",
                  fontSize: "16px",
                  fontWeight: 500,
                  fontFamily: "A17",
                  textOverflow: "ellipsis"
                }}
              >
                {data.prefix !== "" && [data.prefix]}
                {data.title}
              </span>
              <BoardProfile
                nickName={data.nickName}
                uuid={data.uuid}
                createdDate={data.createdDate}
              />
            </div>
          ))}
          {listOption.isLoading &&
            [...Array(10)].map((_, key) => (
              <div className="item" key={key}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={190}
                  animation="wave"
                />
                <Skeleton width="100%" />
                <Skeleton width="60%" />
              </div>
            ))}
        </div>
        {!listOption.isStop && (
          <div className="loading" style={{ height: "16px" }} ref={target} />
        )}
      </div>
    </GridListBlock>
  );
};

const GridListBlock = styled.div`
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
      color: #797979;
      border-bottom: 1px solid #e9e9e9;

      padding: 24px 0;

      @media (max-width: 800px) {
        padding: 16px;
      }

      & > .title {
        color: ${Palette.header};

        font-size: 24px;
        font-weight: 700;

        padding-bottom: 8px;
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
      @media (max-width: 800px) {
        display: block;
      }
      & > .write {
        @media (max-width: 800px) {
          display: flex;
          align-items: center;
          justify-content: flex-end;

          padding: 0 16px;
        }
      }
    }
    & > .content {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      grid-gap: 16px;

      @media (max-width: 800px) {
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      }
      & > .item {
        width: 100%;
        height: auto;
        background-color: white;

        border: 1px solid #d7d7d7;
        border-radius: 8px;

        padding: 2.5% 5%;

        display: flex;
        flex-direction: column;
        justify-content: center;

        cursor: pointer;

        & > img {
          width: 90%;
          height: auto;
          object-fit: cover;
        }
      }
      & > .item:hover {
        transform: scale(1.025);
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      }
    }
  }
`;
export default GridList;
