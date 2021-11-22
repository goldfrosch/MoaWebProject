import React, { useState } from "react";
import styled from "styled-components";

import Chess from "./chess/Chess";

interface MinigameProps {}
const Minigame: React.FC<MinigameProps> = () => {
  const [status, setStatus] = useState<string>("chess");

  return (
    <MinigameBlock>
      <div className="side">
        <ul>
          <li onClick={() => setStatus("chess")}>디럭스 체스</li>
          <li>준비중</li>
          <li>준비중</li>
        </ul>
      </div>
      <div className="main">{status === "chess" && <Chess />}</div>
    </MinigameBlock>
  );
};

const MinigameBlock = styled.div`
  width: 100%;
  min-height: 90vh;

  display: flex;
  & > .side {
    width: 15%;
    padding: 10% 0;
    & > ul li {
      list-style-type: disc;
      font-family: "A15";
      padding: 8px;

      cursor: pointer;
    }
  }
  & > .main {
    flex: 1;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default Minigame;
