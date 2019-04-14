import * as React from 'react';
import * as styles from './Button.module.scss';
import { ButtonFill } from 'types/ButtonFill';
import { ButtonShape } from 'types/ButtonShape';
import { Colors } from 'types/Colors';
import { Size } from 'types/Size';

interface IButtonProps {
  onClick?: () => void;
  style?: React.CSSProperties;
  color?: Colors
  shape?: ButtonShape;
  size?: Size;
  fill?: ButtonFill;
  children?: React.ReactNode;
}

const computeColorClasses = (color?: Colors) => {
  switch (color) {
    case "primary":
      return styles.PrimaryColor;
    case "secondary":
      return styles.SecondaryColor;
    case "warning":
      return styles.WarningColor;
    default:
      return "";
  }
}

const computeShapeClasses = (shape?: ButtonShape) => {
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
  const shapeClasses = computeShapeClasses(shape);

  // Color styles.
  const colorClasses = computeColorClasses(color);

  // Classes.
  const classes = [styles.Button, shapeClasses, colorClasses].join(' ');

  return { onClick, style, children, classes }
}

const Button = (props: IButtonProps) => {
  const model = computeModel(props);
  console.log(props.children);
  
  return (
    <button
      className={model.classes}
      onClick={model.onClick}
      style={model.style}>
      <div className={styles.ChildrenContainer}>
        {model.children}
      </div>
    </button>
  );
};

export default Button;