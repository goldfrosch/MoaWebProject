import { ChessType } from "types/ChessType";

import WhiteKing from "assets/game/chess/white/white_king.png";
import WhiteQueen from "assets/game/chess/white/white_queen.png";
import WhiteBishop from "assets/game/chess/white/white_bishop.png";
import WhiteRook from "assets/game/chess/white/white_rook.png";
import WhiteKnight from "assets/game/chess/white/white_knight.png";
import WhitePawn from "assets/game/chess/white/white_pawn.png";

import BlackKing from "assets/game/chess/black/black_king.png";
import BlackQueen from "assets/game/chess/black/black_queen.png";
import BlackBishop from "assets/game/chess/black/black_bishop.png";
import BlackRook from "assets/game/chess/black/black_rook.png";
import BlackKnight from "assets/game/chess/black/black_knight.png";
import BlackPawn from "assets/game/chess/black/black_pawn.png";

import Bomb from "assets/game/chess/bomber/bomb.png";

class ChessItemUtils {
  GetItem(team: "black" | "white" | "", object: number) {
    if (team === "white") {
      switch (object) {
        case 1:
          return WhitePawn;
        case 9:
          return WhiteKnight;
        case 11:
          return WhiteRook;
        case 13:
          return WhiteBishop;
        case 30:
          return WhiteQueen;
        case 50:
          return Bomb;
        case 100:
          return WhiteKing;
      }
    } else {
      switch (object) {
        case 1:
          return BlackPawn;
        case 9:
          return BlackKnight;
        case 11:
          return BlackRook;
        case 13:
          return BlackBishop;
        case 30:
          return BlackQueen;
        case 50:
          return Bomb;
        case 100:
          return BlackKing;
      }
    }
  }

  CheckPawn(y: number, x: number, data: ChessType[][]) {
    let caughtData: number[][] = [];
    let lineData: number[][] = [];

    //하얀팀일 경우 시작위치 파악해서 코딩딩
    if (data[y][x].team === "white") {
      if (y !== 0) {
        //양끝이 아니라는 가정하에 주변의 엔티티가 있는지 검증
        if (x < 7) {
          if (
            data[y - 1][x + 1].object > 0 &&
            data[y - 1][x + 1].team !== "white"
          ) {
            caughtData.push([y - 1, x + 1]);
          }
        }
        if (x > 0) {
          if (
            data[y - 1][x - 1].object > 0 &&
            data[y - 1][x - 1].team !== "white"
          ) {
            caughtData.push([y - 1, x - 1]);
          }
        }
        //초기조건 시작 위치인가 아닌가를 비교함
        if (y === 6) {
          for (let i = 1; i <= 2; i++) {
            if (data[y - i][x].object >= 1) {
              break;
            } else {
              lineData.push([y - i, x]);
            }
          }
        } else {
          if (data[y - 1][x].object >= 1) {
          } else {
            lineData.push([y - 1, x]);
          }
        }
      }
    }
    //폰이 검정팀일때
    else if (data[y][x].team === "black") {
      if (y !== 7) {
        //양끝이 아니라는 가정하에 주변의 엔티티가 있는지 검증
        if (x < 7) {
          if (
            data[y + 1][x + 1].object > 0 &&
            data[y + 1][x + 1].team !== "black"
          ) {
            caughtData.push([y + 1, x + 1]);
          }
        }
        if (x > 0) {
          if (
            data[y + 1][x - 1].object > 0 &&
            data[y + 1][x - 1].team !== "black"
          ) {
            caughtData.push([y + 1, x - 1]);
          }
        }
        //초기조건 시작 위치인가 아닌가를 비교함
        if (y === 1) {
          for (let i = 1; i <= 2; i++) {
            if (data[y + i][x].object >= 1) {
              break;
            } else {
              lineData.push([y + i, x]);
            }
          }
        } else {
          if (data[y + 1][x].object >= 1) {
          } else {
            lineData.push([y + 1, x]);
          }
        }
      }
    }

    let result: number[][][] = [];
    result[0] = lineData;
    result[1] = caughtData;

    return result;
  }
  CheckKnight(
    y: number,
    x: number,
    data: ChessType[][],
    team: "black" | "white" | ""
  ) {
    const moveList: number[][] = [
      [1, 2],
      [1, -2],
      [-1, 2],
      [-1, -2],
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1],
    ];

    let caughtData: number[][] = [];
    let lineData: number[][] = [];

    for (let i = 0; i < moveList.length; i++) {
      if (
        y + moveList[i][0] < 0 ||
        x + moveList[i][1] < 0 ||
        y + moveList[i][0] > 7 ||
        x + moveList[i][1] > 7
      ) {
        continue;
      } else {
        if (data[y + moveList[i][0]][x + moveList[i][1]].object > 0) {
          if (data[y + moveList[i][0]][x + moveList[i][1]].team !== team) {
            caughtData.push([y + moveList[i][0], x + moveList[i][1]]);
          }
        } else {
          lineData.push([y + moveList[i][0], x + moveList[i][1]]);
        }
      }
    }

    let result: number[][][] = [];
    result[0] = lineData;
    result[1] = caughtData;

    return result;
  }

  CheckLine(
    move: number,
    y: number,
    x: number,
    data: ChessType[][],
    team: "black" | "white" | ""
  ) {
    let caughtData: number[][] = [];
    let lineData: number[][] = [];

    //위로 체크
    for (let i = 1; i <= move; i++) {
      if (y - i >= 0) {
        if (data[y - i][x].object > 0) {
          if (data[y - i][x].team !== team) {
            caughtData.push([y - i, x]);
          }
          break;
        } else {
          lineData.push([y - i, x]);
        }
      } else break;
    }

    //뒤로 체크
    for (let i = 1; i <= move; i++) {
      if (y + i <= 7) {
        if (data[y + i][x].object > 0) {
          if (data[y + i][x].team !== team) {
            caughtData.push([y + i, x]);
          }
          break;
        } else {
          lineData.push([y + i, x]);
        }
      } else break;
    }

    //좌로 체크
    for (let i = 1; i <= move; i++) {
      if (x - i >= 0) {
        if (data[y][x - i].object > 0) {
          if (data[y][x - i].team !== team) {
            caughtData.push([y, x - i]);
          }
          break;
        } else {
          lineData.push([y, x - i]);
        }
      } else break;
    }

    //우로 체크
    for (let i = 1; i <= move; i++) {
      if (x + i <= 7) {
        if (data[y][x + i].object > 0) {
          if (data[y][x + i].team !== team) {
            caughtData.push([y, x + i]);
          }
          break;
        } else {
          lineData.push([y, x + i]);
        }
      } else break;
    }
    let result: number[][][] = [];
    result[0] = lineData;
    result[1] = caughtData;

    return result;
  }

  CheckDiag(
    move: number,
    y: number,
    x: number,
    data: ChessType[][],
    team: "black" | "white" | ""
  ) {
    let caughtData: number[][] = [];
    let lineData: number[][] = [];

    for (let i = 1; i <= move; i++) {
      if (y - i >= 0 && x + i <= 7) {
        if (data[y - i][x + i].object > 0) {
          if (data[y - i][x + i].team !== team) {
            caughtData.push([y - i, x + i]);
          }
          break;
        } else {
          lineData.push([y - i, x + i]);
        }
      }
    }

    //상 좌
    for (let i = 1; i <= move; i++) {
      if (y - i >= 0 && x - i >= 0) {
        if (data[y - i][x - i].object > 0) {
          if (data[y - i][x - i].team !== team) {
            caughtData.push([y - i, x - i]);
          }
          break;
        } else {
          lineData.push([y - i, x - i]);
        }
      }
    }

    //하 우
    for (let i = 1; i <= move; i++) {
      if (y + i <= 7 && x + i <= 7) {
        if (data[y + i][x + i].object > 0) {
          if (data[y + i][x + i].team !== team) {
            caughtData.push([y + i, x + i]);
          }
          break;
        } else {
          lineData.push([y + i, x + i]);
        }
      }
    }

    //하 좌
    for (let i = 1; i <= move; i++) {
      if (y + i <= 7 && x - i >= 0) {
        if (data[y + i][x - i].object > 0) {
          if (data[y + i][x - i].team !== team) {
            caughtData.push([y + i, x - i]);
          }
          break;
        } else {
          lineData.push([y + i, x - i]);
        }
      }
    }
    let result: number[][][] = [];
    result[0] = lineData;
    result[1] = caughtData;

    return result;
  }
}

export default new ChessItemUtils();
