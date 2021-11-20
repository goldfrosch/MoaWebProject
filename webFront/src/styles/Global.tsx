import { createGlobalStyle } from "styled-components";
import { Palette } from "./Pallete";

import "font/font.css";

const GlobalStyle = createGlobalStyle`
    body {
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
    }
    button {
        border: 0;
        outline: 0;
    }
    * {
        font-family: "A14";
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
