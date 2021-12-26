import axios from "api/defaultClient";
import { IComment, ICommentUpdate, IGetBoards } from "modules/board/type";

export const getBoards = (data: IGetBoards) => {
  return axios.get(
    `/boards?category=${data.category}&page=${data.page}&type=${data.type}&query=${data.query}`
  );
};

export const getBoard = (id: number) => {
  return axios.get(`/boards/${id}`, { withCredentials: true });
};

export const getBoardTag = (category: string) => {
  return axios.get(`/board/tags/${category}`);
};

export const postBoard = (data: any) => {
  return axios.post(`/board`, data);
};

export const editBoard = (id: number, data: any) => {
  return axios.put(`/board/${id}`, data);
};

export const deleteBoard = (id: number) => {
  return axios.delete(`/board/${id}`);
};

export const postComment = (data: IComment) => {
  return axios.post("/board/comment", data);
};

export const putComment = (data: ICommentUpdate) => {
  return axios.put("/board/comment", data);
};

export const deleteComment = (id: number) => {
  return axios.delete(`/board/comment/${id}`);
};
