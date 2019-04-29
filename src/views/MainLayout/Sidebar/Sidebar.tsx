import * as React from 'react';
import styles from "./Sidebar.module.scss";

interface SidebarProps {
}

export const Sidebar: React.SFC<SidebarProps> = (props) => {
  const { children } = props;
  return (
    <nav className={styles.Sidebar}>
      <div className={styles.Brand}>
        <span className={styles.Title}>&lt;Mikhael /&gt;</span>
        <span className={styles.Subtitle}>Codificando mundos</span>
      </div>
      <ul>
        {children}
      </ul>
    </nav>
  );
};
