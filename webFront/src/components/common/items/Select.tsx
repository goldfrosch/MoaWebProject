import styled from "styled-components";
import { Palette } from "styles/Pallete";

const SelectBlock = styled.select`
  width: 120px;
  height: 36px;

  border: none;
  border-bottom: 1px solid ${Palette.borderGray};
  background: none;

  padding: 4px 0;
`;

export default SelectBlock;
