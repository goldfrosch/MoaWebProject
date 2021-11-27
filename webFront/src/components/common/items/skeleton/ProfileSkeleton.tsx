import React from "react";
import styled from "styled-components";

import Skeleton from "@mui/material/Skeleton";

interface IProfileSkeletonProps {}
const ProfileSkeleton: React.FC<IProfileSkeletonProps> = () => {
  return (
    <ProfileSkeletonBlock>
      <Skeleton variant="circular" width={40} height={40} animation="wave" />
      <div className="list">
        <Skeleton width="100%" animation="wave" />
        <Skeleton width="60%" animation="wave" />
      </div>
    </ProfileSkeletonBlock>
  );
};

const ProfileSkeletonBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > .list {
    flex: 1;
    padding: 4px;
  }
`;

export default ProfileSkeleton;
