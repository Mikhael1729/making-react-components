import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { sidebarRoutes, navbarRoutes } from "data/Routes";
import { MainLayoutContext } from '../MainLayout';
import * as styles from "../../App/App.module.scss";

interface NavbarProps extends RouteComponentProps { }

class Navbar extends React.Component<NavbarProps, {}> {
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
          <div>
            {title}
          </div>
          <ul>
            {this.props.children}
          </ul>
        </div>
      </>

    );
  }
}


export default withRouter(Navbar);
