import React from "react";
import styled from "styled-components";

import SearchIcon from "assets/icon/search.svg";

interface SearchProps {
  value: any;
  onChange?: (e: any) => void;
  onSubmit: (e: any) => void;
}
const Search: React.FC<SearchProps> = ({ value, onChange, onSubmit }) => {
  return (
    <SearchBlock onSubmit={onSubmit}>
      <input defaultValue={value} type="text" onChange={onChange} />
      <button type="submit">
        <img src={SearchIcon} alt="" />
      </button>
    </SearchBlock>
  );
};

const SearchBlock = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 800px) {
    justify-content: flex-start;
  }
  input {
    width: 80%;
    height: 36px;
    border: none;
    border-bottom: 1px solid #979797;

    background: none;

    padding-left: 8px;
  }
  button {
    background: none;

    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 32px;
      height: 32px;

      border: 1px solid #e9e9e9;
      border-radius: 8px;

      cursor: pointer;
    }
  }

  img:hover {
    background-color: rgba(0, 0, 0, 0.01);
  }
`;

export default Search;
