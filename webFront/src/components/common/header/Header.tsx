import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Palette } from "styles/Pallete";

import { IProfile } from "modules/auth/type";
import Navigation from "constants/Navigation";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

interface HeaderProps {
  profile: IProfile;
}

const Header: React.FC<HeaderProps> = ({ profile }) => {
  const [select, setSelect] = useState<number>(-1);
  const [burgerToggle, setBurgerToggle] = useState<boolean>(false);
  const [data, setData] = useState<IProfile>({ ...profile });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  //프로필 관련 메뉴
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //아코디언 메뉴 코드
  const selectCategory = (id: number) => {
    if (select === -1 || select !== id) {
      setSelect(id);
    } else {
      setSelect(-1);
    }
  };

  useEffect(() => {
    setData({ ...profile });
  }, [profile]);

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
          {data.email !== "" ? (
            <>
              <span className="profile">
                <Link to={"/login"} onClick={() => setBurgerToggle(false)}>
                  {data.nickName ? "개인 설정" : "로그인이 필요합니다"}
                </Link>
              </span>
              <div className="user">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center"
                  }}
                >
                  <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                    <Avatar />
                  </IconButton>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 20,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0
                      }
                    }
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem>
                    <Avatar /> 계정 정보
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    개인 설정
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    로그아웃
                  </MenuItem>
                </Menu>
              </div>
            </>
          ) : (
            <>
              <span>
                <Link to={"/login"} onClick={() => setBurgerToggle(false)}>
                  로그인
                </Link>
              </span>
            </>
          )}
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
      @media (min-width: 1080px) {
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
          @media (min-width: 1080px) {
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
      width: 120px;
      display: flex;
      align-items: center;

      cursor: pointer;
      & > .profile {
        display: none;
        font-size: 14px;
        @media (min-width: 1080px) {
          font-size: 16px;
        }
        @media (max-width: 800px) {
          display: block;
          font-size: 20px;
        }
      }
      & > .user {
        display: block;
        @media (max-width: 800px) {
          display: none;
        }
      }
      @media (max-width: 800px) {
        width: 100%;
      }
    }
    @media (max-width: 800px) {
      width: 100%;
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
      //수동으로... 메뉴 갯수에따라 늘어나야함... ;^;
      height: 70vh;
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
