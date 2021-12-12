import React from "react";
import styled from "styled-components";

interface IPainterProps {
  paint: string;
  onClick?: () => void;
}
const Painter: React.FC<IPainterProps> = ({ paint, onClick }) => {
  return <PainterBlock color={paint} onClick={onClick} />;
};

type IPainterBlock = {
  color: string;
};

const PainterBlock = styled.div<IPainterBlock>`
  width: 64px;
  height: 64px;
  background-color: ${props => props.color};

  border-radius: 50%;
  margin: 0 4px;

  cursor: pointer;
`;

export default Painter;
