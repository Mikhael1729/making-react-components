import * as React from 'react';
import {
  Brand,
  Navbar,
  Subtitle,
  Title
  } from 'styles/App.module.css';

interface SidebarProps {
}

const Sidebar: React.SFC<SidebarProps> = (props) => {
  const { children } = props;

  return (
    <nav className={Navbar}>
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