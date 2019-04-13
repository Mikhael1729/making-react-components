import * as React from 'react';
import * as styles from "./Button.module.scss";

export type ButtonShape = "circle" | "square";
export type ButtonColors = "primary" | "secondary" | "warning";
export type ButtonSize = "small" | "large" | "medium"
export type ButtonFill = "outline" | "normal";

interface IButtonProps {
  onClick?: () => void;
  style?: React.CSSProperties;
  color?: ButtonColors
  shape?: ButtonShape;
  children?: React.ReactNode;
  size?: ButtonSize;
  fill?: ButtonFill;
}

const computeColorStyles = (color?: ButtonColors) => {
    
}

const computeShapeStyles = (shape?: ButtonShape) => {
  switch (shape) {
    case "circle":
      return styles.CircleButton
    case "square":
      return styles.SquareButton
    default:
      return styles.Button
  }
}

const computeModel = (props: IButtonProps) => {
  const { onClick, style, children, color, shape } = props;

  // Shape styles.
  const shapeStyles = computeShapeStyles(shape);

  // Color styles.
  const colorStyles = computeColorStyles(color);

  // Classes.
  const classes = [styles.Button, shapeStyles, colorStyles].join(' ');

  return { onClick, style, children, classes }
}

const Button: React.FunctionComponent<IButtonProps> = props => {
  const model = computeModel(props);
  
  return (
    <button
      className={model.classes}
      onClick={model.onClick}
      style={model.style}>
      {model.children}
    </button>
  );
};

export default Button;