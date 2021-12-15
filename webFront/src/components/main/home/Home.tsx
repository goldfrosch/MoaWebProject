import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

import Slick from "components/common/items/Slick";

import HomeItem from "components/common/items/home/HomeItem";
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
      <div className="main">
        <section>
          <div className="items">
            <HomeItem>
              <div className="borderHead">
                <span>공지사항</span>
                <Link to="/user/board?category=notice">
                  <AddIcon />
                </Link>
              </div>
              {list.noticeList.map((data, key) => (
                <Link to={`/user/board/${data.id}`} key={key}>
                  <div className="borderBody" style={{ cursor: "pointer" }}>
                    <span className="title">{data.title}</span>
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
            </HomeItem>
            <HomeItem>
              <div className="borderHead">
                <span>업데이트</span>
                <Link to="/user/board?category=update">
                  <AddIcon />
                </Link>
              </div>
              {list.updateList.map((data, key) => (
                <Link to={`/user/board/${data.id}`} key={key}>
                  <div className="borderBody">
                    <span className="title">{data.title}</span>
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
            </HomeItem>
          </div>
          <div className="list">
            <HomeItem>
              <div className="borderHead">
                <span>사진게시판</span>
                <Link to="/user/grid?category=photo">
                  <AddIcon />
                </Link>
              </div>
              <div className="gridBody">
                {list.photoList.map((data, key) => (
                  <Link to={`/user/board/${data.id}`} key={key}>
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
            </HomeItem>
          </div>
        </section>
      </div>
    </HomeBlock>
  );
};

const HomeBlock = styled.div`
  width: 100%;
  padding-bottom: 16px;
  @media (max-width: 768px) {
    padding: 0 8px;
  }
  & > .main {
    width: 100%;
    display: flex;
    justify-content: center;
    & > section {
      width: 100%;
      max-width: 1280px;

      @media (max-width: 1280px) {
        max-width: 90%;
        min-width: 768px;
      }
      @media (max-width: 768px) {
        max-width: 100%;
        min-width: 100%;
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
      & > .list {
        width: 100%;
      }
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
