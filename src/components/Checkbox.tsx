import * as React from 'react';
import * as styles from "styles/Checkbox.module.css";

export interface CheckboxProps<T> {
  checked?: boolean;
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e?: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  data?: T;
}

export default class Checkbox<T> extends React.PureComponent<CheckboxProps<T>, any> {
  public render() {
    const { checked, data, onChange, onClick, } = this.props;

    return <input
      type="checkbox"
      checked={checked}
      onClick={onClick}
      onChange={onChange}
      value={JSON.stringify(data)}
    />
  }
}
