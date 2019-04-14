import * as React from 'react';
import { MainLayoutContext } from '../MainLayout';
import { Content as Styles } from "App.module.css";

interface ContentProps {
}

const Content: React.SFC<ContentProps> = (props) => {
  return <MainLayoutContext.Consumer>
    {context => {
      const marginLeft = context.isMobile ? "0px" : context.sidebarWidth + "px";
      
      return (
        <main className={Styles} style={{ marginLeft }}>
          {props.children}
        </main>
      )
    }}
  </MainLayoutContext.Consumer>
};

export default Content;