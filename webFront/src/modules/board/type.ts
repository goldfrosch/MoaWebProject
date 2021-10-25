export interface IGetBoards {
  category: string,
  type: string,
  query: string,
}

export interface IBoardListData {
  prefix: string,
  category: string,
  title: string,
  content: string,
  isComment: boolean,
  createdData: Date,
}

export interface IBoardList {
  limit: number,
  offset: number,
  total: number,

  result: IBoardListData[],
}