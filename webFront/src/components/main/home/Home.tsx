import React, { useRef } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

import test2 from "assets/test/test2.png";

import BoardItem from "components/common/items/BoardItem";
import Button from "components/common/items/Button";

import { ThemeColor, ThemeSize } from "styles/Pallete";

import HistoryUtils from "utils/HistoryUtils";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const CarouselRef = useRef<any>(null);

  return (
    <HomeBlock>
      <div className="carousel">
        <div className="slider" ref={CarouselRef}>
          <div className="slide">
            <img src={test2} alt="" />
          </div>
        </div>
      </div>
      <div className="items">
        <BoardItem>
          <div className="borderHead">
            <span>공지사항</span>
            <Button
              theme={ThemeColor.second}
              size={ThemeSize.middle}
              onClick={() => {
                HistoryUtils.push("/board?category=notice");
              }}
            >
              더보기
            </Button>
          </div>
          <div className="borderBody">sadf</div>
          <div className="borderBody">sadf</div>
          <div className="borderBody">sadf</div>
          <div className="borderBody">sadf</div>
        </BoardItem>
        <BoardItem>
          <div className="borderHead">
            <span>업데이트</span>
            <Button theme={ThemeColor.second} size={ThemeSize.middle}>
              더보기
            </Button>
          </div>
          <div className="borderBody">sadf</div>
          <div className="borderBody">sadf</div>
          <div className="borderBody">sadf</div>
          <div className="borderBody">sadf</div>
        </BoardItem>
      </div>
      <BoardItem>
        <div className="borderHead">
          <span>자유게시판</span>
          <Button theme={ThemeColor.second} size={ThemeSize.middle}>
            더보기
          </Button>
        </div>
        <div className="borderBody">sadf</div>
        <div className="borderBody">sadf</div>
        <div className="borderBody">sadf</div>
        <div className="borderBody">sadf</div>
      </BoardItem>
      <div className="items">
        <BoardItem>
          <div className="borderHead">
            <span>sadf</span>
            <Button theme={ThemeColor.second} size={ThemeSize.middle}>
              더보기
            </Button>
          </div>
          <div className="borderBody">sadf</div>
          <div className="borderBody">sadf</div>
          <div className="borderBody">sadf</div>
          <div className="borderBody">sadf</div>
        </BoardItem>
        <BoardItem>
          <div className="borderHead">
            <span>sadf</span>
            <Button theme={ThemeColor.second} size={ThemeSize.middle}>
              더보기
            </Button>
          </div>
          <div className="borderBody">sadf</div>
          <div className="borderBody">sadf</div>
          <div className="borderBody">sadf</div>
          <div className="borderBody">sadf</div>
        </BoardItem>
        <BoardItem>
          <div className="borderHead">
            <span>sadf</span>
            <Button theme={ThemeColor.second} size={ThemeSize.middle}>
              더보기
            </Button>
          </div>
          <div className="borderBody">sadf</div>
          <div className="borderBody">sadf</div>
          <div className="borderBody">sadf</div>
          <div className="borderBody">sadf</div>
        </BoardItem>
        <BoardItem>
          <div className="borderHead">
            <span>sadf</span>
            <Link to="/notice/notice">
              <Button theme={ThemeColor.second} size={ThemeSize.middle}>
                더보기
              </Button>
            </Link>
          </div>
          <div className="borderBody">sadf</div>
          <div className="borderBody">sadf</div>
          <div className="borderBody">sadf</div>
          <div className="borderBody">sadf</div>
        </BoardItem>
      </div>
    </HomeBlock>
  );
};

const HomeBlock = styled.div`
  & > .carousel {
    width: 100%;
    height: 40%;

    overflow: hidden;
    & > .slider {
      margin: 0;

      display: flex;
      align-items: center;
      & > .slide {
        min-width: 100%;
        height: 100%;
        & > img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  & > .items {
    width: 100%;

    padding: 16px 0;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(40%, auto));

    grid-gap: 16px;
    @media (max-width: 800px) {
      grid-template-columns: repeat(auto-fill, minmax(100%, auto));
    }
  }
`;

export default Home;
