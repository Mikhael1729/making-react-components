import React, { useState } from 'react';
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
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

//#region Variables
const color: IColorClasses = {
  primary: styles.PrimaryColor,
  secondary: styles.SecondaryColor,
  warning: styles.WarningColor,
  hidden: styles.HiddenColor,
  default: styles.DefaultColor
};
//#endregion

//#region Functions
const increaseRows = (
  textarea: any,
  rowsMin: number = 0,
  rowsMax: number = 0,
  setRows: (a: React.SetStateAction<number | undefined>) => void) =>
  (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const rowCount = textarea.current.value.substr(0, textarea.selectionStart).split("\n").length
    const limit = rowsMax > 0 ? rowsMax : rowCount + 1;

    if (rowCount >= rowsMin && rowCount <= limit)
      setRows(rowCount);
  }
//#endregion

//#region Model
const computeModel = (props: ITextFieldProps) => {
  // State.
  const [rows, setRows] = useState(props.rows);

  // Textaera.
  const textareaRef: any = React.createRef();

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
    rows,
    setRows,
    textareaRef,
    increaseRows: increaseRows(textareaRef, props.rows, props.rowsMax, setRows),
    rowsMax: props.rowsMax,
    rowsMin: props.rows,
    sharedStyles: {
      onChange: props.onChange,
      className: textFieldClasses,
      placeholder: props.placeholder,
      disabled: props.disabled
    },
  };
}
//#endregion

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
          {...$.sharedStyles}
          rows={$.rows}
          ref={$.textareaRef}
          onChange={$.increaseRows} />}
    </div>
  );
};

TextField.defaultProps = {
  rows: 1,
}

export default TextField;
