export enum Palette {
  primary = "#02a9f7",
  secondary = "#99aab5",
  header = "#2c2f33",
  white = "#ffffff",
  black = "#23272a",
  backgroundColor = "#e9e9e9",
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
}

export enum ThemeSize {
  tag = "tag",
  small = "small",
  middle = "middle",
  large = "large",
}
export const buttonColorMap: { [key in ThemeColor]: ButtonProperty } = {
  first: {
    backgroundColor: Palette.header,
    color: Palette.primary,
    border: Palette.primary,
  },
};

export const buttonSizeMap: { [key in ThemeSize]: ButtonSizeProperty} = {
  tag: {
    width: "24px",
    height: "10px",
    fontSize: "8px",
    radius: "50%",
  },
  small: {
    width: "24px",
    height: "10px",
    fontSize: "8px",
    radius: "4px",
  },
  middle: {
    width: "24px",
    height: "10px",
    fontSize: "8px",
    radius: "6px",
  },
  large: {
    width: "24px",
    height: "10px",
    fontSize: "8px",
    radius: "8px",
  }
}