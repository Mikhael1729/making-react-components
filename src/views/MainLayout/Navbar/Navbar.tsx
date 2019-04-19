import * as React from 'react';
import * as Styles from "views/App/App.module.css";
import { RouteComponentProps, withRouter } from 'react-router';
import { sidebarRoutes, navbarRoutes } from "data/Routes";
import { MainLayoutContext } from '../MainLayout';
import * as styles from "./Navbar.module.scss";

interface NavbarProps extends RouteComponentProps { }

class Navbar extends React.Component<NavbarProps, {}> {
  private extractTitle = (pathname: string): string => {
    const routes = sidebarRoutes.concat(navbarRoutes);
    const route = routes.find(r => r.path === pathname);
    const title = route ? route.label ? route.label : "" : "";

    return title;
  }

  public render() {
    const title = this.extractTitle(this.props.location.pathname);
    return (
      <MainLayoutContext.Consumer>
        {
          (context) => {
            const marginLeft = context.isMobile ? '0px' : context.sidebarWidth + "px";
            return (
              <div className={Styles.Navbar} style={{ marginLeft }}>
                <div className={Styles.Brand}>
                  {title} 
                </div>
                <ul>
                  {this.props.children}
                </ul>
              </div>
            )
          }
        }
      </MainLayoutContext.Consumer>

    );
  }
}


export default withRouter(Navbar);
