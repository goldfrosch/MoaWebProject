import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import MoreVertIcon from "@mui/icons-material/MoreVert";

interface IOptionProps {}
const OptionList: React.FC<IOptionProps> = ({ children }) => {
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  return (
    <OptionListBlock ref={menuRef}>
      <MoreVertIcon onClick={() => setIsMenu(!isMenu)} />
      <ul className={isMenu ? "optionList active" : "optionList"}>
        {children}
      </ul>
    </OptionListBlock>
  );
};

const OptionListBlock = styled.ul`
  position: relative;
  cursor: pointer;

  padding-left: 8px;
  & > .optionList {
    position: absolute;
    top: 80%;
    right: 50%;

    opacity: 0;
    transition-property: opacity;
    transition-duration: 0.25s;
    & > li {
      & > div {
        display: none;
      }
    }
  }
  & > .active {
    min-width: 120px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

    opacity: 1;
    & > li {
      width: 100%;
      & > div {
        display: inline;
      }
    }
  }
`;

export default OptionList;
