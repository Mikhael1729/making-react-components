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
const computeFontWeight = (weight?: FontWeight): string => {
  switch (weight) {
    case "bold":
      return styles.Bold;
    case "lightweight":
      return styles.Lightweight;
    case "heavy":
      return styles.Heavy;
    default:
      return "";
  }
}

const computeModel = (props: ITextProps) => {
  // Font size.
  const fontClass = computeFontSizeClass(props.size);
  
  // Font weight.
  const weightClass = computeFontWeight(props.weight);

  // Classes cluster.
  const classes = [fontClass, weightClass].join(' ');

  return { classes, children: props.children }
}

const Text = (props: ITextProps) => {
  const { classes, children } = computeModel(props);

  return (
    <span className={classes}>
      {children}
    </span>
  );
};

export default Text;