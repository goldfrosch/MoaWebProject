import React from "react";
import styled from "styled-components";

import SearchIcon from "assets/icon/search.svg";

interface SearchProps {
  value: any;
  onChange: (e: any) => void;
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
    border-bottom: 1px solid #e9e9e9;

    background: none;

    padding-left: 8px;
  }
`;

export default Search;
