import React from "react";
import styled from "styled-components";

interface IBirdItemProps {
  speed: number;
  startHeight: number;
}
const BirdItem: React.FC<IBirdItemProps> = ({ speed, startHeight }) => {
  return (
    <BirdItemBlock speed={speed} startHeight={startHeight}>
      <div className="birdContainer">
        <div className="bird" />
      </div>
    </BirdItemBlock>
  );
};

type BirdItemBlockType = {
  speed: number;
  startHeight: number;
};

const BirdItemBlock = styled.div<BirdItemBlockType>`
  z-index: 42;
  & > .birdContainer {
    position: absolute;

    top: ${props => props.startHeight}%;
    left: -10%;
    transform: scale(0) translateX(-10vw);
    will-change: transform;

    animation-name: fly-right-one;
    animation-timing-function: linear;
    animation-iteration-count: infinite;

    animation-duration: ${props => props.speed + 8}s;
    animation-delay: ${props => props.speed + 10}s;

    & > .bird {
      background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/174479/bird-cells-new.svg);
      background-size: auto 100%;
      //background이기 때문에 width를 짧게 줘 새 한마리만 날려줌
      width: 88px;
      //height는 날개가 위아래라서 ㅎㅎ...
      height: 125px;
      will-change: background-position;

      //animation관리는 Keyframs로 애니메이션을 선언하고
      //해당 이름으로 실행시킴
      animation-name: fly-cycle;
      //조사중...
      animation-timing-function: steps(10);
      //무한 애니메이션
      animation-iteration-count: infinite;

      //기존 이름을 가져오는 방법으로 추정 됨
      animation-duration: ${props => props.speed / 2}s;
      animation-delay: ${props => -props.speed * 0.5}s;

      @keyframes fly-cycle {
        //background 위치를 옮겨 이미지가 기존의 여러마리의 새를
        //나열한 것을 옮겨 날라다니는 것처럼 착시효과를
        //일으키는 행위
        100% {
          background-position: -900px 0;
        }
      }

      @media (max-width: 368px) {
        display: none;
      }
    }

    @keyframes fly-right-one {
      0% {
        transform: scale(0.3) translateX(-10vw);
      }

      10% {
        transform: translateY(2vh) translateX(10vw) scale(0.4);
      }

      20% {
        transform: translateY(0vh) translateX(30vw) scale(0.5);
      }

      30% {
        transform: translateY(4vh) translateX(50vw) scale(0.6);
      }

      40% {
        transform: translateY(2vh) translateX(70vw) scale(0.6);
      }

      50% {
        transform: translateY(0vh) translateX(90vw) scale(0.6);
      }

      60% {
        transform: translateY(0vh) translateX(110vw) scale(0.6);
      }

      100% {
        transform: translateY(0vh) translateX(110vw) scale(0.6);
      }
    }
  }
`;

export default BirdItem;
