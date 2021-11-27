import React from "react";
import styled from "styled-components";

interface IOptionItemProps {
  title: string;
  color?: string;
}
const OptionItem: React.FC<IOptionItemProps> = ({ title }) => {
  return <OptionItemBlock>{title}</OptionItemBlock>;
};

type OptionItemBlockProps = {
  color?: string;
};
const OptionItemBlock = styled.div<OptionItemBlockProps>`
  transition-property: opacity;
  transition-duration: 0.2s;
`;

export default OptionItem;
