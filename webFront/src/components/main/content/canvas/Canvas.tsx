import Painter from "components/common/items/Painter";
import React, { useRef } from "react";
import styled from "styled-components";

interface ICanvasProps {}
const defaultColorPicker = [
  "#FF0000",
  "#ff9100",
  "#FFFF00",
  "#00AA00",
  "#0000FF",
  "#FF00FF",
  "#000000"
];

const Canvas: React.FC<ICanvasProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <CanvasBlock>
      <canvas ref={canvasRef} />
      <div className="colorList">
        {defaultColorPicker.map((data, key) => (
          <Painter paint={data} key={key} />
        ))}
      </div>
    </CanvasBlock>
  );
};

const CanvasBlock = styled.div`
  & > canvas {
    width: 500px;
    height: 500px;

    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }

  & > .colorList {
    display: flex;
    align-items: center;
  }
`;

export default Canvas;
