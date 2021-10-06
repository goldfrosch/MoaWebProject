import React from "react";
import styled from "styled-components";

interface LoginFormProps {
  title: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ title, children }) => {
  return (
    <LoginFormBlock>
      <div className="loginForm">
        <div className="header">
          <h2>{title}</h2>
        </div>
        <div className="content">{children}</div>
        <div className="footer">
          <span>created by GoldFrosch</span>
        </div>
      </div>
    </LoginFormBlock>
  );
};
const LoginFormBlock = styled.div`
  width: 100%;
  height: 90vh;

  display: flex;
  align-items: center;
  justify-content: center;

  & > .loginForm {
    width: 440px;
    height: 75vh;
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
        & > span {
          margin: 4px 0;
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
    @media (max-width: 800px) {
      width: 100%;
      background-color: white;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      border-radius: 12px;

      display: flex;
      flex-direction: column;
      justify-content: center;

      & > .header {
        width: 100%;
        height: 10%;
        padding: 8px;
        border-bottom: 1px solid #e9e9e9;

        display: flex;
        align-items: center;
        justify-content: center;
      }
      & > .content {
        flex: 1;
        display: flex;
        justify-content: center;

        padding: 16px 4px;
        .btn {
          width: 100%;
          height: 36px;
          color: white;
          border-radius: 6px;

          font-weight: 500;
          margin: 4px 0;

          display: flex;
          align-items: center;
          justify-content: center;

          cursor: pointer;
        }
        & > form {
          width: 90%;
          display: flex;
          flex-direction: column;
          align-items: center;

          padding: 16px;
          & > input {
            width: 100%;
            height: 36px;

            border: none;
            border-bottom: 2px solid #b8b7b7;

            padding-left: 6px;
            margin-bottom: 16px;
          }
          & > span {
            font-size: 14px;
            margin: 4px 0;
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
  }
`;

export default LoginForm;
