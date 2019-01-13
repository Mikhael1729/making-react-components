import * as React from 'react';
import * as styles from "styles/LabelCheckbox.module.css";
import Label from './Label';
import Checkbox from './Checkbox';

export interface LabelCheckboxProps<T> {
  checked?: boolean;
  onChange?: (isChecked?: boolean, data?: T, text?: string) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  data?: T;
  children?: string | number | undefined;
  pointer?: boolean;
}

export default class LabelCheckbox<T> extends React.PureComponent<LabelCheckboxProps<T>, any> {

  onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const method = this.props.onChange;
    const data = JSON.parse(event.target.value) as T;
    const checked = event.target.checked;

    if (method) {
      method(checked, data, this.props.children as string);
    }
  };

  render() {
    const { checked, data, children, pointer, onClick } = this.props;

    return <form>
      <Label className={styles.Label} pointer={pointer}>
        <Checkbox 
          data={data}
          checked={checked}
          onChange={this.onChange}
          onClick={onClick} />

        {children}
      </Label>
    </form>
  }
}
