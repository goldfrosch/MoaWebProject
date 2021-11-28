import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { AxiosResponse } from "axios";
import * as BoardAPI from "api/board";

import { Palette, ThemeColor, ThemeSize } from "styles/Pallete";

import Button from "components/common/items/Button";
import Card from "components/common/items/grid/Card";
import CardSkeleton from "components/common/items/skeleton/CardSkeleton";
import Search from "components/common/items/Search";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { IGridData } from "containers/content/grid/GridListContainer";
import { IBoardDesc, IBoardListData } from "modules/board/type";

import history from "utils/HistoryUtils";

interface GridListProps {
  data: IGridData;
  desc: IBoardDesc;
  location: any;
  checkLogin: (link: string) => void;
}

const fakeFetch = () => new Promise(res => setTimeout(res, 1000));

const GridList: React.FC<GridListProps> = ({
  data,
  desc,
  location,
  checkLogin
}) => {
  /* 타겟 엘리먼트 */
  let page = 1;
  const target = useRef<any>(null);
  //검색 데이터
  const [searchData, setSearchData] = useState<IGridData>({
    ...data,
    type: "NICKNAME"
  });
  const [list, setList] = useState<IBoardListData[]>([]);
  const [listOption, setListOption] = useState<boolean>(false);

  const [isStop, setIsStop] = useState<boolean>(false);

  //검색 카테고리 변경 함수
  const handleSearchChange = (e: any) => {
    setSearchData({ ...searchData, query: e.target.value });
  };
  //검색 후 API 로딩
  const handleSubmit = (e: any) => {
    e.preventDefault();
    history.push(
      `/grid?category=${data.category}&type=${searchData.type}&query=${searchData.query}`
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

  //List 추가함수
  const fetchItems = async (): Promise<boolean> => {
    setListOption(true);
    await fakeFetch();

    //axios 실행
    try {
      const res: AxiosResponse = await BoardAPI.getBoards({
        category: data.category.toUpperCase(),
        page: page,
        type: data.type,
        query: data.query
      });
      //기존 데이터
      if (page === 1) {
        setList(res.data.list.results);
      } else {
        setList(prev => [...prev, ...res.data.list.results]);
      }
      page += 1;

      setListOption(false);

      if (res.data.list.empty || res.data.list.results.length < 10) {
        return true;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
    return false;
  };

  //리스트 초기화 함수
  const clearList = async () => {
    page = 1;
    setList([]);
    setIsStop(await fetchItems());
  };

  /* 인터섹션 callback */
  const onIntersect = async ([entry]: any, observer: any) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      setIsStop(await fetchItems());
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, options);
    observer.observe(target.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    clearList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

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
            <Card data={data} key={key} />
          ))}
          {listOption &&
            [...Array(10)].map((_, key) => <CardSkeleton key={key} />)}
        </div>
        {!isStop && (
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
    }
  }
`;
export default GridList;
