import React, { useState } from "react";
import styled from "styled-components";

import MoreVertIcon from "@mui/icons-material/MoreVert";

interface IOptionProps {}
const OptionList: React.FC<IOptionProps> = ({ children }) => {
  const [isMenu, setIsMenu] = useState<boolean>(false);
  return (
    <OptionListBlock>
      <MoreVertIcon onClick={() => setIsMenu(!isMenu)} />
      <div className={isMenu ? "optionList active" : "optionList"}>
        {children}
      </div>
    </OptionListBlock>
  );
};

const OptionListBlock = styled.div`
  position: relative;
  cursor: pointer;

  padding-left: 8px;
  & > .optionList {
    position: absolute;
    top: 100%;
    right: 50%;

    opacity: 0;
    transition-property: opacity;
    transition-duration: 0.2s;
  }
  & > .active {
    width: 160px;
    height: 130px;
    background-color: white;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    opacity: 1;
  }
`;

export default OptionList;
