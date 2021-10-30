import axios from "api/defaultClient";
import { IGetBoards, IBoardData } from "modules/board/type";

export const getBoards = (data: IGetBoards) => {
  return axios.get(
    `/boards?category=${data.category}&page=${data.page}&type=${data.type}&query=${data.query}`
  );
};

export const getBoard = (id: number) => {
  return axios.get(`/boards/${id}`);
};

export const getBoardTag = (category: string) => {
  return axios.get(`/board/tags/${category}`);
};

export const postBoard = (data: IBoardData) => {
  return axios.post(`/board`, data);
};
