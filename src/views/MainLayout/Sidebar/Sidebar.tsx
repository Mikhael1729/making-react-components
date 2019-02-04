import * as React from 'react';
import {
  Brand,
  Sidebar as SidebarStyles,
  Subtitle,
  Title
} from 'styles/views/App.module.css';
import { MainLayoutContext } from '../MainLayout';

interface SidebarProps {
}

const Sidebar: React.SFC<SidebarProps> = (props) => {
  const { children } = props;

  return (
    <MainLayoutContext.Consumer>
      {context => {
        if(!context.isMobile) {
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
          )
        } else {
          return null;
        }
      }}
    </MainLayoutContext.Consumer>
  );
};

export default Sidebar;