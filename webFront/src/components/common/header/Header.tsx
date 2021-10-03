import Navigation from "constants/Navigation";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {Palette} from "styles/Pallete";

import DefaultImage from "assets/icon/defaultUser.svg";

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {
    const [select, setSelect] = useState<number>(-1);
    const [burgerToggle, setBurgerToggle] = useState<boolean>(false);

    //아코디언 메뉴 코드
    const selectCategory = (id: number) => {
        if (select === -1 || select !== id) {
            setSelect(id);
        } else {
            setSelect(-1);
        }
    };

    return (
        <HeaderBlock toggle={burgerToggle}>
            <div className="logo" onClick={() => setBurgerToggle(false)}>
                <Link to="/">로고 위치</Link>
            </div>
            <ul className={burgerToggle ? "navLink viewNav" : "navLink"}>
                {Navigation.map((data, key) => (
                    <li key={key} onClick={() => selectCategory(key)}>
                        {data.title}
                        {data.data.length !== 0 && (
                            <ul className={select === key ? "subMenu view" : "subMenu"}>
                                {data.data.map((datas, key) => (
                                    <li key={key}>
                                        <Link
                                            to={datas.link}
                                            onClick={() => setBurgerToggle(false)}
                                        >
                                            - {datas.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
                <div className="login">
          <span>
            <Link to={"/login"} onClick={() => setBurgerToggle(false)}>
              로그인 해주세요
            </Link>
          </span>
                    <img src={DefaultImage} alt=""/>
                </div>
            </ul>
            <div className="burger" onClick={() => setBurgerToggle(!burgerToggle)}>
                <div className={burgerToggle ? "line1Checked" : "line1"}></div>
                <div className={burgerToggle ? "line2Checked" : "line2"}></div>
                <div className={burgerToggle ? "line3Checked" : "line3"}></div>
            </div>
        </HeaderBlock>
    );
};

type HeaderBlockProps = {
    toggle: boolean;
};
const HeaderBlock = styled.header<HeaderBlockProps>`
  height: 10vh;
  background-color: ${Palette.header};
  color: white;

  display: flex;
  align-items: center;
  justify-content: space-between;

  overflow-x: hidden;
  & > .logo {
    width: 160px;
    height: 100%;
    background-color: #e9e9e9;
    color: black;
    border: 1px solid black;

    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 800px) {
      width: 120px;
    }
    z-index: 2;
  }
  & > .navLink {
    height: 10vh;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    z-index: 1;
    & > li {
      width: 80px;
      position: relative;
      margin: 4px;

      font-size: 16px;
      @media (min-width: 1004px) {
        width: 100px;
        margin: 16px;
        font-size: 20px;
      }
      @media (max-width: 800px) {
        font-size: 20px;
      }
      & > .subMenu {
        display: none;
        position: absolute;
        top: 64px;
        & > li {
          padding: 8px 0;
          font-size: 12px;
          @media (min-width: 1004px) {
            font-size: 16px;
          }
          @media (max-width: 800px) {
            font-size: 16px;
          }
        }
        & > li:hover {
          color: ${Palette.primary};
        }
      }
    }
    & > .login {
      width: 180px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;

      cursor: pointer;
      & > img {
        width: 24px;
        height: 24px;

        border-radius: 50%;
        object-fit: cover;
        @media (min-width: 1004px) {
          width: 36px;
          height: 36px;
        }
      }
      & > span {
        font-size: 14px;
        @media (min-width: 1004px) {
          font-size: 16px;
        }
        @media (max-width: 800px) {
          font-size: 30px;
          font-weight: 500;
        }
      }
    }
    @media (max-width: 800px) {
      width: 100vw;
      height: 90vh;
      background-color: ${Palette.header};

      position: absolute;
      top: 10vh;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;

      display: none;

      & > li {
        width: 100%;
        background-color: ${Palette.header};
        border-bottom: 1px solid #e2e2e2;

        margin: 0;
        padding: 16px;
        & > .subMenu {
          position: static;
          margin-top: 16px;
        }
        & > .view {
          display: block;
        }
      }
    }
  }
  @media (max-width: 800px) {
    .viewNav {
      display: block;
      & > .login {
        display: flex;
        justify-content: flex-start;

        margin-top: 4vh;
        padding-left: 16px;

        & > img {
          display: none;
        }
        & > span {
          width: 200px;
          font-size: 16px;
        }
      }
    }
  }

  @media (min-width: 800px) {
    & > .navLink:hover {
      width: 100%;
      height: 40vh;
      background-color: ${Palette.header};

      position: absolute;
      & > li {
        & > .subMenu {
          display: block;
        }
      }
    }
  }

  & > .burger {
    display: none;
    cursor: pointer;

    z-index: 2;
    & > div {
      width: 25px;
      height: 3px;
      background-color: white;

      margin: 5px;
      transition: all 0.3s ease;
    }
    @media (max-width: 800px) {
      display: block;
      .line1Checked {
        transform: rotate(45deg);

        position: absolute;
      }
      .line2Checked {
        display: none;
      }
      .line3Checked {
        transform: rotate(-45deg);
      }
    }
  }
`;

export default Header;
