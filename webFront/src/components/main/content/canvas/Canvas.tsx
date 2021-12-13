import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Painter from "components/common/items/Painter";
import MobileNotForm from "components/common/template/MobileNotForm";

const defaultColorPicker = [
  "#FF0000",
  "#ff9100",
  "#FFFF00",
  "#00AA00",
  "#0000FF",
  "#FF00FF",
  "#000000"
];
interface Coordinate {
  x: number;
  y: number;
}
interface ICanvasProps {}
const Canvas: React.FC<ICanvasProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined
  );
  const [isPainting, setIsPainting] = useState(false);

  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop
    };
  };

  const drawLine = (
    originalMousePosition: Coordinate,
    newMousePosition: Coordinate
  ) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d");

    if (context) {
      context.strokeStyle = "red";
      context.lineJoin = "round";
      context.lineWidth = 1;

      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();

      context.stroke();
    }
  };

  const startPaint = useCallback((event: MouseEvent) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setIsPainting(true);
      setMousePosition(coordinates);
    }
  }, []);

  const paint = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition]
  );

  const exitPaint = useCallback(() => {
    setIsPainting(false);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;

    canvas.addEventListener("mousedown", startPaint);
    canvas.addEventListener("mousemove", paint);
    canvas.addEventListener("mouseup", exitPaint);
    canvas.addEventListener("mouseleave", exitPaint);

    return () => {
      canvas.removeEventListener("mousedown", startPaint);
      canvas.removeEventListener("mousemove", paint);
      canvas.removeEventListener("mouseup", exitPaint);
      canvas.removeEventListener("mouseleave", exitPaint);
    };
  }, [startPaint, paint, exitPaint]);

  return (
    <MobileNotForm>
      <CanvasBlock>
        <canvas ref={canvasRef} />
        <div className="colorList">
          {defaultColorPicker.map((data, key) => (
            <Painter paint={data} key={key} />
          ))}
        </div>
      </CanvasBlock>
    </MobileNotForm>
  );
};

const CanvasBlock = styled.div`
  & > canvas {
    width: 100%;
    height: 100%;

    margin: 16px;
    border: 16px solid burlywood;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    @media (max-width: 864px) {
      margin: 0;
    }
  }

  & > .colorList {
    display: flex;
    align-items: center;

    padding: 0 32px;
  }
`;

export default Canvas;
