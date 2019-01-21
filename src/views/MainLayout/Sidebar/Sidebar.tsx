import * as React from 'react';
import {
  Brand,
  Sidebar as SidebarStyles,
  Subtitle,
  Title
  } from 'styles/views/App.module.css';

interface SidebarProps {
}

const Sidebar: React.SFC<SidebarProps> = (props) => {
  const { children } = props;

  return (
    <nav className={SidebarStyles}>
      <div className={Brand}>
        <span className={Title}>&lt;Mikhael /&gt;</span>
        <span className={Subtitle}>Codificando mundos</span>
      </div>
      <ul>
        {children}
      </ul>
    </nav>
  );
};

export default Sidebar;