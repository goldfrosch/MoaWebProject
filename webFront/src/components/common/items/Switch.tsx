import React from "react";
import styled from "styled-components";
import { Palette } from "styles/Pallete";

interface SwitchProps {
  color: string | Palette;
  shadow: string | Palette;
  onChange: () => void;
}

const Switch: React.FC<SwitchProps> = ({ color, shadow, onChange }) => {
  return (
    <SwitchBlock color={color} shadowColor={shadow}>
      <input type="checkbox" onChange={onChange} />
      <span className="onoff" />
    </SwitchBlock>
  );
};

type SwitchBlockProps = {
  color: string | Palette;
  shadowColor: string | Palette;
};

const SwitchBlock = styled.label<SwitchBlockProps>`
  width: 55px;
  height: 30px;

  position: relative;
  display: inline-block;
  //display block, inline, inline-block 차이점
  //block => div와 같은 역할, 말그대로 블럭처리, 계속 배치하면 내려감
  //inline => span과 같은 역할이 되어버리는
  //inline-block => block과 inline의 역할을 다 해버리는 놈
  //결론 => 옆으로 붙이는 것에는 display: flex가 아닌 다른것들을 써보는것도 좋을듯하다.
  //다만 align-item이나 justify-content로 중앙정렬을 자주하기 때문에 많이 쓰일것 같지는 않음

  & > input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  & > .onoff {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    background-color: #ccc;
    box-shadow: inset 1px 5px 1px #999;
    //inset => 특정 요소의 안에 그림자를 주는 요소인듯
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
  & > .onoff:before {
    position: absolute;
    content: "";
    //content란 span이나 p같이 안에 글씨가 들어가는 곳에 주로 쓰며 일반적으로는 안쓰이나
    //이런 switch버튼안에 무언가라도 넣거나, css상황에 따라 글씨가 바뀔 때 사용하는 것 같음
    //추가 => before,after이랑 꼭 같이 쓰이는 요소로 before,after는 바로 직전, 직후의 요소에 대한 것을
    //수정해주는 css인데, before,after의 요소를 content로 바로 잡아버려 사용해주는 기법이다.
    height: 22px;
    width: 22px;
    left: 4px;
    bottom: 4px;
    background-color: #fff;
    -webkit-transition: 0.5s;
    transition: 0.4s;
    border-radius: 20px;
  }
  & > input:checked + .onoff {
    background-color: ${props => props.color};
    //#f2d522 -> 배경
    box-shadow: inset 1px 5px 1px ${props => props.shadowColor};
    //#e3ae56 -> 그림자
  }
  & > input:checked + .onoff:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;

export default Switch;
