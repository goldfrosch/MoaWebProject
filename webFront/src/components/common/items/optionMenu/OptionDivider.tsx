import React from "react";
import styled from "styled-components";
import { Palette } from "styles/Pallete";

interface IOptionDividerProps {}
const OptionDivider: React.FC<IOptionDividerProps> = () => {
  return <OptionDividerBlock />;
};

const OptionDividerBlock = styled.div`
  width: 100%;

  border-bottom: 1px solid ${Palette.borderGray};

  margin: 4px 0;
`;

export default OptionDivider;
