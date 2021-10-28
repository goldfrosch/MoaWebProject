export interface IGetBoards {
  category: string,
  page: number,
  type: string,
  query: string,
}

export interface IBoardListData {
  id: number,
  category: string,
  count: number,
  content?: string,
  createdDate: Date,
  isLove: number,
  nickName: string,
  prefix: string,
  rank: number,
  title: string,
  uuid: string,
}

export interface IBoardData {
  category: string,
  content: string,
  isComment: boolean,
  prefix: string,
  title: string,
}

export interface IBoardList {
  empty: boolean,
  limit: number,
  offset: number,
  total: number,

  results: IBoardListData[],
}