import * as React from 'react';
import styles from "./TextField.module.scss";
import { IColorClasses, ClassesSelector } from 'helpers/ClassesSelector';
import { Colors } from 'types/Colors';

interface ITextFieldProps {
  color?: Colors;
}

const color: IColorClasses = {
  primary: styles.PrimaryColor,
  secondary: styles.SecondaryColor,
  warning: styles.WarningColor,
};

const computeModel = (props: ITextFieldProps) => {
  // Color styles.
  const colorClass = ClassesSelector.computeColor(props.color, color);
  
  // Classes.
  const classes = [styles.TextField, colorClass].join(' ');
  
  return {
    classes,
  };
}

const TextField: React.FunctionComponent<ITextFieldProps> = (props) => {
  const model = computeModel(props);
  return <input type="text" className={model.classes} />;
};

export default TextField;
