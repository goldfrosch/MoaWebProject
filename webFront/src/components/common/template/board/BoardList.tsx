import Pagination from "components/common/items/Pagination";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Palette, ThemeColor, ThemeSize } from "styles/Pallete";

import noticePhone from "assets/icon/megaphone.png";
import Button from "components/common/items/Button";
import Search from "components/common/items/Search";
import SelectBlock from "components/common/items/Select";

export interface ISearch {
  type?: string;
  query?: string;
  data: string;
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
    data: "",
  });
  const testClick = (id: number) => {
    console.log(id);
  };
  const SearchBar = useRef<any>(null);
  const setActive = (value: boolean) => {
    if (value) {
      SearchBar.current.style.boxShadow =
        "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px";
    } else {
      SearchBar.current.style.boxShadow = "none";
    }
  };
  return (
    <BoardListBlock>
      <div className="main">
        <div className="header">
          <h2 className="title">{title}</h2>
          <span>{context}</span>
        </div>
        <div className="option">
          <div
            className="search"
            onBlur={() => setActive(false)}
            onFocus={() => setActive(true)}
            ref={SearchBar}
          >
            <SelectBlock>
              <option>asdf</option>
            </SelectBlock>
            <SelectBlock></SelectBlock>
            <Search
              value={search.data}
              onChange={e =>
                setSearch({
                  ...search,
                  data: e.target.value,
                })
              }
            />
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
          <Pagination
            nowPage={1}
            movePage={() => testClick(1)}
            totalCounts={500}
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
