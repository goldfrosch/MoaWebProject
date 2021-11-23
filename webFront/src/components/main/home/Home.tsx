import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

import Slick from "components/common/items/Slick";

import BoardItem from "components/common/items/BoardItem";
import { IBanners } from "modules/banner/type";

import Thumbnail from "assets/image/thumbnail.jpg";

import AddIcon from "@mui/icons-material/Add";
import { IHomeBoardData } from "containers/home/HomeContainer";
import DateUtils from "utils/DateUtils";

interface HomeProps {
  data: IBanners[];
  list: IHomeBoardData;
}

const Home: React.FC<HomeProps> = ({ data, list }) => {
  return (
    <HomeBlock>
      <Slick>
        {data.map((item, key) => (
          <SliderItem key={key}>
            <Link to={item.link}>
              <img src={`http://moasv.co.kr/images/${item.banner}`} alt="" />
            </Link>
          </SliderItem>
        ))}
      </Slick>
      <div className="items">
        <BoardItem>
          <div className="borderHead">
            <span>공지사항</span>
            <Link to="/board?category=notice">
              <AddIcon />
            </Link>
          </div>
          {list.noticeList.map((data, key) => (
            <Link to={`/board/${data.id}`} key={key}>
              <div className="borderBody" style={{ cursor: "pointer" }}>
                <span>{data.title}</span>
                <span className="date">
                  {DateUtils.getDay(data.createdDate)}
                </span>
              </div>
            </Link>
          ))}
          {list.noticeList.length < 4 &&
            [...Array(4 - list.noticeList.length)].map((_, key) => (
              <div className="borderBody" key={key}>
                빈 게시글
              </div>
            ))}
        </BoardItem>
        <BoardItem>
          <div className="borderHead">
            <span>업데이트</span>
            <Link to="/board?category=update">
              <AddIcon />
            </Link>
          </div>
          {list.updateList.map((data, key) => (
            <Link to={`/board/${data.id}`} key={key}>
              <div className="borderBody">
                <span>{data.title}</span>
                <span className="date">
                  {DateUtils.getDay(data.createdDate)}
                </span>
              </div>
            </Link>
          ))}
          {list.updateList.length < 4 &&
            [...Array(4 - list.updateList.length)].map((_, key) => (
              <div className="borderBody" key={key}>
                빈 게시글
              </div>
            ))}
        </BoardItem>
      </div>
      <BoardItem>
        <div className="borderHead">
          <span>사진게시판</span>
          <Link to="/grid?category=photo">
            <AddIcon />
          </Link>
        </div>
        <div className="gridBody">
          {list.photoList.map((data, key) => (
            <Link to={`/board/${data.id}`} key={key}>
              <div className="gridItem">
                <img
                  src={
                    data.thumbnail
                      ? `http://moasv.co.kr/images/${data.thumbnail}`
                      : Thumbnail
                  }
                  alt=""
                />
                <span>{data.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </BoardItem>
    </HomeBlock>
  );
};

const HomeBlock = styled.div`
  width: 100%;
  padding-bottom: 16px;
  @media (max-width: 768px) {
    padding: 0 8px;
  }
  & > .items {
    width: 100%;

    padding: 16px 0;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(40%, auto));

    grid-gap: 16px;
    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(100%, auto));
    }
  }
`;

const SliderItem = styled.div`
  width: 100%;
  img {
    width: 100%;
    height: auto;
  }
`;
export default Home;
