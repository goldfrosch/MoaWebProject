import React from "react";
import styled from "styled-components";

interface IPainterProps {
  paint: string;
}
const Painter: React.FC<IPainterProps> = ({ paint }) => {
  return <PainterBlock color={paint} />;
};

type IPainterBlock = {
  color: string;
};

const PainterBlock = styled.div<IPainterBlock>`
  width: 64px;
  height: 64px;
  background-color: ${props => props.color};

  border-radius: 32px;
  margin: 0 4px;

  cursor: pointer;
`;

export default Painter;
