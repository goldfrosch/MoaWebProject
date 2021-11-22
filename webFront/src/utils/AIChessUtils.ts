import { ChessType, IChessAIOption } from "types/ChessType";
import ChessItemUtils from "./ChessItemUtils";

class AIChessUtils {
  CheckAI(data: ChessType[][]) {
    //전달할 초기값을 설정
    let AIData: IChessAIOption = {
      select: [0, 0],
      target: [0, 0],
      selectScore: 0,
      targetScore: 0,
    };

    //각 말마다 최적화된 값을 도출함
    //킹, 퀸, 비숍, 룩, 나이트, 폰 순서대로 우선순위를 정해 최대한
    //등급이 낮은 폰이나 나이트로 적을 잡게 한다.
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        let newAIData: IChessAIOption = {
          select: [0, 0],
          target: [0, 0],
          selectScore: 0,
          targetScore: 0,
        };
        if (data[i][j].team === "black") {
          //왕의 경우
          if (data[i][j].object === 100) {
            newAIData = this.GetGridData(
              i,
              j,
              ChessItemUtils.CheckDiag(1, i, j, data, "black")[1],
              data
            );
            if (newAIData.targetScore >= AIData.targetScore) {
              AIData = newAIData;
            }
            newAIData = this.GetGridData(
              i,
              j,
              ChessItemUtils.CheckLine(1, i, j, data, "black")[1],
              data
            );
            if (newAIData.targetScore >= AIData.targetScore) {
              AIData = newAIData;
            }
          }
          //여왕의 경우
          if (data[i][j].object === 30) {
            newAIData = this.GetGridData(
              i,
              j,
              ChessItemUtils.CheckDiag(7, i, j, data, "black")[1],
              data
            );
            if (newAIData.targetScore >= AIData.targetScore) {
              AIData = newAIData;
            }
            newAIData = this.GetGridData(
              i,
              j,
              ChessItemUtils.CheckLine(7, i, j, data, "black")[1],
              data
            );
            if (newAIData.targetScore >= AIData.targetScore) {
              AIData = newAIData;
            }
          }
          //비숍의 경우
          if (data[i][j].object === 13) {
            newAIData = this.GetGridData(
              i,
              j,
              ChessItemUtils.CheckDiag(7, i, j, data, "black")[1],
              data
            );
            if (newAIData.targetScore >= AIData.targetScore) {
              AIData = newAIData;
            }
          }
          //룩의 경우
          if (data[i][j].object === 11) {
            newAIData = this.GetGridData(
              i,
              j,
              ChessItemUtils.CheckLine(7, i, j, data, "black")[1],
              data
            );
            if (newAIData.targetScore >= AIData.targetScore) {
              AIData = newAIData;
            }
          }
          //나이트의 경우
          if (data[i][j].object === 9) {
            newAIData = this.GetGridData(
              i,
              j,
              ChessItemUtils.CheckKnight(i, j, data, "black")[1],
              data
            );
            if (newAIData.targetScore >= AIData.targetScore) {
              AIData = newAIData;
            }
          }
          //폰의 경우
          if (data[i][j].object === 1) {
            newAIData = this.GetGridData(
              i,
              j,
              ChessItemUtils.CheckPawn(i, j, data)[1],
              data
            );
            if (newAIData.targetScore >= AIData.targetScore) {
              AIData = newAIData;
            }
          }
        }
      }
    }
    //잡아서 이득 보는 말이 없을 때 or 잡아도 손해일 때(미완)
    //위치 데이터의 값에 따른 가장 효율적인 마지막 말이 움직임
    //최대한 뒷라인보다 앞라인이 움직일때가 효율적이고
    //폰들이 전부 2칸 이상 전진했을 때는 다른 말들이 처음 움직이는 것이 효율적으로
    //계산해서 결과를 도출한다
    if (AIData.targetScore <= 0) {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          //newAIData 초기화로 값을 재시작
          let newAIData: IChessAIOption = {
            select: [0, 0],
            target: [0, 0],
            selectScore: 0,
            targetScore: 0,
          };
          if (data[i][j].team === "black") {
            //경우: 킹
            if (data[i][j].object === 100) {
              newAIData = this.GetGridData(
                i,
                j,
                ChessItemUtils.CheckDiag(1, i, j, data, "black")[0],
                data
              );
              let CheckData: number[][] = ChessItemUtils.CheckDiag(
                1,
                i,
                j,
                data,
                "black"
              )[0];
              for (let k = 0; k < CheckData.length; k++) {
                //4칸 미만 전진했는가?
                if (CheckData[k][0] - newAIData.select[0] < 4) {
                  newAIData = {
                    ...newAIData,
                    targetScore: 0.1,
                    target: [CheckData[k][0], CheckData[k][1]],
                  };
                } else {
                  newAIData = {
                    ...newAIData,
                    targetScore: 0.1,
                    target: [CheckData[k][0], CheckData[k][1]],
                  };
                }
                if (AIData.targetScore <= newAIData.targetScore) {
                  AIData = newAIData;
                }
              }
            }
            if (data[i][j].object === 30) {
              //대각선 검증
              newAIData = this.GetGridData(
                i,
                j,
                ChessItemUtils.CheckDiag(7, i, j, data, "black")[0],
                data
              );
              let CheckData: number[][] = ChessItemUtils.CheckDiag(
                7,
                i,
                j,
                data,
                "black"
              )[0];
              for (let k = 0; k < CheckData.length; k++) {
                //4칸 미만 전진했는가?
                if (CheckData[k][0] - newAIData.select[0] < 4) {
                  newAIData = {
                    ...newAIData,
                    targetScore:
                      3 + 1 * (CheckData[k][0] - newAIData.select[0]),
                    target: [CheckData[k][0], CheckData[k][1]],
                  };
                } else {
                  newAIData = {
                    ...newAIData,
                    targetScore:
                      5 - 1 * (CheckData[k][0] - newAIData.select[0]),
                    target: [CheckData[k][0], CheckData[k][1]],
                  };
                }
                if (AIData.targetScore <= newAIData.targetScore) {
                  AIData = newAIData;
                }
              }
              //직선 검증
              //룩의 움직이는 칸 전체 데이터 불러옴
              CheckData = ChessItemUtils.CheckLine(7, i, j, data, "black")[0];
              for (let k = 0; k < CheckData.length; k++) {
                //4칸 미만 전진했는가?
                if (CheckData[k][0] - newAIData.select[0] < 4) {
                  newAIData = {
                    ...newAIData,
                    targetScore:
                      4 + 4 * (CheckData[k][0] - newAIData.select[0]),
                    target: [CheckData[k][0], CheckData[k][1]],
                  };
                } else {
                  newAIData = {
                    ...newAIData,
                    targetScore:
                      8 - 1 * (CheckData[k][0] - newAIData.select[0]),
                    target: [CheckData[k][0], CheckData[k][1]],
                  };
                }
                if (AIData.targetScore <= newAIData.targetScore) {
                  AIData = newAIData;
                }
              }
            }
            //경우: 비숍
            if (data[i][j].object === 13) {
              newAIData = this.GetGridData(
                i,
                j,
                ChessItemUtils.CheckDiag(7, i, j, data, "black")[0],
                data
              );
              //비숍의 움직이는 칸 전체 데이터 불러옴
              let CheckData: number[][] = ChessItemUtils.CheckDiag(
                7,
                i,
                j,
                data,
                "black"
              )[0];
              for (let k = 0; k < CheckData.length; k++) {
                //4칸 미만 전진했는가?
                if (CheckData[k][0] - newAIData.select[0] < 4) {
                  newAIData = {
                    ...newAIData,
                    targetScore:
                      5 + 3 * (CheckData[k][0] - newAIData.select[0]),
                    target: [CheckData[k][0], CheckData[k][1]],
                  };
                } else {
                  newAIData = {
                    ...newAIData,
                    targetScore:
                      10 - 2 * (CheckData[k][0] - newAIData.select[0]),
                    target: [CheckData[k][0], CheckData[k][1]],
                  };
                }
                if (AIData.targetScore <= newAIData.targetScore) {
                  AIData = newAIData;
                }
              }
            }
            //경우:  룩
            if (data[i][j].object === 11) {
              newAIData = this.GetGridData(
                i,
                j,
                ChessItemUtils.CheckLine(7, i, j, data, "black")[0],
                data
              );
              //룩의 움직이는 칸 전체 데이터 불러옴
              let CheckData: number[][] = ChessItemUtils.CheckLine(
                7,
                i,
                j,
                data,
                "black"
              )[0];
              for (let k = 0; k < CheckData.length; k++) {
                //4칸 미만 전진했는가?
                if (CheckData[k][0] - newAIData.select[0] < 4) {
                  newAIData = {
                    ...newAIData,
                    targetScore:
                      5 + 3 * (CheckData[k][0] - newAIData.select[0]),
                    target: [CheckData[k][0], CheckData[k][1]],
                  };
                } else {
                  newAIData = {
                    ...newAIData,
                    targetScore:
                      10 - 2 * (CheckData[k][0] - newAIData.select[0]),
                    target: [CheckData[k][0], CheckData[k][1]],
                  };
                }
                if (AIData.targetScore <= newAIData.targetScore) {
                  AIData = newAIData;
                }
              }
            }
            //경우: 나이트
            if (data[i][j].object === 9) {
              newAIData = this.GetGridData(
                i,
                j,
                ChessItemUtils.CheckKnight(i, j, data, "black")[0],
                data
              );
              //나이트의 움직이는 칸 전체 데이터 불러옴
              let CheckData: number[][] = ChessItemUtils.CheckKnight(
                i,
                j,
                data,
                "black"
              )[0];
              //랜덤으로 이동할꺼라 움직일 수 있는 경우의 수 중에서
              //값을 랜덤으로 가져와준다
              let randomCheck: number = Math.floor(
                Math.random() * CheckData.length
              );
              newAIData = {
                ...newAIData,
                target: [CheckData[randomCheck][0], CheckData[randomCheck][1]],
                targetScore: 40,
              };
              if (AIData.targetScore <= newAIData.targetScore) {
                AIData = newAIData;
              }
            }
            //경우: 폰
            if (data[i][j].object === 1) {
              newAIData = this.GetGridData(
                i,
                j,
                ChessItemUtils.CheckPawn(i, j, data)[0],
                data
              );
              //폰의 움직이는 칸 전체 데이터 불러옴
              let CheckData: number[][] = ChessItemUtils.CheckPawn(
                i,
                j,
                data
              )[0];
              for (let k = 0; k < CheckData.length; k++) {
                if (CheckData[k][0] - newAIData.select[0] === 1) {
                  newAIData = {
                    ...newAIData,
                    targetScore: 30,
                    target: [CheckData[k][0], CheckData[k][1]],
                  };
                } else if (CheckData[k][0] - newAIData.select[0] === 2) {
                  newAIData = {
                    ...newAIData,
                    targetScore: 100,
                    target: [CheckData[k][0], CheckData[k][1]],
                  };
                }
                if (AIData.targetScore <= newAIData.targetScore) {
                  AIData = newAIData;
                }
              }
            }
          }
        }
      }
    }
    return AIData;
  }
  //플레이어가 AI의 말을 죽일 수 있는지에 대한 결과 값을
  //return함으로써 해당 말이 위험한가 아닌가를 측정함
  CheckIfIDied() {}
  GetGridData(
    selectY: number,
    selectX: number,
    target: number[][],
    data: ChessType[][]
  ) {
    //초기값
    let AIData: IChessAIOption = {
      select: [0, 0],
      target: [0, 0],
      selectScore: 0,
      targetScore: 0,
    };

    //가장 최적화된 값을 세팅하는 함수
    const setData = (i: number) => {
      AIData = {
        select: [selectY, selectX],
        target: [target[i][0], target[i][1]],
        selectScore: data[selectY][selectX].object,
        targetScore: data[target[i][0]][target[i][1]].object,
      };
    };

    //전 상태와 현 상태를 비교하는 함수
    for (let i = 0; i < target.length; i++) {
      if (AIData.targetScore < data[target[i][0]][target[i][1]].object) {
        setData(i);
      } else if (
        AIData.targetScore === data[target[i][0]][target[i][1]].object
      ) {
        if (AIData.selectScore < data[selectY][selectX].object) {
          setData(i);
        }
      }
    }
    return AIData;
  }
}

export default new AIChessUtils();
