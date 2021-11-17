import React, { useEffect, useState } from "react";
import Home from "components/main/home/Home";

import * as BannerAPI from "api/banner";
import { IBanners } from "modules/banner/type";
import { AxiosResponse } from "axios";

interface HomeContainerProps {}

const HomeContainer: React.FC<HomeContainerProps> = () => {
  const [data, setData] = useState<IBanners[]>([]);
  const getBanners = () => {
    BannerAPI.getBanners()
      .then((res: AxiosResponse) => {
        setData(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getBanners();
  }, []);
  return <Home data={data} />;
};

export default HomeContainer;
