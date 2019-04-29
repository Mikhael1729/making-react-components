import * as React from 'react';
import * as styles from "components/Checkbox/Checkbox.module.css";

export interface CheckboxProps<T> {
  checked?: boolean;
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e?: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  data?: T;
}

export class Checkbox<T> extends React.PureComponent<CheckboxProps<T>, any> {
  render() {
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
