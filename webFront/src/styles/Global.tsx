import { createGlobalStyle } from "styled-components";
import { Palette } from "./Pallete";

const GlobalStyle = createGlobalStyle`
    body {
        font-family: "Noto Sans KR", sans-serif;
        box-sizing: border-box;

        min-width: 280px;
        height: 100vh;

        background-color: ${Palette.backgroundColor};
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
