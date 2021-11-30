import React from "react";
import styled from "styled-components";
import { Palette } from "styles/Pallete";

interface IOptionItemProps {
  color?: string;
}
const OptionItem: React.FC<IOptionItemProps> = ({ color, children }) => {
  return (
    <OptionItemBlock color={color}>
      <div>{children}</div>
    </OptionItemBlock>
  );
};

type OptionItemBlockProps = {
  color?: string;
};
const OptionItemBlock = styled.li<OptionItemBlockProps>`
  color: ${props => (props.color ? props.color : Palette.black)};

  padding: 8px;

  & > div {
    display: flex;
    align-items: center;
    gap: 0 16px;
  }
`;

export default OptionItem;
