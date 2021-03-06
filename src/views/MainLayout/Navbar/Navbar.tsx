import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { sidebarRoutes, navbarRoutes } from "routes";
import styles from "./Navbar.module.scss";

interface NavbarProps extends RouteComponentProps { }

export class Navbar extends React.Component<NavbarProps, {}> {
  private extractTitle = (pathname: string): string => {
    const routes = sidebarRoutes.concat(navbarRoutes);
    const match = routes.find(r => r.path === pathname);
    const title = match ? match.label ? match.label : "" : "";

    return title;
  }

  public render() {
    const title = this.extractTitle(this.props.location.pathname);
    return (
      <>
        <div className={styles.Navbar} style={{ marginLeft: "250px"}}>
          <div className={styles.Brand}>
            {title}
          </div>
          <div className={styles.Actions}>
            {this.props.children}
          </div>
        </div>
      </>

    );
  }
}
