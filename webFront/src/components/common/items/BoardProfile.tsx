import React from "react";
import styled from "styled-components";

import Avatar from "@mui/material/Avatar";
import DateUtils from "utils/DateUtils";

interface IBoardProfile {
  profile?: string;
  nickName: string;
  uuid: string;
  createdDate: Date;
}

const BoardProfile: React.FC<IBoardProfile> = ({
  profile,
  nickName,
  uuid,
  createdDate
}) => {
  return (
    <BoardProfileBlock>
      {profile ? (
        <Avatar src={`http://moasv.co.kr/images/${profile}`} />
      ) : (
        <Avatar />
      )}

      <div className="profile">
        <div className="nick">
          <img
            src={`https://crafatar.com/renders/head/${
              uuid !== "" ? uuid : "ec561538-f3fd-461d-aff5-086b22154bce"
            }`}
            alt=""
          />
          <span>{nickName}</span>
        </div>
        <div className="time">{DateUtils.getPrevTime(createdDate)}</div>
      </div>
    </BoardProfileBlock>
  );
};

const BoardProfileBlock = styled.div`
  display: flex;
  align-items: center;
  & > .profile {
    padding: 16px 4px;
    & > .nick {
      display: flex;
      align-items: center;
      & > img {
        width: 24px;
        height: 24px;
        margin-left: 8px;
      }
      & > span {
        font-size: 14px;
        font-weight: 500;

        padding: 0 4px;
      }
    }
    & > .time {
      color: #575757;

      padding-left: 8px;

      font-size: 8px;
      font-weight: 500;
    }
  }
`;

export default BoardProfile;
