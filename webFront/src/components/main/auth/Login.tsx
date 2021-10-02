import React from "react";
import styled from "styled-components";

import kakao from "assets/icon/kakao.png";
import naver from "assets/icon/naver.png";
interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  return (
    <LoginBlock>
      <div className="loginForm">
        <div className="header">
          <h2>Moa Server</h2>
        </div>
        <div className="content">
          <form>
            <input placeholder="ID" />
            <input placeholder="PW" />
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "#2c2f33" }}
            >
              로그인
            </button>
            <div
              className="btn"
              style={{ backgroundColor: "#FEDE00", color: "#3A1A1B" }}
            >
              <img
                src={kakao}
                alt=""
                style={{ width: "24px", height: "24px", marginRight: "8px" }}
              />
              카카오톡으로 로그인
            </div>
            <div className="btn" style={{ backgroundColor: "#00C639" }}>
              <img
                src={naver}
                alt=""
                style={{ width: "36px", height: "36px", marginRight: "8px" }}
              />
              네이버로 로그인
            </div>
          </form>
        </div>
        <div className="footer">
          <span>created by GoldFrosch</span>
        </div>
      </div>
    </LoginBlock>
  );
};

const LoginBlock = styled.div`
  width: 100%;
  height: 90vh;

  display: flex;
  align-items: center;
  justify-content: center;

  & > .loginForm {
    width: 440px;
    height: 680px;
    background-color: white;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 16px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    & > .header {
      width: 100%;
      height: 10%;
      padding: 16px;
      border-bottom: 1px solid #e9e9e9;

      display: flex;
      align-items: center;
      justify-content: center;
    }
    & > .content {
      flex: 1;
      display: flex;
      justify-content: center;

      padding: 32px 8px;
      .btn {
        width: 100%;
        height: 48px;
        color: white;
        border-radius: 6px;

        font-weight: 500;
        margin: 8px 0;

        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;
      }
      & > form {
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;

        padding: 16px;
        & > input {
          width: 100%;
          height: 32px;

          border: none;
          border-bottom: 2px solid #b8b7b7;

          padding-left: 8px;
          margin-bottom: 32px;
        }
      }
    }
    & > .footer {
      height: 10%;

      display: flex;
      align-items: center;
      justify-content: center;

      & > span {
        color: #c4c4c4;
        font-weight: 300;
      }
    }
  }
`;

export default Login;
