import { createGlobalStyle } from "styled-components";
import { Palette } from "./Pallete";

const GlobalStyle = createGlobalStyle`
    body {
        font-family: "Noto Sans KR", sans-serif;
        box-sizing: border-box;

        min-width: 280px;
        height: 100vh;

        background-color: ${Palette.backgroundColor};

        ::-webkit-scrollbar {
            width: 10px;
            height: 10px;
            background: #ffffff;
        }
        ::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background-color: #ced4da;
            &:hover {
                background-color: #adb5bd;
            }
        }
        @font-face {
            font-family: "JEJUHALLASAN";
            src: url("../font/JEJUHALLASAN.woff");
        }
    }
    button {
        border: 0;
        outline: 0;
    }
    * {
        font-family: "Noto Sans KR", sans-serif;
        box-sizing: inherit;
        margin: 0;
        padding: 0; 
        outline: none;
        text-decoration: none;
        list-style: none;
        color: inherit;
        font-size: inherit;
    }
`;

export default GlobalStyle;
