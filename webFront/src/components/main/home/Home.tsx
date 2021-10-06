import React, { useRef } from "react";
import styled from "styled-components";

import test1 from "assets/test/test1.jpg";
import test2 from "assets/test/test2.png";
import test3 from "assets/test/test3.jpg";
import BoardItem from "components/common/items/BoardItem";
import Button from "components/common/items/Button";
import { ThemeColor, ThemeSize } from "styles/Pallete";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const CarouselRef = useRef<any>(null);

  return (
    <HomeBlock>
      <div className="carousel">
        <div className="slider" ref={CarouselRef}>
          <div className="slide">
            <img src={test1} alt="" />
          </div>
          <div className="slide">
            <img src={test2} alt="" />
          </div>
          <div className="slide">
            <img src={test3} alt="" />
          </div>
        </div>
      </div>
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
      </div>
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
    </HomeBlock>
  );
};

const HomeBlock = styled.div`
  & > .carousel {
    width: 100%;
    height: 40vh;

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
          height: 40vh;
        }
      }
    }
  }
  & > .items {
    width: 100%;

    padding: 16px 0;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(450px, auto));

    grid-gap: 16px;
  }
`;

export default Home;
