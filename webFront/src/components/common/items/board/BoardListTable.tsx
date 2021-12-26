import React from "react";
import styled from "styled-components";
import { Palette } from "styles/Pallete";

export interface IBoardHead {
  title: string;
  width: string;
}

interface BoardProps {
  headList: IBoardHead[];
}

const BoardListTable: React.FC<BoardProps> = ({ children, headList }) => {
  return (
    <BoardListBlock>
      <thead>
        <tr>
          {headList.map((data, key) => (
            <td style={{ width: `${data.width}`, color: "white" }} key={key}>
              {data.title}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </BoardListBlock>
  );
};

const BoardListBlock = styled.table`
  width: 100%;
  text-align: center;

  border-spacing: 0;
  font-size: 14px;

  thead {
    height: 6vh;

    background-color: ${Palette.header};
    & > tr > td {
      @media (max-width: 768px) {
        font-size: 2vw;
      }
    }
  }
  tbody {
    tr {
      border-bottom: 1px solid #e7e7e7;
      text-align: center;
      cursor: pointer;
      :hover {
        background-color: #e0e0e0;
      }
    }
  }
`;

export default BoardListTable;
