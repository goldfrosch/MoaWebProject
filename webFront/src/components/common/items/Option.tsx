import React from "react";
import styled from "styled-components";

interface IOption {
  edit: () => void;
  delete: () => void;
}
const OptionItem: React.FC<IOption> = () => {
  return <OptionItemBlock></OptionItemBlock>;
};

const OptionItemBlock = styled.div``;

export default OptionItem;
