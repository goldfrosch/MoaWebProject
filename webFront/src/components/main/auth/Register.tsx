import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ThemeColor, ThemeSize } from "styles/Pallete";

import Button from "components/common/items/Button";
import { IUserRegister } from "modules/auth/type";

interface Gender {
  key: string;
  value: string;
}

const GenderType: Gender[] = [
  { key: "MALE", value: "남성" },
  { key: "FEMALE", value: "여성" },
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

interface RegisterProps {
  register: (data: IUserRegister) => void;
}

const Register: React.FC<RegisterProps> = ({ register }) => {
  const [data, setData] = useState<IUserRegister>({
    email: "",
    password: "",
    birthday: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDay()
    ),
    gender: "MALE",
    age: 1,
  });

  const [dateList, setDateList] = useState<IDateList>({
    year: [],
    month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    day: [],
  });

  const [birth, setBirth] = useState<IDay>({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDay(),
  });
  const [rePassword, setRePassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const registerUser = () => {
    if (data.email === "") {
      setErrorMsg("이메일을 입력해주세요");
    } else {
      if (data.password !== rePassword) {
        setErrorMsg("비밀번호를 서로 확인바랍니다");
      } else if (data.password.length < 8) {
        setErrorMsg("비밀번호는 8자리 이상이여야 합니다");
      } else {
        setData({
          ...data,
          birthday: new Date(birth.year, birth.month - 1, birth.day),
        });
        setErrorMsg("");
        register(data);
      }
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
      age: Number(new Date().getFullYear() - birth.year + 1),
    });
    //연도, 월에 따른 날짜 수 변경
    setDateList({
      ...dateList,
      day: days,
    });
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
      day: days,
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
          <span>이메일</span>
          <input
            value={data.email}
            onChange={e => setData({ ...data, email: e.target.value })}
          />
          <span>비밀번호</span>
          <input
            type="password"
            value={data.password}
            onChange={e => setData({ ...data, password: e.target.value })}
          />
          <span>비밀번호 재입력</span>
          <input
            type="password"
            value={rePassword}
            onChange={e => setRePassword(e.target.value)}
          />
          <span>생일 입력</span>
          <div className="selectDate">
            <select
              className="yearSelect"
              defaultValue={birth.year}
              onChange={e => {
                getDays();
                setBirth({
                  ...birth,
                  year: Number(e.target.value),
                });
                setData({
                  ...data,
                  age: new Date().getFullYear() - Number(e.target.value) + 1,
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
                  month: Number(e.target.value),
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
                  day: Number(e.target.value),
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
          <span>성별, 나이</span>
          <div className="option">
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
      & > span {
        margin: 4px;
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
        margin-bottom: 16px;
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
          height: 30px;

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
            height: 30px;

            border: 1px solid #b8b7b7;
          }
          & > .dateSelect {
            width: 25%;
            height: 30px;

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
            height: 30px;

            border: 1px solid #b8b7b7;
          }
          & > input {
            width: 45%;
            height: 30px;

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
