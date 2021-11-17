import axios from "api/defaultClient";

export const getBanners = () => {
  return axios.get(`/banners`);
};
