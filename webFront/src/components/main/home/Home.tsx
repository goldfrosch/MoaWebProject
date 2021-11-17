import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

import Slick from "components/common/items/Slick";

import BoardItem from "components/common/items/BoardItem";
import Button from "components/common/items/Button";

import { ThemeColor, ThemeSize } from "styles/Pallete";

import HistoryUtils from "utils/HistoryUtils";
import { IBanners } from "modules/banner/type";

interface HomeProps {
  data: IBanners[];
}

const Home: React.FC<HomeProps> = ({ data }) => {
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

const SliderItem = styled.div`
  width: 100%;
  img {
    width: 100%;
    height: auto;
  }
`;
export default Home;
