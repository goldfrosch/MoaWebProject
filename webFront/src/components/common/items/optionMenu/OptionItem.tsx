import React from "react";
import styled from "styled-components";
import { Palette } from "styles/Pallete";

interface IOptionItemProps {
  color?: string;
  onClick?: () => void;
}
const OptionItem: React.FC<IOptionItemProps> = ({
  color,
  children,
  onClick
}) => {
  return (
    <OptionItemBlock color={color} onClick={onClick}>
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
  :hover {
    background-color: #f9f9f9;
  }
`;

export default OptionItem;
