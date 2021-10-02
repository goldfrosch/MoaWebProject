import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import test1 from "assets/test/test1.jpg";
import test2 from "assets/test/test2.png";
import test3 from "assets/test/test3.jpg";

interface HomeProps {}
const Home: React.FC<HomeProps> = () => {
  const [carouselNum, setCarouselNum] = useState<number>(0);
  const CarouselRef = useRef<any>(null);

  const PrevSlide = () => {
    if (carouselNum === 0) {
      setCarouselNum(2);
    } else {
      setCarouselNum(carouselNum - 1);
    }
  };
  const NextSlide = () => {
    if (carouselNum === 2) {
      setCarouselNum(0);
    } else {
      setCarouselNum(carouselNum + 1);
    }
  };
  // const SetSlide = (id: number) => {
  //   setCarouselNum(id);
  // };

  useEffect(() => {
    CarouselRef.current.style.transition = "all 0.5s ease-in-out";
    CarouselRef.current.style.transform = `translateX(-${carouselNum}00%)`;
  }, [carouselNum]);

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
      <div className="option">
        <div className="slideControl">
          <div className="item" onClick={PrevSlide} />
        </div>
        <div className="slideList">
          <div className="list"></div>
        </div>
        <div className="slideControl">
          <div className="item" onClick={NextSlide} />
        </div>
      </div>
    </HomeBlock>
  );
};

const HomeBlock = styled.div`
  .carousel {
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
  .option {
    width: 100%;
    height: 40vh;

    position: absolute;
    top: 10vh;

    display: flex;
    align-items: center;
    justify-content: space-between;

    & > .slideControl {
      height: inherit;

      display: flex;
      align-items: center;
      & > .item {
        width: 40px;
        height: 30%;
        background-color: rgba(0, 0, 0, 0.2);

        cursor: pointer;
      }
    }
    & > .slideList {
      height: inherit;

      display: flex;
      flex-direction: column;
      align-items: flex-end;
      & > .list {
        height: 300px;
        background-color: blueviolet;

        display: flex;
        align-items: center;
        justify-content: space-between;
        & > .item {
          width: 10px;
          height: 10px;
          background-color: blanchedalmond;
        }
      }
    }
  }
`;

export default Home;
