import React from "react";
import styled from "styled-components";

import SearchIcon from "assets/icon/search.svg";

interface SearchProps {
  value: any;
  onChange?: (e: any) => void;
}
const Search: React.FC<SearchProps> = ({ value, onChange }) => {
  return (
    <SearchBlock>
      <input value={value} type="text" onChange={onChange} />
      <img src={SearchIcon} alt="" />
    </SearchBlock>
  );
};

const SearchBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    width: 240px;
    height: 36px;
    border: none;
    border-bottom: 1px solid #979797;

    background: none;

    padding-left: 8px;
  }
  img {
    width: 32px;
    height: 32px;

    border: 1px solid #e9e9e9;
    border-radius: 8px;

    cursor: pointer;
  }
  img:hover {
    background-color: rgba(0, 0, 0, 0.01);
  }
`;

export default Search;
