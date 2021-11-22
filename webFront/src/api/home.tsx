import axios from "api/defaultClient";

export const getHomeList = () => {
  return axios.get("/home");
};
