import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import Button from "components/common/items/Button";

import { ChessBoardItems } from "constants/ChessItem";
import { ChessType, IChessAIOption, IChessOption } from "types/ChessType";

import AIChessUtils from "utils/AIChessUtils";
import ChessItemUtils from "utils/ChessItemUtils";
import {
  setMessageInfoAction,
  setMessageWarningAction
} from "modules/snackbar/snackbar";
import { ThemeColor, ThemeSize } from "styles/Pallete";

interface ChessProps {}
const Chess: React.FC<ChessProps> = () => {
  const dispatch = useDispatch();

  //체스 보드 리스트
  const [chessBoard, setChessBoard] = useState<ChessType[][]>([
    ...ChessBoardItems
  ]);
  //체스 게임 플레이 데이터
  const [gameData, setGameData] = useState<IChessOption>({
    whiteScore: 0,
    blackScore: 0,
    isBomb: false
  });

  //현재 플레이어의 턴인가?
  const [isTurn, setIsTurn] = useState<boolean>(true);

  //이동 횟수
  const [moveNum, setMoveNum] = useState<number>(0);
  //현재 선택한 좌표 저장 state
  const [selected, setSelected] = useState<number[]>([-1, -1]);
  //현재 이동 가능한 라인 위치 저장 state
  const [line, setLine] = useState<number[][]>([]);

  //잡을 수 있는 좌표에 대한 위치 저장 state
  const [canCaught, setCanCaught] = useState<number[][]>([]);

  //게임 완료 상태
  const [isDone, setIsDone] = useState<boolean>(false);

  //체스판 초기화 함수
  const resetBoard = () => {
    window.location.reload();
  };
  //체스판 클릭 함수
  const ClickBoard = (y: number, x: number) => {
    if (isDone)
      return dispatch(setMessageWarningAction("게임이 이미 종료되었습니다"));
    //현재 플레이어의 턴인가?
    if (isTurn) {
      //checkData => 움직여도 되는 좌표인가를 체크함
      let checkData = false;

      for (let i = 0; i < line.length; i++) {
        if (line[i][0] === y) {
          if (line[i][1] === x) {
            checkData = true;
            break;
          }
        }
      }
      for (let i = 0; i < canCaught.length; i++) {
        if (canCaught[i][0] === y) {
          if (canCaught[i][1] === x) {
            checkData = true;
            break;
          }
        }
      }

      if (checkData) {
        //플레이어의 움직임
        SwapBoard(y, x, selected[0], selected[1]);
        setMoveNum(moveNum + 1);

        //이후 AI가 움직인다...!
        //내턴 끝남
        setIsTurn(false);
        //AI턴 시작 그나마 생각하는 척하게
        //2초후에 실행함
        setTimeout(function () {
          let AIData: IChessAIOption = AIChessUtils.CheckAI(chessBoard);
          SwapBoard(
            AIData.target[0],
            AIData.target[1],
            AIData.select[0],
            AIData.select[1]
          );
          setIsTurn(true);
        }, 1000);
      } else {
        SelectBoard(y, x);
      }
    }
  };

  //기존 보드 진행 데이터 초기화
  const ClearBoard = () => {
    let data = chessBoard;
    if (selected[0] !== -1) {
      data[selected[0]][selected[1]].selected = false;

      //라인 데이터 초기화
      for (let i = 0; i < line.length; i++) {
        data[line[i][0]][line[i][1]].isLine = false;
      }

      //잡는 위치 데이터 초기화
      for (let i = 0; i < canCaught.length; i++) {
        data[canCaught[i][0]][canCaught[i][1]].canCaught = false;
      }
      setLine([]);
      setCanCaught([]);
    }
    setChessBoard(data);
  };

  //잡거나 이동하는 함수
  const SwapBoard = (
    selectY: number,
    selectX: number,
    nowY: number,
    nowX: number
  ) => {
    let data = chessBoard;

    //잡을 시 게임 현재 진행상황 데이터 변경
    let gameOption = gameData;
    //조건 -> 각팀의 폰이 양 Y축의 끝에 도착하면
    if (
      (selectY === 0 || selectY === 7) &&
      chessBoard[nowY][nowX].object === 1
    ) {
      if (data[selectY][selectX].object === 100) {
        dispatch(setMessageWarningAction("킹을 잡아 게임을 종료합니다"));
        setIsDone(true);
        setIsTurn(false);
      }
      dispatch(setMessageInfoAction("폰이 막바지에 다다라 퀸으로 진화합니다"));
      data[selectY][selectX] = {
        ...chessBoard[nowY][nowX],
        object: 30,
        selected: false
      };
    }
    //나머지 말들에 대한 조건
    else {
      if (data[selectY][selectX].object === 100) {
        dispatch(setMessageWarningAction("킹을 잡아 게임을 종료합니다"));
        setIsTurn(false);
        setIsDone(true);
      } else if (data[selectY][selectX].object === 50) {
        //말과 같은 형식의 적 말들을 인식 후 전체 척살
        //조건: 말과 같은 등급의 말 + 적의 말 전체
        if (data[nowY][nowX].object === 100) {
          dispatch(setMessageWarningAction("무승부로 게임이 종료됩니다"));
          setIsTurn(false);
          setIsDone(true);
        }
        for (let i = 0; i < chessBoard.length; i++) {
          for (let j = 0; j < chessBoard[i].length; j++) {
            if (
              data[nowY][nowX].object === data[i][j].object &&
              data[nowY][nowX].team !== data[i][j].team
            ) {
              data[i][j] = {
                object: 0,
                selected: false,
                isLine: false,
                canCaught: false,
                team: ""
              };
            }
          }
        }
        //폭탄 밟을 시 우선 밟은 말은 사망
        data[nowY][nowX] = {
          object: 0,
          selected: false,
          isLine: false,
          canCaught: false,
          team: ""
        };
        gameOption.isBomb = true;
        console.log("BOMB!");
      }

      if (chessBoard[nowY][nowX].team === "white") {
        let score = gameOption.whiteScore + chessBoard[selectY][selectX].object;
        gameOption = {
          ...gameOption,
          whiteScore: score
        };
      } else {
        let score = gameOption.blackScore + chessBoard[selectY][selectX].object;
        gameOption = {
          ...gameOption,
          blackScore: score
        };
      }

      data[selectY][selectX] = {
        ...chessBoard[nowY][nowX],
        selected: false
      };
      //둘중 하나의 스코어가 20점 이상이고
      //폭탄이 생성되지 않았을 경우에 폭탄을 새로 생성시켜줌
      if (
        (gameOption.blackScore > 20 || gameOption.whiteScore > 20) &&
        gameOption.isBomb === false
      ) {
        while (true) {
          //위치 랜덤 지정
          let checkY = Math.random() * 3 + 3;
          let checkX = Math.random() * 7;
          //해당 위치에 오브젝트가 없는지를 체크
          //오브젝트가 존재할 시 다시 돌아감
          if (data[Math.floor(checkY)][Math.floor(checkX)].object === 0) {
            dispatch(setMessageWarningAction("랜덤으로 폭탄이 생성됩니다"));
            data[Math.floor(checkY)][Math.floor(checkX)].object = 50;
            gameOption.isBomb = true;
            break;
          }
        }
      }
      //현재 진행상황 저장
      setGameData(gameOption);
    }
    //기존 선택 데이터 위치 초기화(이미 이동했기 때문에 빈 값으로 변경)
    data[nowY][nowX] = {
      object: 0,
      selected: false,
      isLine: false,
      canCaught: false,
      team: ""
    };

    setChessBoard([...data]);
    ClearBoard();
  };
  //여기까지

  //보드 선택하기
  const SelectBoard = (y: number, x: number) => {
    //기본조건: 말이 있어야하고 흰색이여야함
    if (chessBoard[y][x].object !== 0 && chessBoard[y][x].team === "white") {
      //보드 값 새로 선언
      let data = [...chessBoard];

      ClearBoard();

      //선택 위치 잡기
      if (selected[0] === y && selected[1] === x) {
        data[y][x].selected = false;
        setSelected([-1, -1]);
      } else {
        data[y][x].selected = true;
        setSelected([y, x]);

        let lineData: number[][] = [];
        let caughtData: number[][] = [];

        //위치 표시 검수
        //1: 폰
        if (data[y][x].object === 1) {
          lineData.push(...ChessItemUtils.CheckPawn(y, x, data)[0]);
          caughtData.push(...ChessItemUtils.CheckPawn(y, x, data)[1]);
        }
        //2. 룩 or 퀸의 직선경로
        if (data[y][x].object === 11 || data[y][x].object === 30) {
          lineData.push(...ChessItemUtils.CheckLine(7, y, x, data, "white")[0]);
          caughtData.push(
            ...ChessItemUtils.CheckLine(7, y, x, data, "white")[1]
          );
        }
        //3. 비숍 or 퀸의 대각선경로
        if (data[y][x].object === 13 || data[y][x].object === 30) {
          lineData.push(...ChessItemUtils.CheckDiag(7, y, x, data, "white")[0]);
          caughtData.push(
            ...ChessItemUtils.CheckDiag(7, y, x, data, "white")[1]
          );
        }
        //4. 나이트 이동 경로
        if (data[y][x].object === 9) {
          lineData.push(
            ...ChessItemUtils.CheckKnight(y, x, data, data[y][x].team)[0]
          );
          caughtData.push(
            ...ChessItemUtils.CheckKnight(y, x, data, data[y][x].team)[1]
          );
        }
        //5. 킹의 이동 경로
        if (data[y][x].object === 100) {
          lineData.push(
            ...ChessItemUtils.CheckLine(1, y, x, data, "white")[0],
            ...ChessItemUtils.CheckDiag(1, y, x, data, "white")[0]
          );
          caughtData.push(
            ...ChessItemUtils.CheckLine(1, y, x, data, "white")[1],
            ...ChessItemUtils.CheckDiag(1, y, x, data, "white")[1]
          );
        }

        //라인 데이터 생성
        for (let i = 0; i < lineData.length; i++) {
          data[lineData[i][0]][lineData[i][1]].isLine = true;
        }
        for (let i = 0; i < caughtData.length; i++) {
          data[caughtData[i][0]][caughtData[i][1]].canCaught = true;
        }
        setLine([...lineData]);
        setCanCaught([...caughtData]);
      }
    }
  };

  return (
    <ChessBlock>
      <div className="board">
        {chessBoard.map((data, key) =>
          Math.floor(key % 8) % 2 === 0
            ? data.map((item, index) => (
                <div
                  className={
                    item.canCaught
                      ? "item caught"
                      : item.selected
                      ? "item selected"
                      : item.isLine
                      ? "item isLine"
                      : index % 2 === 0
                      ? "item black"
                      : "item white"
                  }
                  key={index}
                  onClick={() => ClickBoard(key, index)}
                >
                  <img
                    src={ChessItemUtils.GetItem(item.team, item.object)}
                    className={item.team === "white" ? "team" : ""}
                    alt=""
                  />
                </div>
              ))
            : data.map((item, index) => (
                <div
                  className={
                    item.canCaught
                      ? "item caught"
                      : item.selected
                      ? "item selected"
                      : item.isLine
                      ? "item isLine"
                      : index % 2 === 0
                      ? "item white"
                      : "item black"
                  }
                  key={index}
                  onClick={() => ClickBoard(key, index)}
                >
                  <img
                    src={ChessItemUtils.GetItem(item.team, item.object)}
                    alt=""
                  />
                </div>
              ))
        )}
      </div>
      <span>현재 이동횟수: {moveNum}</span>
      {isDone && (
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <Button
            theme={ThemeColor.first}
            size={ThemeSize.large}
            onClick={resetBoard}
          >
            글쓰기
          </Button>
        </div>
      )}
    </ChessBlock>
  );
};

const ChessBlock = styled.div`
  & > .board {
    width: 640px;
    height: 640px;

    border: 5px solid saddlebrown;

    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(8, 1fr);

    & > .item {
      font-weight: 700;
      font-size: 20px;
      position: relative;

      display: flex;
      align-items: center;
      justify-content: center;

      border: 1px solid black;
      & > img {
        max-width: 64px;
      }
    }
    .team {
      cursor: pointer;
    }
    & > .caught {
      background-color: red;
      cursor: pointer;
    }
    & > .selected {
      background-color: forestgreen;
      cursor: pointer;
    }
    & > .isLine {
      background-color: lawngreen;
      cursor: pointer;
    }
    & > .black {
      background-color: chocolate;
    }
    & > .white {
      background-color: burlywood;
    }
  }
`;

export default Chess;
