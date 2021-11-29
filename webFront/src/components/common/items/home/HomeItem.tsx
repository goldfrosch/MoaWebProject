import React from "react";
import styled from "styled-components";

interface HomeItemProps {}
const HomeItem: React.FC<HomeItemProps> = ({ children }) => {
  return <HomeItemBlock>{children}</HomeItemBlock>;
};

const HomeItemBlock = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;

  & > .borderHead {
    padding: 12px 8px;
    border-bottom: 1px solid #e9e9e9;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .borderBody {
    padding: 8px 12px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    & > .date {
      font-size: 12px;
      color: #979797;
    }
    :hover {
      background-color: #f7f7f7;
      transform: scale(1.025);
    }
  }
  & > .gridBody {
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    grid-gap: 16px;
    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 384px) {
      grid-template-columns: repeat(1, 1fr);
    }
    .gridItem {
      width: 100%;
      height: 100%;

      padding: 8px;

      display: flex;
      flex-direction: column;
      justify-content: center;
      & > img {
        width: 100%;
        height: 100%;

        object-fit: contain;
      }
      & > span {
        width: 100%;
        height: 5%;

        padding: 8px 4px;

        text-overflow: ellipsis;
      }
    }
    .gridItem:hover {
      background-color: #f7f7f7;
      transform: scale(1.025);
    }
  }
`;

export default HomeItem;
