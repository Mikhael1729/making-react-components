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

const computeSizeClasses = (size?: Size) => {
  switch (size) {
    case "large":
      return styles.LargeSize
    case "medium":
      return styles.MediumSize;
    case "small":
      return styles.SmallSize;
    default: 
      return "medium"
  }
}

const computeModel = (props: IButtonProps) => {
  const { onClick, style, children, color, shape, size } = props;

  // Shape styles.
  const shapeClasses = computeShapeClasses(shape);

  // Color styles.
  const colorClasses = computeColorClasses(color);

  // Size classes.
  const sizeClasses = computeSizeClasses(size)

  // Classes.
  const classes = [styles.Button, shapeClasses, colorClasses, sizeClasses ].join(' ');

  return { onClick, style, children, classes }
}

const Button = (props: IButtonProps) => {
  const model = computeModel(props);
  
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