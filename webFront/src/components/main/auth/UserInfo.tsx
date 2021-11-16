import React, { useState } from "react";
import styled from "styled-components";

import { ThemeColor, ThemeSize } from "styles/Pallete";

import Avatar from "@mui/material/Avatar";

import Button from "components/common/items/Button";
import ModalForm from "components/common/template/ModalForm";
import { IProfile } from "modules/auth/type";

interface UserInfoProps {
  data: IProfile;
}
const UserInfo: React.FC<UserInfoProps> = ({ data }) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const toggleModal = () => {
    if (!isModal) {
      window.document.body.style.overflowY = "hidden";
      window.scrollTo(0, 0);
    } else {
      window.document.body.style.overflowY = "auto";
    }
    setIsModal(!isModal);
  };

  return (
    <>
      {isModal && (
        <ModalForm toggleModal={toggleModal}>
          <ModalContent>
            <div className="list">
              <div className="item">
                <span>기존 비밀번호: </span>
                <input />
              </div>
              <div className="item">
                <span>새 비밀번호: </span>
                <input />
              </div>
              <div className="item">
                <span>새 비밀번호 확인: </span>
                <input />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end"
              }}
            >
              <Button theme={ThemeColor.first} size={ThemeSize.large}>
                변경하기
              </Button>
            </div>
          </ModalContent>
        </ModalForm>
      )}
      <UserInfoBlock>
        <div className="title">
          <h2>유저 정보</h2>
        </div>
        <div className="content">
          <div className="list">
            <Avatar sx={{ width: 64, height: 64 }} />
          </div>
          <div className="list">
            <span>이메일</span>
            <input defaultValue={data.email} disabled />
          </div>
          <div className="list">
            <span>닉네임</span>
            <input defaultValue={data.nickName ? data.nickName : ""} disabled />
          </div>
          <div className="list">
            <span>UUID</span>
            <input defaultValue={data.uuid ? data.uuid : ""} disabled />
          </div>
          <div className="list">
            <span>비밀번호</span>
            <Button
              theme={ThemeColor.first}
              size={ThemeSize.large}
              onClick={toggleModal}
            >
              비번 변경
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end"
            }}
          >
            <Button theme={ThemeColor.first} size={ThemeSize.large}>
              정보 수정
            </Button>
          </div>
        </div>
      </UserInfoBlock>
    </>
  );
};

const UserInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 32px;
  & > .title {
    width: 100%;
    padding: 16px 8px;
    border-bottom: 1px solid #e9e9e9;
    & > h2 {
      font-size: 24px;
    }
  }
  & > .content {
    padding: 16px 0;
    & > .list {
      display: flex;
      align-items: center;

      padding-left: 16px;
      margin: 24px 0;
      & > span {
        width: 10%;
      }
      & > input {
        height: 32px;
        width: 75%;
        padding-left: 8px;
      }
      & > input:disabled {
        color: #464646;
      }
    }
  }
`;

const ModalContent = styled.div`
  width: 100%;

  padding: 32px;

  & > .list {
    display: flex;
    flex-direction: column;
    & > .item {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      margin: 8px 0;

      & > span {
        padding-right: 8px;
      }
      & > input {
        flex: 1;
        height: 32px;

        border: 1px solid #797979;
        border-radius: 4px;

        padding-left: 8px;
        font-size: 18px;
      }
      @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        & > span {
          margin: 8px 0;
        }
        & > input {
          width: 80%;
          margin-left: 8px;
        }
      }
    }
  }
`;

export default UserInfo;
