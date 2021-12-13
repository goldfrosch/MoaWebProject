import React from "react";
import styled from "styled-components";

interface IBirdItemProps {}
const BirdItem: React.FC<IBirdItemProps> = () => {
  return (
    <BirdItemBlock>
      <div className="bird" />
    </BirdItemBlock>
  );
};

const BirdItemBlock = styled.div`
  z-index: 42;
  .bird {
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

    //애니메이션 진행 시간
    animation-duration: 1s;
    //애니메이션 딜레이 시간
    animation-delay: -0.5s;

    @keyframes fly-cycle {
      //background 위치를 옮겨 이미지가 기존의 여러마리의 새를
      //나열한 것을 옮겨 날라다니는 것처럼 착시효과를
      //일으키는 행위
      100% {
        background-position: -900px 0;
      }
    }
  }
`;

export default BirdItem;
