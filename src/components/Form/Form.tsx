import * as React from 'react';
import styles from "./Form.module.scss";

interface IFormProps {
}

export const Form: React.FunctionComponent<IFormProps> = ({ children }) => {
  return (
    <div className={styles.Form}>
      {children}
    </div>
  );
};
