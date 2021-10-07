import React from "react";
import styled from "styled-components";
import {
  ThemeColor,
  ThemeSize,
  buttonSizeMap,
  buttonColorMap,
} from "styles/Pallete";

interface ButtonProps {
  theme: ThemeColor;
  size: ThemeSize;
  submit?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  theme,
  size,
  submit,
  onClick,
  children,
}) => {
  return (
    <ButtonBlock
      theme={theme}
      size={size}
      onClick={onClick}
      type={submit ? "submit" : "button"}
    >
      {children}
    </ButtonBlock>
  );
};

type ButtonBlockProps = {
  theme: ThemeColor;
  size: ThemeSize;
};

const ButtonBlock = styled.button<ButtonBlockProps>`
  width: ${props => buttonSizeMap[props.size as ThemeSize].width};
  height: ${props => buttonSizeMap[props.size as ThemeSize].height};
  background-color: ${props =>
    buttonColorMap[props.theme as ThemeColor].backgroundColor};
  color: ${props => buttonColorMap[props.theme as ThemeColor].color};

  border: 1px solid ${props => buttonColorMap[props.theme as ThemeColor].border};
  border-radius: ${props => buttonSizeMap[props.size as ThemeSize].radius};

  font-size: ${props => buttonSizeMap[props.size as ThemeSize].fontSize};

  cursor: pointer;
`;

export default Button;
