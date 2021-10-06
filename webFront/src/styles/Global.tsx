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
            width: 8px;
            height: 8px;
            background: #ffffff;
        }
        ::-webkit-scrollbar-thumb {
            border-radius: 3.5px;
            background-color: #ced4da;

            &:hover {
                background-color: #adb5bd;
            }
        }
    }
    button {
        border: 0;
        outline: 0;
    }
    input {
        font-family: "Noto Sans KR", sans-serif;
    }
    * {
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
