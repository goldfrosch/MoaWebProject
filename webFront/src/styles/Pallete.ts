export enum Palette {
    primary = "#02a9f7",
    secondary = "#99aab5",
    header = "#2c2f33",
    white = "#ffffff",
    borderGray = "#e9e9e9",
    lightgray = "#b8b7b7",
    black = "#23272a",
    backgroundColor = "#fbfbfb",
}

type ButtonProperty = {
    backgroundColor: Palette;
    color: Palette;
    border: Palette;
};

type ButtonSizeProperty = {
    width: string,
    height: string,
    fontSize: string,
    radius: string,
}

export enum ThemeColor {
    first = "first",
    second = "second"
}

export enum ThemeSize {
    tag = "tag",
    small = "small",
    middle = "middle",
    large = "large",
    space = "space",
}

export const buttonColorMap: { [key in ThemeColor]: ButtonProperty } = {
    first: {
        backgroundColor: Palette.header,
        color: Palette.white,
        border: Palette.header,
    },
    second: {
        backgroundColor: Palette.white,
        color: Palette.secondary,
        border: Palette.secondary,
    },
};

export const buttonSizeMap: { [key in ThemeSize]: ButtonSizeProperty } = {
    tag: {
        width: "24px",
        height: "10px",
        fontSize: "8px",
        radius: "50%",
    },
    small: {
        width: "48px",
        height: "24px",
        fontSize: "8px",
        radius: "4px",
    },
    middle: {
        width: "64px",
        height: "24px",
        fontSize: "8px",
        radius: "4px",
    },
    large: {
        width: "96px",
        height: "30px",
        fontSize: "16px",
        radius: "4px",
    },
    space: {
        width: "100%",
        height: "48px",
        fontSize: "16px",
        radius: "6px",
    }
}