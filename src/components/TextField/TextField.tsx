import * as React from 'react';
import styles from "./TextField.module.scss";
import { IColorClasses, ClassesSelector } from 'helpers/ClassesSelector';
import { Colors } from 'types/Colors';
import Text from "components/Text/Text";

interface ITextFieldProps {
  label?: string;
  color?: Colors;
  disabled?: boolean;
  children?: never;
  placeholder?: string;
}

const color: IColorClasses = {
  primary: styles.PrimaryColor,
  secondary: styles.SecondaryColor,
  warning: styles.WarningColor,
  hidden: styles.HiddenColor,
  default: styles.DefaultColor
};

const computeModel = (props: ITextFieldProps) => {
  // Color styles.
  const colorClass = ClassesSelector.computeColor(props.color, color);

  // Disabled.
  const disabledClass = props.disabled ? styles.Disabled : "";

  // Classes.
  const textFieldClasses = [styles.TextField, colorClass, disabledClass].join(' ');

  return {
    label: props.label,
    textColor: props.color,
    textFieldClasses,
    containerClasses: styles.Container,
    disabled: props.disabled,
    placeholder: props.placeholder
  };
}

const TextField: React.FunctionComponent<ITextFieldProps> = (props) => {
  const model = computeModel(props);

  return (
    <div className={model.containerClasses}>
      {/* Label */}
      {model.label
        ? <Text color={model.textColor}>{model.label}</Text>
        : null}

      {/* Input */}
      <input 
        type="text" 
        className={model.textFieldClasses} 
        placeholder={model.placeholder}
        disabled={model.disabled} />
    </div>
  );
};

export default TextField;
