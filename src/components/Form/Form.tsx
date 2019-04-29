import * as React from 'react';
import styles from "./Form.module.scss";

interface IFormProps {
}

const Form: React.FunctionComponent<IFormProps> = ({ children }) => {
  return (
    <div className={styles.Form}>
      {children}
    </div>
  );
};

export default Form;