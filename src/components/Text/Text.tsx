import * as React from 'react';
import * as styles from "./Text.module.scss";

type FontSizes =
  "h1" | "h2" | "h3" | "h4" | "subtitle" | "body" | "small";

interface ITextProps {
  fontSize?: FontSizes;
  children: string | string[];
}

const computeFontSizeClass = (fontSize?: FontSizes): string => {
  switch (fontSize) {
    case "h1":
      return styles.FontSizeXxxxLarge
    case "h2":
      return styles.FontSizeXxxLarge
    case "h3":
      return styles.FontSizeXxLarge
    case "h4":
      return styles.FontSizeXLarge
    case "subtitle":
      return styles.FontSizeLarge
    case "small":
      return styles.FontSizeSmall
    default:
      return styles.FontSizeRegular
  }
}

const Text = ({children, fontSize}: ITextProps) => {
  const fontStyle = computeFontSizeClass(fontSize);
  
  return (
    <span className={fontStyle}>
      {children}
    </span>
  );
};

export default Text;