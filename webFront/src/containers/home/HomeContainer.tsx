import React, { useEffect, useState } from "react";
import Home from "components/main/home/Home";

import * as BannerAPI from "api/banner";
import * as HomeAPI from "api/home";
import { AxiosResponse } from "axios";

import { IBanners } from "modules/banner/type";
import { IBoardListData } from "modules/board/type";

export interface IHomeBoardData {
  noticeList: IBoardListData[];
  updateList: IBoardListData[];
  photoList: IBoardListData[];
}

interface HomeContainerProps {}
const HomeContainer: React.FC<HomeContainerProps> = () => {
  const [data, setData] = useState<IBanners[]>([]);
  const [list, setList] = useState<IHomeBoardData>({
    noticeList: [],
    updateList: [],
    photoList: []
  });
  const getBanners = () => {
    BannerAPI.getBanners()
      .then((res: AxiosResponse) => {
        setData(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getHome = () => {
    HomeAPI.getHomeList()
      .then((res: AxiosResponse) => {
        setList({
          ...res.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getBanners();
    getHome();
  }, []);
  return <Home data={data} list={list} />;
};

export default HomeContainer;
