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
const textAreaOnChange = (
  textarea: any,
  rowsMin: number = 0,
  rowsMax: number = 0,
  callBack: undefined | ((e: React.ChangeEvent<HTMLTextAreaElement>) => void),
  setRows: (a: React.SetStateAction<number | undefined>) => void) =>
  (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Callback.
    if (callBack) callBack(e);

    // Calculating roes to show.
    const rowCount = textarea.current.value.substr(0, textarea.selectionStart).split("\n").length
    const limit = rowsMax > 0 ? rowsMax : rowCount + 1;

    if (rowCount >= rowsMin && rowCount <= limit)
      setRows(rowCount);
  }

const inputTextOnChange = (callBack: undefined | ((e: React.ChangeEvent<HTMLInputElement>) => void)) => (e: React.ChangeEvent<HTMLInputElement>) => {
  if (callBack) callBack(e);
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
    textAreaOnChange: textAreaOnChange(textareaRef, props.rows, props.rowsMax, props.onChange, setRows),
    inputTextOnChange: inputTextOnChange(props.onChange),
    rowsMax: props.rowsMax,
    rowsMin: props.rows,
    sharedStyles: {
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
        ? <input type="text" {...$.sharedStyles} onChange={$.inputTextOnChange}/>
        : <textarea
          {...$.sharedStyles}
          rows={$.rows}
          ref={$.textareaRef}
          onChange={$.textAreaOnChange} />}
    </div>
  );
};

TextField.defaultProps = {
  rows: 1,
}

export default TextField;
