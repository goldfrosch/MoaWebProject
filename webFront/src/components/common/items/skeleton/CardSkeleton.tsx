import React from "react";
import styled from "styled-components";

import Skeleton from "@mui/material/Skeleton";
import ProfileSkeleton from "./ProfileSkeleton";

interface ICardSkeletonProps {}
const CardSkeleton: React.FC<ICardSkeletonProps> = () => {
  return (
    <CardSkeletonBlock>
      <Skeleton
        variant="rectangular"
        width="100%"
        height={190}
        animation="wave"
      />
      <ProfileSkeleton />
    </CardSkeletonBlock>
  );
};

const CardSkeletonBlock = styled.div`
  width: 100%;
  height: auto;
  background-color: white;

  border: 1px solid #d7d7d7;
  border-radius: 8px;

  padding: 2.5% 5%;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default CardSkeleton;
