import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ThemeColor, ThemeSize } from "styles/Pallete";

import * as AuthAPI from "api/auth";

import Button from "components/common/items/Button";
import { IUserRegister } from "modules/auth/type";
import { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import {
  setMessageErrorAction,
  setMessageSuccessAction
} from "modules/snackbar/snackbar";
import CheckUtils from "utils/CheckUtils";

interface Gender {
  key: string;
  value: string;
}

const GenderType: Gender[] = [
  { key: "MALE", value: "남성" },
  { key: "FEMALE", value: "여성" }
];

interface IDateList {
  year: number[];
  month: number[];
  day: number[];
}

interface IDay {
  year: number;
  month: number;
  day: number;
}

interface ICheckRegister {
  checkEmail: boolean;
  checkNick: boolean;
}

interface RegisterProps {
  register: (data: IUserRegister) => void;
}

const Register: React.FC<RegisterProps> = ({ register }) => {
  const dispatch = useDispatch();

  const [data, setData] = useState<IUserRegister>({
    email: "",
    password: "",
    nickName: "",
    birthday: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDay()
    ),
    gender: "MALE",
    age: 1
  });

  const [check, setCheck] = useState<ICheckRegister>({
    checkEmail: false,
    checkNick: false
  });

  const [dateList, setDateList] = useState<IDateList>({
    year: [],
    month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    day: []
  });

  const [birth, setBirth] = useState<IDay>({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDay()
  });
  const [rePassword, setRePassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const checkEmail = () => {
    if (!CheckUtils.VerifyEmail(data.email))
      return dispatch(
        setMessageErrorAction(
          "아이디가 빈 값 이거나, 이메일 형식이 일치하지 않습니다"
        )
      );
    AuthAPI.findEmail(data.email)
      .then((res: AxiosResponse) => {
        if (res.data) {
          dispatch(setMessageErrorAction("중복된 이메일이 존재합니다"));
        } else {
          dispatch(setMessageSuccessAction("중복된 이메일이 없습니다"));
          setCheck({
            ...check,
            checkEmail: true
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const checkNickname = () => {
    if (data.nickName.length > 12 || data.nickName.length < 4)
      return dispatch(setMessageErrorAction("닉네임은 4 ~ 12글자여야 합니다"));
    else if (!CheckUtils.VerifyNickname(data.nickName)) {
      return dispatch(
        setMessageErrorAction("닉네임은 영어,숫자,한글만 가능합니다")
      );
    } else {
      AuthAPI.findNickname(data.nickName)
        .then((res: AxiosResponse) => {
          if (res.data) {
            dispatch(setMessageErrorAction("중복된 닉네임이 존재합니다"));
          } else {
            dispatch(setMessageSuccessAction("중복된 닉네임이 없습니다"));
            setCheck({
              ...check,
              checkNick: true
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const getDays = () => {
    let days = [];
    for (let i = 1; i <= new Date(birth.year, birth.month, 0).getDate(); i++) {
      days.push(i);
    }
    //가입 데이터 변경
    setData({
      ...data,
      age: Number(new Date().getFullYear() - birth.year + 1)
    });
    //연도, 월에 따른 날짜 수 변경
    setDateList({
      ...dateList,
      day: days
    });
  };

  const registerUser = () => {
    if (data.email === "") {
      setErrorMsg("- 이메일을 입력해주세요");
    } else {
      if (!check.checkEmail) {
        setErrorMsg("- 이메일 중복확인을 해주세요");
      } else {
        if (!check.checkNick) {
          setErrorMsg("- 닉네임 중복확인을 해주세요");
        } else {
          if (data.password !== rePassword) {
            setErrorMsg("- 비밀번호를 서로 확인바랍니다");
          } else if (data.password.length < 8) {
            setErrorMsg("- 비밀번호는 8자리 이상이여야 합니다");
          } else {
            let dates = new Date(`${birth.year}-${birth.month}-${birth.day}`);
            setData({
              ...data,
              birthday: dates
            });
            setErrorMsg("");
            register(data);
          }
        }
      }
    }
  };

  useEffect(() => {
    let year: number[] = [];
    for (let i = 0; i < 100; i++) {
      year.push(new Date().getFullYear() - i);
    }

    let days: number[] = [];
    for (
      let i = 1;
      i <=
      new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate();
      i++
    ) {
      days.push(i);
    }

    setDateList({
      ...dateList,
      year: year,
      day: days
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RegisterBlock>
      <div className="registerForm">
        <div className="header">
          <h2>회원가입</h2>
        </div>
        <div className="content">
          <div className="option">
            <span>이메일</span>
            <Button
              theme={ThemeColor.second}
              size={ThemeSize.middle}
              onClick={checkEmail}
            >
              중복확인
            </Button>
          </div>
          <input
            value={data.email}
            onChange={e => setData({ ...data, email: e.target.value })}
          />
          <div className="option">
            <span>닉네임</span>
            <Button
              theme={ThemeColor.second}
              size={ThemeSize.middle}
              onClick={checkNickname}
            >
              중복확인
            </Button>
          </div>
          <input
            value={data.nickName}
            onChange={e => setData({ ...data, nickName: e.target.value })}
          />
          <div className="option">
            <span>비밀번호</span>
          </div>
          <input
            type="password"
            value={data.password}
            onChange={e => setData({ ...data, password: e.target.value })}
          />
          <div className="option">
            <span>비밀번호 재입력</span>
          </div>
          <input
            type="password"
            value={rePassword}
            onChange={e => setRePassword(e.target.value)}
          />
          <div className="option">
            <span>생일 정보</span>
          </div>
          <div className="selectDate">
            <select
              className="yearSelect"
              defaultValue={birth.year}
              onChange={e => {
                getDays();
                setBirth({
                  ...birth,
                  year: Number(e.target.value)
                });
                setData({
                  ...data,
                  age: new Date().getFullYear() - Number(e.target.value) + 1
                });
              }}
            >
              {dateList.year.map(data => (
                <option value={data} key={data}>
                  {data}
                </option>
              ))}
            </select>
            <select
              className="dateSelect"
              defaultValue={birth.month}
              onChange={e => {
                getDays();
                setBirth({
                  ...birth,
                  month: Number(e.target.value)
                });
              }}
            >
              {dateList.month.map(data => (
                <option value={data} key={data}>
                  {data}
                </option>
              ))}
            </select>
            <select
              className="dateSelect"
              defaultValue={birth.day}
              onChange={e => {
                setBirth({
                  ...birth,
                  day: Number(e.target.value)
                });
              }}
            >
              {dateList.day.map(data => (
                <option value={data} key={data}>
                  {data}
                </option>
              ))}
            </select>
          </div>
          <div className="option">
            <span>성별, 나이</span>
          </div>
          <div className="etc">
            <select
              className="genderSelect"
              onChange={e => setData({ ...data, gender: e.target.value })}
            >
              {GenderType.map((data, key) => (
                <option value={data.key} key={key}>
                  {data.value}
                </option>
              ))}
            </select>
            <input type="number" value={data.age} disabled />
          </div>
          <span className="warning">{errorMsg}</span>
          <Button
            theme={ThemeColor.first}
            size={ThemeSize.space}
            onClick={registerUser}
          >
            회원가입하기
          </Button>
        </div>
      </div>
    </RegisterBlock>
  );
};

const RegisterBlock = styled.div`
  width: 100%;
  height: 90vh;

  display: flex;
  align-items: center;
  justify-content: center;
  & > .registerForm {
    width: 440px;
    height: 75vh;
    background-color: white;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 24px;

    display: flex;
    flex-direction: column;

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
      flex-direction: column;
      align-items: flex-start;

      padding: 16px 48px;
      & > .option {
        width: 100%;

        margin: 0 4px;

        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      & > .warning {
        width: 100%;
        color: red;

        padding: 8px 0;
      }
      & > input {
        width: 100%;
        height: 36px;

        border: 1px solid #b8b7b7;
        padding-left: 8px;
        margin-bottom: 8px;
      }
      & > .selectDate {
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: space-between;
        & > .yearSelect {
          width: 40%;
          height: 36px;

          border: 1px solid #b8b7b7;
        }
        & > .dateSelect {
          width: 25%;
          height: 36px;

          border: 1px solid #b8b7b7;
        }
      }
      & > .etc {
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: space-between;
        & > .genderSelect {
          width: 45%;
          height: 36px;

          border: 1px solid #b8b7b7;
        }
        & > input {
          width: 45%;
          height: 36px;

          border: 1px solid #b8b7b7;
        }
      }
      @media (max-width: 800px) {
        padding: 8px 24px;
        & > span {
          margin: 4px;
        }
        & > .warning {
          width: 100%;
          color: red;
          font-size: 12px;

          padding: 4px 0;
        }
        & > input {
          width: 100%;
          height: 36px;

          border: 1px solid #b8b7b7;
          padding-left: 8px;
          margin-bottom: 8px;
        }
        & > .selectDate {
          width: 100%;

          display: flex;
          align-items: center;
          justify-content: space-between;
          & > .yearSelect {
            width: 40%;
            height: 36px;

            border: 1px solid #b8b7b7;
          }
          & > .dateSelect {
            width: 25%;
            height: 36px;

            border: 1px solid #b8b7b7;
          }
        }
        & > .option {
          width: 100%;

          display: flex;
          align-items: center;
          justify-content: space-between;
          & > .genderSelect {
            width: 45%;
            height: 36px;

            border: 1px solid #b8b7b7;
          }
          & > input {
            width: 45%;
            height: 36px;

            border: 1px solid #b8b7b7;
          }
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

export default Register;
