export interface IGetBoards {
  category: string,
  page: number,
  type: string,
  query: string,
}

export interface IBoardDesc {
  title: string,
  context: string,
}

export interface IBoardComment {
  id: number,
  comment: string,
  boardNum: number,
  parentNum: null,
  createdDate: Date,
  nickName: string,
  rank: number,
  uuid: string,
  replyList: IBoardReply[],
  isDeleted: boolean,
  isEdit?: boolean,
}

export interface IBoardListData {
  id: number,
  category: string,
  count: number,
  commentCount: number,
  createdDate: Date,
  isLove: number,
  nickName: string,
  prefix: string,
  profile: string,
  rank: number,
  title: string,
  thumbnail: string,
  uuid: string,
}

export interface IBoardDetailData {
  id: number,
  category: string,
  count: number,
  content: string,
  createdDate: Date,
  isLove: number,
  isComment: boolean,
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

export interface IBoard {
  newNotice: IBoardListData[],
  list: IBoardList,
}

export interface IBoardCommentsItem {
  comment: IBoardComment;
  isShowReply?: boolean;
  replyList: IBoardComment[];
  replyComment?: string;
}

export interface IBoardCommentsList {
  list: IBoardCommentsItem[];
  counts: number;
}

export interface IBoardDetail {
  comments: IBoardCommentsList,
  detail: IBoardDetailData,
}

//댓글관련
export interface IComment {
  boardNum: number,
  comment: string,
  parentNum: number | null,
}

export interface IBoardReply {
  id: number,
  comment: string,
  boardNum: number,
  parentNum: null,
  createdDate: Date,
  nickName: string,
  rank: number,
  uuid: string,
}

export interface ICommentUpdate {
  id: number,
  context: string,
}