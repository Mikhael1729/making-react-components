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
  block?: boolean;
  multiLine?: boolean;
  rows?: number;
  rowsMax?: number;
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

  // Block.
  const blockClass = props.block ? styles.Block : "";

  // Text field Classes.
  const textFieldClasses = [styles.TextField, colorClass, disabledClass].join(' ');

  // Container classes.
  const containerClasses = [styles.Container, blockClass].join(' ');

  return {
    label: props.label,
    textColor: props.color,
    containerClasses,
    multiLine: props.multiLine,
    rows: props.rows,
    rowsMax: props.rowsMax,
    sharedStyles: { 
      className: textFieldClasses, 
      placeholder: props.placeholder, 
      disabled: props.disabled
    },
  };
}

const TextField: React.FunctionComponent<ITextFieldProps> = (props) => {
  const $ = computeModel(props);

  return (
    <div className={$.containerClasses}>
      {/* Label */}
      {$.label
        ? <Text color={$.textColor}>{$.label}</Text>
        : null}

      {/* Input */}
      {!$.multiLine
        ? <input type="text" {...$.sharedStyles} />
        : <textarea 
            rows={$.rows} 
            {...$.sharedStyles} />}
    </div>
  );
};

TextField.defaultProps = {
  rows: 6
}

export default TextField;
