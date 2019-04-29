import * as React from 'react';
import * as styles from "./Text.module.scss";
import { FontSizes } from 'types/FontSizes';
import { FontWeight } from 'types/FontWeight';
import { Colors } from 'types/Colors';
import { ClassesSelector, IColorClasses } from 'helpers/ClassesSelector';

interface ITextProps {
  size?: FontSizes;
  weight?: FontWeight;
  color?: Colors;
  children: string | string[] | undefined;
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

const colors = {
  default: styles.FontColorDefault,
  primary: styles.FontColorPrimary,
  secondary: styles.FontColorSecondary,
  warning: styles.FontColorWarning,
  hidden: styles.FontColorHidden,
}

const computeModel = (props: ITextProps) => {
  // Font size.
  const fontClass = computeFontSizeClass(props.size);

  // Font weight.
  const weightClass = computeFontWeight(props.weight);

  // Color.
  const colorClasses = ClassesSelector.computeColor(props.color, colors);

  // Classes cluster.
  const classes = [fontClass, weightClass, colorClasses].join(' ');


  return { classes, children: props.children }
}

export const Text = (props: ITextProps) => {
  const { classes, children } = computeModel(props);

  return (
    <span className={classes}>
      {children}
    </span>
  );
};
