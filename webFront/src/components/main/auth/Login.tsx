import React, { useState } from "react";
import styled from "styled-components";
// import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { ThemeColor, ThemeSize } from "styles/Pallete";
import { IUserLogin } from "modules/auth/type";

import LoginForm from "components/common/template/LoginForm";
import Button from "components/common/items/Button";
import ModalForm from "components/common/template/ModalForm";
// import kakao from "assets/icon/kakao.png";
// import naver from "assets/icon/naver.png";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";

interface LoginProps {
  LoginAction: (data: IUserLogin) => void;
  resetPass: (email: string) => Promise<string>;
}

const Login: React.FC<LoginProps> = ({ LoginAction, resetPass }) => {
  const [data, setData] = useState<IUserLogin>({
    email: "",
    password: ""
  });
  const [isModal, setIsModal] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [findPassword, setFindPassword] = useState<string>("");

  const [findMsg, setFindMsg] = useState<string>("");

  const toggleModal = () => {
    if (!isModal) {
      window.document.body.style.overflowY = "hidden";
      window.scrollTo(0, 0);
    } else {
      window.document.body.style.overflowY = "auto";
    }
    setIsModal(!isModal);
  };

  const handleSubmit = async () => {
    let msg = await resetPass(findPassword);
    setFindMsg(msg);
  };
  // const loginKakao = () => {
  //   dispatch(setMessageWarningAction("준비중인 시스템입니다!"));
  // };
  // const loginNaver = () => {
  //   dispatch(setMessageWarningAction("준비중인 시스템입니다!"));
  // };

  return (
    <>
      {isModal && (
        <ModalForm toggleModal={toggleModal}>
          <ModalContent>
            <div className="list">
              <div className="item">
                <span>찾을 계정의 이메일</span>
                <input
                  value={findPassword}
                  onChange={(e: any) => setFindPassword(e.target.value)}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end"
              }}
            >
              <span style={{ color: "red" }}>{findMsg}</span>
              <Button
                theme={ThemeColor.first}
                size={ThemeSize.large}
                onClick={handleSubmit}
              >
                비번찾기
              </Button>
            </div>
          </ModalContent>
        </ModalForm>
      )}
      <LoginForm title="Moa Server">
        <form
          onSubmit={e => {
            e.preventDefault();
            LoginAction(data);
          }}
        >
          {/* 이메일 Form FormControl은 실제로는 Div*/}
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-email">이메일</InputLabel>
            <Input
              id="standard-adornment-email"
              type="text"
              value={data.email}
              onChange={(e: any) =>
                setData({
                  ...data,
                  email: e.target.value
                })
              }
            />
          </FormControl>
          {/* 비밀번호 Form FormControl은 실제로는 Div*/}
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              비밀번호
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              value={data.password}
              onChange={(e: any) =>
                setData({
                  ...data,
                  password: e.target.value
                })
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <span style={{ color: "#444444", fontWeight: 300 }}>
            비밀번호를 잊으셨습니까?
            <Link
              to="/login"
              style={{ color: "#d8538a" }}
              onClick={toggleModal}
            >
              {" "}
              찾기
            </Link>
          </span>
          <span style={{ color: "#444444", fontWeight: 300 }}>
            혹시 계정이 없으십니까?
            <Link to="/register" style={{ color: "#d8538a" }}>
              {" "}
              회원가입
            </Link>
          </span>
          <Button theme={ThemeColor.first} size={ThemeSize.space} submit={true}>
            로그인
          </Button>
          {/* <div
            className="btn"
            style={{ backgroundColor: "#FEDE00", color: "#3A1A1B" }}
            onClick={loginKakao}
          >
            <img
              src={kakao}
              alt=""
              style={{ width: "24px", height: "24px", marginRight: "8px" }}
            />
            카카오톡으로 로그인
          </div>
          <div
            className="btn"
            style={{ backgroundColor: "#00C639" }}
            onClick={loginNaver}
          >
            <img
              src={naver}
              alt=""
              style={{ width: "36px", height: "36px", marginRight: "8px" }}
            />
            네이버로 로그인
          </div> */}
        </form>
      </LoginForm>
    </>
  );
};

const ModalContent = styled.div`
  width: 100%;

  padding: 32px;

  & > .list {
    display: flex;
    flex-direction: column;
    & > .item {
      display: flex;
      flex-direction: column;

      margin: 8px 0;

      & > span {
        padding: 8px;
      }
      & > input {
        width: 100%;
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
          height: 32px;
          margin-left: 8px;
        }
      }
    }
  }
`;

export default Login;
