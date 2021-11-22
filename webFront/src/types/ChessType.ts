export interface ChessType {
  object: number;
  selected: boolean;
  team: "black" | "white" | "";
  isLine: boolean;
  canCaught: boolean;
}

export interface IChessOption {
  whiteScore: number;
  blackScore: number;
  isBomb: boolean;
}

export interface IChessAIOption {
  select: number[];
  target: number[];
  selectScore: number;
  targetScore: number;
}
