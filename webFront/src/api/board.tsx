import axios from "api/defaultClient";
import { IGetBoards, IBoardListData } from "modules/board/type";

export const getBoards = (data: IGetBoards) => {
  return axios.get(
    `/boards?category=${data.category}&type=${data.type}&query=${data.query}`
  );
};

export const postBoard = (data: IBoardListData) => {
  return axios.post(`/board`, data);
};
