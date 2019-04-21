import * as React from 'react';
import * as styles from "./Text.module.scss";
import { FontSizes } from 'types/FontSizes';
import { FontWeight } from 'types/FontWeight';

interface ITextProps {
  size?: FontSizes;
  weight?: FontWeight;
  children: string | string[];
}

const computeFontSizeClass = (size?: FontSizes): string => {
  switch (size) {
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

// TODO:
const computeFontWeight = (weght: FontWeight): string => "";

const Text = ({children, size}: ITextProps) => {
  const fontStyle = computeFontSizeClass(size);
  
  return (
    <span className={fontStyle}>
      {children}
    </span>
  );
};

export default Text;