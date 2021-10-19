import React, { useState } from "react";

import LoginForm from "components/common/template/LoginForm";
import kakao from "assets/icon/kakao.png";
import naver from "assets/icon/naver.png";
import { Link } from "react-router-dom";
import Button from "components/common/items/Button";
import { ThemeColor, ThemeSize } from "styles/Pallete";
import { IUserLogin } from "modules/auth/type";

import Input from "@mui/material/Input";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

interface LoginProps {
  LoginAction: (data: IUserLogin) => void;
}

const Login: React.FC<LoginProps> = ({ LoginAction }) => {
  const [data, setData] = useState<IUserLogin>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const loginKakao = () => {
    return alert("준비중인 시스템입니다!");
  };
  const loginNaver = () => {
    return alert("준비중인 시스템입니다!");
  };
  return (
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
                email: e.target.value,
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
                password: e.target.value,
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
          비밀번호를 잊어먹으셨습니까?
          <Link to="/register" style={{ color: "#d8538a" }}>
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
        <div
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
        </div>
      </form>
    </LoginForm>
  );
};

export default Login;
