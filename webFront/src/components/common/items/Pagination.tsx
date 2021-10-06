import styled from "styled-components";

import leftArrow from "assets/arrow/left_arrow.png";
import leftEndArrow from "assets/arrow/left_arrow_end.png";
import rightArrow from "assets/arrow/right_arrow.png";
import rightEndArrow from "assets/arrow/right_arrow_end.png";

interface PaginationProps {
  totalCounts: number;
  nowPage: number;
  movePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  nowPage,
  movePage,
  totalCounts,
}) => {
  const TotalPages = Math.ceil(totalCounts / 10);
  const Pages = [];
  const firstPage = Math.floor((nowPage - 1) / 10) * 10 + 1;
  for (let i = firstPage; i <= firstPage + 9; i++) {
    if (i > TotalPages) break;
    Pages.push(i);
  }

  const onClick = (num: number) => {
    movePage(num);
  };

  const prevPage = () => {
    if (nowPage === 1) return nowPage;
    movePage(nowPage - 1);
  };

  const nextPage = () => {
    if (nowPage >= TotalPages) return nowPage;
    movePage(nowPage + 1);
  };

  const prevTotalPage = () => {
    movePage(1);
  };

  const nextTotalPage = () => {
    movePage(TotalPages);
  };

  return (
    <PaginationBlock>
      <span onClick={prevTotalPage}>
        <img src={leftEndArrow} alt="" />
      </span>
      <span onClick={prevPage}>
        <img src={leftArrow} alt="" />
      </span>
      {Pages.map(num => (
        <div
          className={"items " + (nowPage === num && "select")}
          key={num}
          onClick={() => onClick(num)}
        >
          {num}
        </div>
      ))}
      <span onClick={nextPage}>
        <img src={rightArrow} alt="" />
      </span>
      <span onClick={nextTotalPage}>
        <img src={rightEndArrow} alt="" />
      </span>
    </PaginationBlock>
  );
};

const PaginationBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .items {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 10px;
    text-decoration: none;
    font-size: 18px;
    color: rgba(68, 68, 68, 0.4);
  }
  .select {
    text-decoration: underline;
    color: black;
  }
  span {
    width: 32px;
    height: 32px;

    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 2px;
    padding: 10px;

    border: 1px solid #78829a;
    border-radius: 6px;
  }
`;

export default Pagination;
